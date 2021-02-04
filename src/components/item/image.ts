import { BaseComponent } from './../component.js';
export class ImageItem extends BaseComponent<HTMLElement> {
  constructor(title: string, url: string) {
    super(`
      <li class="document__item">
        <div class="item__box">
          <h3 class="item__title"></h3>
          <div class="item__image"></div>
          <button class="item__delete">❎</button>
        </div>
      </li>`);

    const imageElement = this.element.querySelector(
      '.item__image'
    )! as HTMLElement;
    imageElement.style.backgroundImage = `url('${url}')`;

    const titleElement = this.element.querySelector(
      '.item__title'
    )! as HTMLElement;
    titleElement.textContent = title;
  }
}
