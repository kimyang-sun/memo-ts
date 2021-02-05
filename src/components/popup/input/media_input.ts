import { MediaData } from './../popup.js';
import { BaseComponent } from './../../component.js';
export class MediaInput
  extends BaseComponent<HTMLElement>
  implements MediaData {
  constructor() {
    super(`
      <div class="form__container">
        <div class="form__box">
          <label for="title" class="font-potta">Title</label>
          <input type="text" id="title" autocomplete="off" />
        </div>
        <div class="form__box">
          <label for="url" class="font-potta">URL</label>
          <input type="text" id="url" autocomplete="off" />
        </div>
      </div>
    `);
  }

  get title(): string {
    const element = this.element.querySelector('#title')! as HTMLInputElement;
    return element.value;
  }

  get url(): string {
    const element = this.element.querySelector('#url')! as HTMLInputElement;
    return element.value;
  }
}
