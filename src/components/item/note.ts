import { BaseComponent } from './../component.js';
export class NoteItem extends BaseComponent<HTMLElement> {
  constructor(title: string, content: string) {
    super(`
      <li class="document__item">
        <div class="item__box">
          <h3 class="item__title"></h3>
          <p class="item__content"></p>
          <button class="item__delete">❎</button>
        </div>
      </li>
    `);

    const titleElement = this.element.querySelector(
      '.item__title'
    )! as HTMLHeadElement;
    titleElement.textContent = title;

    const contentElement = this.element.querySelector(
      '.item__content'
    )! as HTMLParagraphElement;
    contentElement.textContent = content;
  }
}
