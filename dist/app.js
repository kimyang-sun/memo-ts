import { MediaInput } from './components/popup/input/media_input.js';
import { InputPopUp } from './components/popup/popup.js';
import { Item, Items } from './components/items.js';
import { ImageItem } from './components/item/image.js';
var App = (function () {
    function App(appRoot, popUpRoot) {
        var _this = this;
        this.items = new Items(Item);
        this.items.attachTo(appRoot);
        var imgBtn = document.querySelector('#add_image');
        imgBtn.addEventListener('click', function () {
            var popup = new InputPopUp();
            var inputForm = new MediaInput();
            popup.addChild(inputForm);
            popup.attachTo(popUpRoot);
            popup.setOnCloseListner(function () {
                popup.removeFrom(popUpRoot);
            });
            popup.setOnSubmitListner(function () {
                var imageItem = new ImageItem(inputForm.title, inputForm.url);
                _this.items.addChild(imageItem);
                popup.removeFrom(popUpRoot);
            });
        });
    }
    return App;
}());
new App(document.querySelector('.document'), document.body);
