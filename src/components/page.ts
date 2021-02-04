import { BaseComponent } from './component.js';

export class Page extends BaseComponent<HTMLUListElement> {
  constructor() {
    super('<ul class="document__items"></ul>');
  }
}
