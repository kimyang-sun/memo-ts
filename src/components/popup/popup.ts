import { Composable } from './../items.js';
import { BaseComponent, Component } from './../component.js';

type OnListener = () => void;

export interface MediaData {
  readonly title: string;
  readonly url: string;
}

export interface TextData {
  readonly title: string;
  readonly content: string;
}
export class InputPopUp
  extends BaseComponent<HTMLElement>
  implements Composable {
  private closeListener?: OnListener;
  private submitListener?: OnListener;
  constructor() {
    super(`
    <section class="popup">
      <div class="popup__content">
        <button class="popup__close">❎</button>
        <div class="popup__substance"></div>
        <button class="popup__submit font-potta">CREATE</button>
      </div>
    </section>
    `);

    const closeBtn = this.element.querySelector(
      '.popup__close'
    )! as HTMLButtonElement;
    closeBtn.onclick = () => {
      this.closeListener && this.closeListener();
    };

    const submitBtn = this.element.querySelector(
      '.popup__submit'
    )! as HTMLButtonElement;
    submitBtn.onclick = () => {
      this.submitListener && this.submitListener();
    };
  }

  setOnCloseListener(listener: OnListener) {
    this.closeListener = listener;
  }

  setOnSubmitListener(listener: OnListener) {
    this.submitListener = listener;
  }

  addChild(child: Component) {
    const substance = this.element.querySelector(
      '.popup__substance'
    )! as HTMLElement;
    child.attachTo(substance);
  }
}
