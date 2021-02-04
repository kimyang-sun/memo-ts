import { ImageItem } from './components/item/image.js';
import { Page } from './components/page.js';
class App {
  private readonly page: Page;
  constructor(appRoot: HTMLElement) {
    this.page = new Page();
    this.page.attachTo(appRoot);
    const items = document.querySelector(
      '.document__items'
    )! as HTMLUListElement;
    const imageItem = new ImageItem('Image', './asset/bg.jpg');
    imageItem.attachTo(items, 'beforeend');
  }
}

new App(document.querySelector('.document')! as HTMLElement);
