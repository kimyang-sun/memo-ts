import { BaseComponent, Component } from './component.js';

export interface Composable {
  addChild(child: Component): void;
}

type OnListener = () => void;
type DragState = 'start' | 'end' | 'enter' | 'leave';
type OnDragListener<T extends Component> = (
  target: T,
  state: DragState
) => void;

interface ItemContainer extends Component, Composable {
  setOnDeleteListener(listener: OnListener): void;
  setOnDragListener(listener: OnDragListener<Item>): void;
  muteChildren(state: 'mute' | 'unmute'): void;
  getBoundingRect(): DOMRect;
  onDropped(): void;
}

// 이렇게 사용하는 이유는 만약 DarkItem이 있다면 그것도 똑같이 Item처럼 만들고 밑에 Items의
// Constructor에 넣어주면 재사용이 가능하기 때문이다. 외부에서 new Items(DarkItem) 이렇게 사용하면 된다.
type ItemContainerConstructor = {
  new (): ItemContainer; // 생성자 정의 타입
};

export class Item extends BaseComponent<HTMLElement> implements ItemContainer {
  private deleteListener?: OnListener;
  private dragListener?: OnDragListener<Item>;

  constructor() {
    super(`
      <li class="document__item" draggable="true">
        <button class="document__delete">❎</button>
      </li>
    `);

    const deleteBtn = this.element.querySelector(
      '.document__delete'
    )! as HTMLButtonElement;

    // deleteBtn.addEventListener('click', e => {
    //   const eventTarget = e.target as HTMLButtonElement;
    //   eventTarget.parentElement!.remove();
    // });

    deleteBtn.onclick = () => {
      this.deleteListener && this.deleteListener();
    };

    this.element.addEventListener('dragstart', (event: DragEvent) => {
      this.dragStart(event);
    });

    this.element.addEventListener('dragend', (event: DragEvent) => {
      this.dragEnd(event);
    });

    this.element.addEventListener('dragenter', (event: DragEvent) => {
      this.dragEnter(event);
    });

    this.element.addEventListener('dragleave', (event: DragEvent) => {
      this.dragLeave(event);
    });
  }

  addChild(child: Component) {
    const container = this.element;
    child.attachTo(container);
  }

  setOnDeleteListener(listener: OnListener) {
    this.deleteListener = listener;
  }

  dragStart(_: DragEvent) {
    this.notifyDragObserver('start');
    this.element.classList.add('dragged');
  }

  dragEnd(_: DragEvent) {
    this.notifyDragObserver('end');
    this.element.classList.remove('dragged');
  }

  dragEnter(_: DragEvent) {
    this.notifyDragObserver('enter');
    this.element.classList.add('entered');
  }

  dragLeave(_: DragEvent) {
    this.notifyDragObserver('leave');
    this.element.classList.remove('entered');
  }

  notifyDragObserver(state: DragState) {
    this.dragListener && this.dragListener(this, state);
  }

  setOnDragListener(listener: OnDragListener<Item>) {
    this.dragListener = listener;
  }

  muteChildren(state: 'mute' | 'unmute') {
    if (state === 'mute') {
      this.element.classList.add('mute');
    } else {
      this.element.classList.remove('mute');
    }
  }

  getBoundingRect(): DOMRect {
    return this.element.getBoundingClientRect();
  }

  onDropped() {
    this.element.classList.remove('entered');
  }
}

export class Items extends BaseComponent<HTMLUListElement> {
  private children = new Set<ItemContainer>();
  private dragTarget?: ItemContainer;
  private dropTarget?: ItemContainer;

  constructor(private itemConstructor: ItemContainerConstructor) {
    super('<ul class="document__items"></ul>');

    this.element.addEventListener('dragover', (event: DragEvent) => {
      this.dragOver(event);
    });

    this.element.addEventListener('drop', (event: DragEvent) => {
      this.dragDrop(event);
    });
  }

  addChild(box: Component) {
    const item = new this.itemConstructor();
    item.addChild(box);
    item.attachTo(this.element, 'beforeend');
    item.setOnDeleteListener(() => {
      item.removeFrom(this.element);
      this.children.delete(item);
    });
    this.children.add(item);
    item.setOnDragListener((target: Item, state: DragState) => {
      switch (state) {
        case 'start':
          this.dragTarget = target;
          this.updateItems('mute');
          break;
        case 'end':
          this.dragTarget = undefined;
          this.updateItems('unmute');
          break;
        case 'enter':
          this.dropTarget = target;
          break;
        case 'leave':
          this.dropTarget = undefined;
          break;
        default:
          throw new Error(`Invalid state: ${state}`);
      }
    });
  }

  dragOver(event: DragEvent) {
    event.preventDefault();
  }

  dragDrop(event: DragEvent) {
    event.preventDefault();
    if (!this.dropTarget) return;
    if (this.dragTarget && this.dragTarget !== this.dropTarget) {
      const dropY = event.clientY;
      const target = this.dragTarget.getBoundingRect();

      this.dragTarget.removeFrom(this.element);
      this.dropTarget.attach(
        this.dragTarget,
        dropY < target.y ? 'beforebegin' : 'afterend'
      );
    }
    this.dropTarget.onDropped();
  }

  private updateItems(state: 'mute' | 'unmute') {
    this.children.forEach((item: ItemContainer) => {
      item.muteChildren(state);
    });
  }
}
