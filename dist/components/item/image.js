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
var ImageItem = (function (_super) {
    __extends(ImageItem, _super);
    function ImageItem(title, url) {
        var _this = _super.call(this, "\n      <div class=\"item__box\">\n        <div class=\"item__image\"></div>\n        <h3 class=\"item__title\"></h3>\n      </div>\n    ") || this;
        var titleElement = _this.element.querySelector('.item__title');
        titleElement.textContent = title;
        var imageElement = _this.element.querySelector('.item__image');
        imageElement.style.backgroundImage = "url('" + url + "')";
        return _this;
    }
    return ImageItem;
}(BaseComponent));
export { ImageItem };
