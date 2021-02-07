import { BaseComponent } from './../component.js';

export class VideoItem extends BaseComponent<HTMLElement> {
  constructor(title: string, url: string) {
    super(`
      <div class="item__box">
        <div class="item__video">
            <iframe
              class="item__iframe"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <h3 class="item__title"></h3>
      </div>
    `);

    const titleElement = this.element.querySelector(
      '.item__title'
    )! as HTMLHeadElement;
    titleElement.textContent = title;

    const iframeElement = this.element.querySelector(
      '.item__iframe'
    )! as HTMLIFrameElement;
    iframeElement.src = this.convertToURL(url); // url -> videoId -> embed
  }

  convertToURL(url: string): string {
    const regex = /^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-_]{11}))|(?:youtu.be\/([a-zA-Z0-9-_]{11})))/;
    const match = url.match(regex);
    const videoId = match ? match[1] || match[2] : undefined;
    if (videoId) {
      return `https://youtube.com/embed/${videoId}`;
    } else {
      alert('링크를 잘못 입력하였습니다. 😔');
      return url;
    }
  }
}
