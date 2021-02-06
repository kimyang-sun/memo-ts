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
  }

  dragEnd(_: DragEvent) {
    this.notifyDragObserver('end');
  }

  dragEnter(_: DragEvent) {
    this.notifyDragObserver('enter');
  }

  dragLeave(_: DragEvent) {
    this.notifyDragObserver('leave');
  }

  notifyDragObserver(state: DragState) {
    this.dragListener && this.dragListener(this, state);
  }

  setOnDragListener(listener: OnDragListener<Item>) {
    this.dragListener = listener;
  }
}

export class Items extends BaseComponent<HTMLUListElement> {
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
    });
    item.setOnDragListener((target: Item, state: DragState) => {
      console.log(target, state);
    });
  }

  dragOver(event: DragEvent) {
    event.preventDefault();
  }

  dragDrop(event: DragEvent) {
    event.preventDefault();
  }
}
