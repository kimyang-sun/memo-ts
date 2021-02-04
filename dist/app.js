import { ImageItem } from './components/item/image.js';
import { Page } from './components/page.js';
var App = (function () {
    function App(appRoot) {
        this.page = new Page();
        this.page.attachTo(appRoot);
        this.imageItem = new ImageItem('Image', './asset/bg.jpg');
        this.imageItem.attachTo(document.querySelector('.document__items'));
    }
    return App;
}());
new App(document.querySelector('.document'));
