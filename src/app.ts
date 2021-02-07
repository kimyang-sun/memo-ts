import { TextInput } from './components/popup/input/text_input.js';
import { MediaInput } from './components/popup/input/media_input.js';
import { InputPopUp, MediaData, TextData } from './components/popup/popup.js';
import { Composable, Item, Items } from './components/items.js';
import { Component } from './components/component.js';
import { VideoItem } from './components/item/video.js';
import { NoteItem } from './components/item/note.js';
import { ImageItem } from './components/item/image.js';

type InputType = (MediaData | TextData) & Component;
type InputConstructor<T = InputType> = {
  new (): T;
};

class App {
  private readonly items: Component & Composable;
  constructor(appRoot: HTMLElement, private popUpRoot: HTMLElement) {
    this.items = new Items(Item);
    this.items.attachTo(appRoot);

    this.bindElementToPopUp<MediaInput>(
      '#add_image',
      MediaInput,
      (input: MediaInput) => new ImageItem(input.title, input.url)
    );

    this.bindElementToPopUp<MediaInput>(
      '#add_video',
      MediaInput,
      (input: MediaInput) => new VideoItem(input.title, input.url)
    );

    this.bindElementToPopUp<TextInput>(
      '#add_note',
      TextInput,
      (input: TextInput) => new NoteItem(input.title, input.content)
    );

    // demo
    this.items.addChild(
      new NoteItem(
        '타입스크립트 객체지향',
        `링크 사진, 유튜브 비디오, 텍스트를 추가할 수 있습니다. 🙂`
      )
    );
    this.items.addChild(
      new ImageItem('랜덤 이미지', 'https://picsum.photos/560/260')
    );
    this.items.addChild(
      new VideoItem('첼시, 그 10년의 역사', 'https://youtu.be/JzYAFeYO6cY')
    );
  }

  private bindElementToPopUp<T extends InputType>(
    selector: string,
    InputType: InputConstructor<T>,
    makeSection: (input: T) => Component
  ) {
    const button = document.querySelector(selector)! as HTMLElement;
    button.addEventListener('click', () => {
      const popup = new InputPopUp();
      const inputForm = new InputType();
      popup.addChild(inputForm);
      popup.attachTo(this.popUpRoot);

      popup.setOnCloseListener(() => {
        popup.removeFrom(this.popUpRoot);
      });

      popup.setOnSubmitListener(() => {
        const imageItem = makeSection(inputForm);
        this.items.addChild(imageItem);
        popup.removeFrom(this.popUpRoot);
      });
    });
  }
}

new App(document.querySelector('.document')! as HTMLElement, document.body);
