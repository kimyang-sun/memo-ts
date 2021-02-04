export class ImageItem {
  private element: HTMLElement;
  constructor(title: string, url: string) {
    const temp = document.createElement('template');
    temp.innerHTML = `
    <li class="document__item">
      <div class="item__box">
        <h3 class="item__title"></h3>
        <div class="item__image"></div>
        <button class="item__delete">❎</button>
      </div>
    </li>
    `;
    this.element = temp.content.firstElementChild! as HTMLElement;
    const imageElement = this.element.querySelector(
      '.item__image'
    )! as HTMLElement;
    imageElement.style.backgroundImage = `url('${url}')`;

    const titleElement = this.element.querySelector(
      '.item__title'
    )! as HTMLElement;
    titleElement.textContent = title;
  }

  attachTo(parent: HTMLElement, position: InsertPosition = 'afterbegin') {
    parent.insertAdjacentElement(position, this.element);
  }
}
