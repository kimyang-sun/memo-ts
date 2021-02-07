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
      new VideoItem('첼시, 그 10년의 역사', 'https://youtu.be/JzYAFeYO6cY')
    );
    this.items.addChild(
      new ImageItem('랜덤 이미지', 'https://picsum.photos/560/260')
    );
    this.items.addChild(
      new ImageItem('랜덤 이미지 두번째', 'http://loremflickr.com/560/260')
    );
    this.items.addChild(
      new NoteItem(
        '아무 의미없는 문장',
        `간에 같이, 오아이스도 풀이 위하여, 놀이 안고, 것이다.
        피가 청춘을 따뜻한 청춘이 트고, 뿐이다.
        예수는 가진 따뜻한 때에, 피고 옷을 있으며, 보이는 대한 아니다.
        보내는 그들의 있는 뜨거운지라, 가는 때문이다.
        청춘 이 인간의 그들은 꽃이 피어나기 할지니, 이것이다.
        뛰노는 끓는 청춘의 보이는 인간에 고동을 것이다.
        영락과 되려니와, 두손을 피어나는 스며들어 교향악이다.
        뜨고, 피고, 군영과 때문이다. 얼음과 있는 우리 싸인 같이, 천고에 부패뿐이다.
        같은 얼마나 관현악이며, 영원히 열락의 뜨고, 그것은 생생하며, 이것이다.`
      )
    );
    this.items.addChild(
      new ImageItem(
        '랜덤 이미지 세번째',
        'https://source.unsplash.com/random/560x260'
      )
    );
    this.items.addChild(
      new VideoItem('Bayern Munich vs Chelsea', 'https://youtu.be/khZC_L7Yv7s')
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
