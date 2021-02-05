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
import { BaseComponent } from './component.js';
var Item = (function (_super) {
    __extends(Item, _super);
    function Item() {
        var _this = _super.call(this, "\n      <li class=\"document__item\">\n        <button class=\"document__delete\">\u274E</button>\n      </li>\n    ") || this;
        var deleteBtn = _this.element.querySelector('.document__delete');
        deleteBtn.onclick = function () {
            _this.deleteListner && _this.deleteListner();
        };
        return _this;
    }
    Item.prototype.addChild = function (child) {
        var container = this.element;
        child.attachTo(container);
    };
    Item.prototype.setOnDeleteListner = function (listner) {
        this.deleteListner = listner;
    };
    return Item;
}(BaseComponent));
export { Item };
var Items = (function (_super) {
    __extends(Items, _super);
    function Items(itemConstructor) {
        var _this = _super.call(this, '<ul class="document__items"></ul>') || this;
        _this.itemConstructor = itemConstructor;
        return _this;
    }
    Items.prototype.addChild = function (box) {
        var _this = this;
        var item = new this.itemConstructor();
        item.addChild(box);
        item.attachTo(this.element, 'beforeend');
        item.setOnDeleteListner(function () {
            item.removeFrom(_this.element);
        });
    };
    return Items;
}(BaseComponent));
export { Items };
