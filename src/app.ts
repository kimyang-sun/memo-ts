import { MediaInput } from './components/popup/input/media_input.js';
import { InputPopUp } from './components/popup/popup.js';
import { Composable, Item, Items } from './components/items.js';
import { Component } from './components/component.js';
// import { VideoItem } from './components/item/video.js';
// import { NoteItem } from './components/item/note.js';
import { ImageItem } from './components/item/image.js';

class App {
  private readonly items: Component & Composable;
  constructor(appRoot: HTMLElement, popUpRoot: HTMLElement) {
    this.items = new Items(Item);
    this.items.attachTo(appRoot);

    // const imageItem = new ImageItem('Image', './asset/bg.jpg');
    // this.items.addChild(imageItem);

    // const noteItem = new NoteItem(
    //   'Note',
    //   `Lorem ipsum dolor sit, amet consectetur adipisicing elit.
    // Possimus commodi deserunt veritatis.`
    // );
    // this.items.addChild(noteItem);

    // const videoItem = new VideoItem(
    //   'Video',
    //   'https://www.youtube.com/watch?v=ylJOesNNDcM'
    // );
    // this.items.addChild(videoItem);

    const imgBtn = document.querySelector('#add_image')! as HTMLElement;
    imgBtn.addEventListener('click', () => {
      const popup = new InputPopUp();
      const inputForm = new MediaInput();
      popup.addChild(inputForm);
      popup.attachTo(popUpRoot);

      popup.setOnCloseListner(() => {
        popup.removeFrom(popUpRoot);
      });

      popup.setOnSubmitListner(() => {
        // 팝업을 만들어서 페이지에 추가
        const imageItem = new ImageItem(inputForm.title, inputForm.url);
        this.items.addChild(imageItem);
        popup.removeFrom(popUpRoot);
      });
    });
  }
}

new App(document.querySelector('.document')! as HTMLElement, document.body);
