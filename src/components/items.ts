import { BaseComponent, Component } from './component.js';

export interface Composable {
  addChild(child: Component): void;
}

type OnListner = () => void;

interface ItemContainer extends Component, Composable {
  setOnDeleteListner(listner: OnListner): void;
}

// 이렇게 사용하는 이유는 만약 DarkItem이 있다면 그것도 똑같이 Item처럼 만들고 밑에 Items의
// Constructor에 넣어주면 재사용이 가능하기 때문이다. 외부에서 new Items(DarkItem) 이렇게 사용하면 된다.
type ItemContainerConstructor = {
  new (): ItemContainer; // 생성자 정의 타입
};

export class Item extends BaseComponent<HTMLElement> implements ItemContainer {
  private deleteListner?: OnListner;
  constructor() {
    super(`
      <li class="document__item">
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
      this.deleteListner && this.deleteListner();
    };
  }

  addChild(child: Component) {
    const container = this.element;
    child.attachTo(container);
  }

  setOnDeleteListner(listner: OnListner) {
    this.deleteListner = listner;
  }
}

export class Items extends BaseComponent<HTMLUListElement> {
  constructor(private itemConstructor: ItemContainerConstructor) {
    super('<ul class="document__items"></ul>');
  }

  addChild(box: Component) {
    const item = new this.itemConstructor();
    item.addChild(box);
    item.attachTo(this.element, 'beforeend');
    item.setOnDeleteListner(() => {
      item.removeFrom(this.element);
    });
  }
}
