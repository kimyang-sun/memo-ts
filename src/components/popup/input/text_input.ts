import { BaseComponent } from './../../component';
export class TextInput extends BaseComponent<HTMLElement> {
  constructor() {
    super(`
      <div class="form__container">
        <div class="form__box">
          <label for="title">Title</label>
          <input type="text" id="title" />
        </div>
        <div class="form__box">
          <label for="content">URL</label>
          <textarea type="text" row="3" id="content" />
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
