import { Composable, Items } from './components/items.js';
import { Component } from './components/component.js';
import { VideoItem } from './components/item/video.js';
import { NoteItem } from './components/item/note.js';
import { ImageItem } from './components/item/image.js';

class App {
  private readonly items: Component & Composable;
  constructor(appRoot: HTMLElement) {
    this.items = new Items();
    this.items.attachTo(appRoot);

    const imageItem = new ImageItem('Image', './asset/bg.jpg');
    this.items.addChild(imageItem);

    const noteItem = new NoteItem(
      'Note',
      `Lorem ipsum dolor sit, amet consectetur adipisicing elit.
    Possimus commodi deserunt veritatis.`
    );
    this.items.addChild(noteItem);

    const videoItem = new VideoItem(
      'Video',
      'https://www.youtube.com/watch?v=ylJOesNNDcM'
    );
    this.items.addChild(videoItem);
  }
}

new App(document.querySelector('.document')! as HTMLElement);
