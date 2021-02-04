import { BaseComponent } from './../component.js';

export class ImageItem extends BaseComponent<HTMLElement> {
  constructor(title: string, url: string) {
    super(`
      <div class="item__box">
        <h3 class="item__title"></h3>
        <div class="item__image"></div>
      </div>
    `);

    const titleElement = this.element.querySelector(
      '.item__title'
    )! as HTMLHeadElement;
    titleElement.textContent = title;

    const imageElement = this.element.querySelector(
      '.item__image'
    )! as HTMLDivElement;
    imageElement.style.backgroundImage = `url('${url}')`;
  }
}
