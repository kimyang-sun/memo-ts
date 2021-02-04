export class Page {
  private element: HTMLUListElement;
  constructor() {
    this.element = document.createElement('ul');
    this.element.setAttribute('class', 'document__items');
  }

  attachTo(parent: HTMLElement, position: InsertPosition = 'afterbegin') {
    parent.insertAdjacentElement(position, this.element);
  }
}
