import { BaseComponent } from './../component.js';

export class NoteItem extends BaseComponent<HTMLElement> {
  constructor(title: string, content: string) {
    super(`
    <div class="item__box">
      <p class="item__content"></p>
      <h3 class="item__title"></h3>
    </div>
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
