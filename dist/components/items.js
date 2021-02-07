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
        var _this = _super.call(this, "\n      <li class=\"document__item\" draggable=\"true\">\n        <button class=\"document__delete\">\u274E</button>\n      </li>\n    ") || this;
        var deleteBtn = _this.element.querySelector('.document__delete');
        deleteBtn.onclick = function () {
            _this.deleteListener && _this.deleteListener();
        };
        _this.element.addEventListener('dragstart', function (event) {
            _this.dragStart(event);
        });
        _this.element.addEventListener('dragend', function (event) {
            _this.dragEnd(event);
        });
        _this.element.addEventListener('dragenter', function (event) {
            _this.dragEnter(event);
        });
        _this.element.addEventListener('dragleave', function (event) {
            _this.dragLeave(event);
        });
        return _this;
    }
    Item.prototype.addChild = function (child) {
        var container = this.element;
        child.attachTo(container);
    };
    Item.prototype.setOnDeleteListener = function (listener) {
        this.deleteListener = listener;
    };
    Item.prototype.dragStart = function (_) {
        this.notifyDragObserver('start');
        this.element.classList.add('dragged');
    };
    Item.prototype.dragEnd = function (_) {
        this.notifyDragObserver('end');
        this.element.classList.remove('dragged');
    };
    Item.prototype.dragEnter = function (_) {
        this.notifyDragObserver('enter');
        this.element.classList.add('entered');
    };
    Item.prototype.dragLeave = function (_) {
        this.notifyDragObserver('leave');
        this.element.classList.remove('entered');
    };
    Item.prototype.notifyDragObserver = function (state) {
        this.dragListener && this.dragListener(this, state);
    };
    Item.prototype.setOnDragListener = function (listener) {
        this.dragListener = listener;
    };
    Item.prototype.muteChildren = function (state) {
        if (state === 'mute') {
            this.element.classList.add('mute');
        }
        else {
            this.element.classList.remove('mute');
        }
    };
    Item.prototype.getBoundingRect = function () {
        return this.element.getBoundingClientRect();
    };
    Item.prototype.onDropped = function () {
        this.element.classList.remove('entered');
    };
    return Item;
}(BaseComponent));
export { Item };
var Items = (function (_super) {
    __extends(Items, _super);
    function Items(itemConstructor) {
        var _this = _super.call(this, '<ul class="document__items"></ul>') || this;
        _this.itemConstructor = itemConstructor;
        _this.children = new Set();
        _this.element.addEventListener('dragover', function (event) {
            _this.dragOver(event);
        });
        _this.element.addEventListener('drop', function (event) {
            _this.dragDrop(event);
        });
        return _this;
    }
    Items.prototype.addChild = function (box) {
        var _this = this;
        var item = new this.itemConstructor();
        item.addChild(box);
        item.attachTo(this.element, 'beforeend');
        item.setOnDeleteListener(function () {
            item.removeFrom(_this.element);
            _this.children.delete(item);
        });
        this.children.add(item);
        item.setOnDragListener(function (target, state) {
            switch (state) {
                case 'start':
                    _this.dragTarget = target;
                    _this.updateItems('mute');
                    break;
                case 'end':
                    _this.dragTarget = undefined;
                    _this.updateItems('unmute');
                    break;
                case 'enter':
                    _this.dropTarget = target;
                    break;
                case 'leave':
                    _this.dropTarget = undefined;
                    break;
                default:
                    throw new Error("Invalid state: " + state);
            }
        });
    };
    Items.prototype.dragOver = function (event) {
        event.preventDefault();
    };
    Items.prototype.dragDrop = function (event) {
        event.preventDefault();
        if (!this.dropTarget)
            return;
        if (this.dragTarget && this.dragTarget !== this.dropTarget) {
            var dropY = event.clientY;
            var target = this.dragTarget.getBoundingRect();
            this.dragTarget.removeFrom(this.element);
            this.dropTarget.attach(this.dragTarget, dropY < target.y ? 'beforebegin' : 'afterend');
        }
        this.dropTarget.onDropped();
    };
    Items.prototype.updateItems = function (state) {
        this.children.forEach(function (item) {
            item.muteChildren(state);
        });
    };
    return Items;
}(BaseComponent));
export { Items };
