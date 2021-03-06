import { TextData } from './../popup.js';
import { BaseComponent } from './../../component.js';
export class TextInput extends BaseComponent<HTMLElement> implements TextData {
  constructor() {
    super(`
      <div class="form__container">
        <div class="form__box">
          <label for="title" class="font-potta">Title</label>
          <input type="text" id="title" autocomplete="off" />
        </div>
        <div class="form__box">
          <label for="content" class="font-potta">Content</label>
          <input type="text" id="content" autocomplete="off">
        </div>
      </div>
    `);
  }

  get title(): string {
    const element = this.element.querySelector('#title')! as HTMLInputElement;
    return element.value;
  }

  get content(): string {
    const element = this.element.querySelector('#content')! as HTMLInputElement;
    return element.value;
  }
}
