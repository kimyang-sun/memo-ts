import { Items } from './components/items.js';
import { VideoItem } from './components/item/video.js';
import { NoteItem } from './components/item/note.js';
import { ImageItem } from './components/item/image.js';
var App = (function () {
    function App(appRoot) {
        this.items = new Items();
        this.items.attachTo(appRoot);
        var imageItem = new ImageItem('Image', './asset/bg.jpg');
        this.items.addChild(imageItem);
        var noteItem = new NoteItem('Note', "Lorem ipsum dolor sit, amet consectetur adipisicing elit.\n    Possimus commodi deserunt veritatis.");
        this.items.addChild(noteItem);
        var videoItem = new VideoItem('Video', 'https://www.youtube.com/watch?v=ylJOesNNDcM');
        this.items.addChild(videoItem);
    }
    return App;
}());
new App(document.querySelector('.document'));
