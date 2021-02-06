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
var InputPopUp = (function (_super) {
    __extends(InputPopUp, _super);
    function InputPopUp() {
        var _this = _super.call(this, "\n    <section class=\"popup\">\n      <div class=\"popup__content\">\n        <button class=\"popup__close\">\u274E</button>\n        <div class=\"popup__substance\"></div>\n        <button class=\"popup__submit font-potta\">CREATE</button>\n      </div>\n    </section>\n    ") || this;
        var closeBtn = _this.element.querySelector('.popup__close');
        closeBtn.onclick = function () {
            _this.closeListener && _this.closeListener();
        };
        var submitBtn = _this.element.querySelector('.popup__submit');
        submitBtn.onclick = function () {
            _this.submitListener && _this.submitListener();
        };
        return _this;
    }
    InputPopUp.prototype.setOnCloseListener = function (listener) {
        this.closeListener = listener;
    };
    InputPopUp.prototype.setOnSubmitListener = function (listener) {
        this.submitListener = listener;
    };
    InputPopUp.prototype.addChild = function (child) {
        var substance = this.element.querySelector('.popup__substance');
        child.attachTo(substance);
    };
    return InputPopUp;
}(BaseComponent));
export { InputPopUp };
