import { VideoItem } from './components/item/video.js';
import { NoteItem } from './components/item/note.js';
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

    const noteItem = new NoteItem(
      'Note',
      `Lorem ipsum dolor sit, amet consectetur adipisicing elit.
    Possimus commodi deserunt veritatis, cupiditate veniam eos
    incidunt reprehenderit cum explicabo saepe magnam id eveniet
    iusto error vel. Doloremque eius iste saepe.`
    );
    noteItem.attachTo(items, 'beforeend');

    const videoItem = new VideoItem(
      'Video',
      'https://www.youtube.com/watch?v=ylJOesNNDcM'
    );
    videoItem.attachTo(items, 'beforeend');
  }
}

new App(document.querySelector('.document')! as HTMLElement);
