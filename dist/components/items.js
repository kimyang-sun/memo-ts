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
        return _super.call(this, "\n      <li class=\"document__item\">\n        <button class=\"document__delete\">\u274E</button>\n      </li>\n    ") || this;
    }
    Item.prototype.addChild = function (child) {
        var container = this.element;
        child.attachTo(container);
    };
    return Item;
}(BaseComponent));
var Items = (function (_super) {
    __extends(Items, _super);
    function Items() {
        return _super.call(this, '<ul class="document__items"></ul>') || this;
    }
    Items.prototype.addChild = function (box) {
        var item = new Item();
        item.addChild(box);
        item.attachTo(this.element, 'beforeend');
    };
    return Items;
}(BaseComponent));
export { Items };
