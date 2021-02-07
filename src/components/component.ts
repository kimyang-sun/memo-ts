export interface Component {
  attachTo(parent: HTMLElement, position?: InsertPosition): void;
  removeFrom(parent: HTMLElement): void;
  attach(component: Component, position?: InsertPosition): void;
}

export class BaseComponent<T extends HTMLElement> implements Component {
  protected readonly element: T;
  constructor(htmlString: string) {
    const temp = document.createElement('template');
    temp.innerHTML = htmlString;
    this.element = temp.content.firstElementChild! as T;
  }

  attachTo(parent: HTMLElement, position: InsertPosition = 'afterbegin') {
    parent.insertAdjacentElement(position, this.element);
  }

  removeFrom(parent: HTMLElement) {
    if (parent !== this.element.parentElement) {
      throw new Error('Parent mismatch!');
    }
    parent.removeChild(this.element);
  }

  attach(component: Component, position?: InsertPosition) {
    component.attachTo(this.element, position);
  }
}
