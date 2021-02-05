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
var TextInput = (function (_super) {
    __extends(TextInput, _super);
    function TextInput() {
        return _super.call(this, "\n      <div class=\"form__container\">\n        <div class=\"form__box\">\n          <label for=\"title\" class=\"font-potta\">Title</label>\n          <input type=\"text\" id=\"title\" autocomplete=\"off\" />\n        </div>\n        <div class=\"form__box\">\n          <label for=\"content\" class=\"font-potta\">Content</label>\n          <input type=\"text\" id=\"content\" autocomplete=\"off\">\n        </div>\n      </div>\n    ") || this;
    }
    Object.defineProperty(TextInput.prototype, "title", {
        get: function () {
            var element = this.element.querySelector('#title');
            return element.value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextInput.prototype, "content", {
        get: function () {
            var element = this.element.querySelector('#content');
            return element.value;
        },
        enumerable: false,
        configurable: true
    });
    return TextInput;
}(BaseComponent));
export { TextInput };
