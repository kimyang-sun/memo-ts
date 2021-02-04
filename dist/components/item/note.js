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
var NoteItem = (function (_super) {
    __extends(NoteItem, _super);
    function NoteItem(title, content) {
        var _this = _super.call(this, "\n    <div class=\"item__box\">\n      <h3 class=\"item__title\"></h3>\n      <p class=\"item__content\"></p>\n    </div>\n    ") || this;
        var titleElement = _this.element.querySelector('.item__title');
        titleElement.textContent = title;
        var contentElement = _this.element.querySelector('.item__content');
        contentElement.textContent = content;
        return _this;
    }
    return NoteItem;
}(BaseComponent));
export { NoteItem };
