export interface Component {
  attachTo(parent: HTMLElement, position?: InsertPosition): void;
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
}
