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
    }
    App.prototype.bindElementToPopUp = function (selector, InputType, makeSection) {
        var _this = this;
        var button = document.querySelector(selector);
        button.addEventListener('click', function () {
            var popup = new InputPopUp();
            var inputForm = new InputType();
            popup.addChild(inputForm);
            popup.attachTo(_this.popUpRoot);
            popup.setOnCloseListner(function () {
                popup.removeFrom(_this.popUpRoot);
            });
            popup.setOnSubmitListner(function () {
                var imageItem = makeSection(inputForm);
                _this.items.addChild(imageItem);
                popup.removeFrom(_this.popUpRoot);
            });
        });
    };
    return App;
}());
new App(document.querySelector('.document'), document.body);
