import { BaseComponent } from './../component.js';

export class VideoItem extends BaseComponent<HTMLElement> {
  constructor(title: string, url: string) {
    super(`
    <li class="document__item">
      <div class="item__box">
        <h3 class="item__title"></h3>
        <div class="item__video">
          <iframe
            class="item__iframe"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <button class="item__delete">❎</button>
      </div>
    </li>
    `);

    const titleElement = this.element.querySelector(
      '.item__title'
    )! as HTMLHeadElement;
    titleElement.textContent = title;

    const iframeElement = this.element.querySelector(
      '.item__iframe'
    )! as HTMLIFrameElement;
    iframeElement.src = this.convertToURL(url); // url -> videoId -> embed
    // https://www.youtube.com/watch?v=ylJOesNNDcM
    // https://youtu.be/ylJOesNNDcM
    // https://youtube.com/embed/ylJOesNNDcM
  }

  convertToURL(url: string): string {
    const regex = /^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-]{11}))|(?:youtu.be\/([a-zA-Z0-9-]{11})))/;
    const match = url.match(regex);
    const videoId = match ? match[1] || match[2] : undefined;
    console.log(videoId);
    if (videoId) {
      console.log('hi');
      return `https://youtube.com/embed/${videoId}`;
    } else {
      console.log('hi');
      alert('링크를 잘못 입력하였습니다. 😔');
      return url;
    }
  }
}
