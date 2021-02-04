import { BaseComponent, Component } from './component.js';

export interface Composable {
  addChild(child: Component): void;
}
class Item extends BaseComponent<HTMLElement> {
  constructor() {
    super(`
      <li class="document__item">
        <button class="document__delete">❎</button>
      </li>
    `);
  }

  addChild(child: Component) {
    const container = this.element;
    child.attachTo(container);
  }
}

export class Items extends BaseComponent<HTMLUListElement> {
  constructor() {
    super('<ul class="document__items"></ul>');
  }

  addChild(box: Component) {
    const item = new Item();
    item.addChild(box);
    item.attachTo(this.element, 'beforeend');
  }
}
