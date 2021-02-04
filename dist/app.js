import { VideoItem } from './components/item/video.js';
import { NoteItem } from './components/item/note.js';
import { ImageItem } from './components/item/image.js';
import { Page } from './components/page.js';
var App = (function () {
    function App(appRoot) {
        this.page = new Page();
        this.page.attachTo(appRoot);
        var items = document.querySelector('.document__items');
        var imageItem = new ImageItem('Image', './asset/bg.jpg');
        imageItem.attachTo(items, 'beforeend');
        var noteItem = new NoteItem('Note', "Lorem ipsum dolor sit, amet consectetur adipisicing elit.\n    Possimus commodi deserunt veritatis, cupiditate veniam eos\n    incidunt reprehenderit cum explicabo saepe magnam id eveniet\n    iusto error vel. Doloremque eius iste saepe.");
        noteItem.attachTo(items, 'beforeend');
        var videoItem = new VideoItem('Video', 'https://www.youtube.com/watch?v=ylJOesNNDcM');
        videoItem.attachTo(items, 'beforeend');
    }
    return App;
}());
new App(document.querySelector('.document'));
