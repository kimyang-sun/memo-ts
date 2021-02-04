var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { BaseComponent } from './../component.js';
var VideoItem = (function (_super) {
    __extends(VideoItem, _super);
    function VideoItem(title, url) {
        var _this = _super.call(this, "\n      <div class=\"item__box\">\n        <h3 class=\"item__title\"></h3>\n        <div class=\"item__video\">\n            <iframe\n              class=\"item__iframe\"\n              frameborder=\"0\"\n              allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\"\n              allowfullscreen\n            ></iframe>\n          </div>\n      </div>\n    ") || this;
        var titleElement = _this.element.querySelector('.item__title');
        titleElement.textContent = title;
        var iframeElement = _this.element.querySelector('.item__iframe');
        iframeElement.src = _this.convertToURL(url);
        return _this;
    }
    VideoItem.prototype.convertToURL = function (url) {
        var regex = /^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-]{11}))|(?:youtu.be\/([a-zA-Z0-9-]{11})))/;
        var match = url.match(regex);
        var videoId = match ? match[1] || match[2] : undefined;
        if (videoId) {
            return "https://youtube.com/embed/" + videoId;
        }
        else {
            alert('링크를 잘못 입력하였습니다. 😔');
            return url;
        }
    };
    return VideoItem;
}(BaseComponent));
export { VideoItem };
