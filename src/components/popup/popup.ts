import { Composable } from './../items.js';
import { BaseComponent, Component } from './../component.js';

type OnListner = () => void;

export class InputPopUp
  extends BaseComponent<HTMLElement>
  implements Composable {
  private closeListner?: OnListner;
  private submitListner?: OnListner;
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
      this.closeListner && this.closeListner();
    };

    const submitBtn = this.element.querySelector(
      '.popup__submit'
    )! as HTMLButtonElement;
    submitBtn.onclick = () => {
      this.submitListner && this.submitListner();
    };
  }

  setOnCloseListner(listner: OnListner) {
    this.closeListner = listner;
  }

  setOnSubmitListner(listner: OnListner) {
    this.submitListner = listner;
  }

  addChild(child: Component) {
    const substance = this.element.querySelector(
      '.popup__substance'
    )! as HTMLElement;
    child.attachTo(substance);
  }
}
