import { TextInput } from './components/popup/input/text_input.js';
import { MediaInput } from './components/popup/input/media_input.js';
import { InputPopUp } from './components/popup/popup.js';
import { Item, Items } from './components/items.js';
import { VideoItem } from './components/item/video.js';
import { NoteItem } from './components/item/note.js';
import { ImageItem } from './components/item/image.js';
var App = (function () {
    function App(appRoot, popUpRoot) {
        this.popUpRoot = popUpRoot;
        this.items = new Items(Item);
        this.items.attachTo(appRoot);
        this.bindElementToPopUp('#add_image', MediaInput, function (input) { return new ImageItem(input.title, input.url); });
        this.bindElementToPopUp('#add_video', MediaInput, function (input) { return new VideoItem(input.title, input.url); });
        this.bindElementToPopUp('#add_note', TextInput, function (input) { return new NoteItem(input.title, input.content); });
        this.items.addChild(new NoteItem('타입스크립트 객체지향', "\uB9C1\uD06C \uC0AC\uC9C4, \uC720\uD29C\uBE0C \uBE44\uB514\uC624, \uD14D\uC2A4\uD2B8\uB97C \uCD94\uAC00\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uD83D\uDE42"));
        this.items.addChild(new ImageItem('랜덤 이미지', 'https://picsum.photos/560/260'));
        this.items.addChild(new VideoItem('첼시, 그 10년의 역사', 'https://youtu.be/JzYAFeYO6cY'));
    }
    App.prototype.bindElementToPopUp = function (selector, InputType, makeSection) {
        var _this = this;
        var button = document.querySelector(selector);
        button.addEventListener('click', function () {
            var popup = new InputPopUp();
            var inputForm = new InputType();
            popup.addChild(inputForm);
            popup.attachTo(_this.popUpRoot);
            popup.setOnCloseListener(function () {
                popup.removeFrom(_this.popUpRoot);
            });
            popup.setOnSubmitListener(function () {
                var imageItem = makeSection(inputForm);
                _this.items.addChild(imageItem);
                popup.removeFrom(_this.popUpRoot);
            });
        });
    };
    return App;
}());
new App(document.querySelector('.document'), document.body);
