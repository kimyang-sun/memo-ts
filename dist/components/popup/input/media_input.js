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
import { BaseComponent } from './../../component.js';
var MediaInput = (function (_super) {
    __extends(MediaInput, _super);
    function MediaInput() {
        return _super.call(this, "\n      <div class=\"form__container\">\n        <div class=\"form__box\">\n          <label for=\"title\" class=\"font-potta\">Title</label>\n          <input type=\"text\" id=\"title\" autocomplete=\"off\" />\n        </div>\n        <div class=\"form__box\">\n          <label for=\"url\" class=\"font-potta\">URL</label>\n          <input type=\"text\" id=\"url\" autocomplete=\"off\" />\n        </div>\n      </div>\n    ") || this;
    }
    Object.defineProperty(MediaInput.prototype, "title", {
        get: function () {
            var element = this.element.querySelector('#title');
            return element.value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MediaInput.prototype, "url", {
        get: function () {
            var element = this.element.querySelector('#url');
            return element.value;
        },
        enumerable: false,
        configurable: true
    });
    return MediaInput;
}(BaseComponent));
export { MediaInput };
