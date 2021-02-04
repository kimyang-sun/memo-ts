import { ImageItem } from './components/item/image.js';
import { Page } from './components/page.js';
var App = (function () {
    function App(appRoot) {
        this.page = new Page();
        this.page.attachTo(appRoot);
        var items = document.querySelector('.document__items');
        var imageItem = new ImageItem('Image', './asset/bg.jpg');
        imageItem.attachTo(items, 'beforeend');
    }
    return App;
}());
new App(document.querySelector('.document'));
