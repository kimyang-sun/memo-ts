import { ImageItem } from './components/item/image.js';
import { Page } from './components/page.js';
class App {
  private readonly page: Page;
  private readonly imageItem: ImageItem;
  constructor(appRoot: HTMLElement) {
    this.page = new Page();
    this.page.attachTo(appRoot);
    this.imageItem = new ImageItem('Image', './asset/bg.jpg');
    this.imageItem.attachTo(
      document.querySelector('.document__items')! as HTMLElement
    );
  }
}

new App(document.querySelector('.document')! as HTMLElement);
