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
        this.items.addChild(new VideoItem('첼시, 그 10년의 역사', 'https://youtu.be/JzYAFeYO6cY'));
        this.items.addChild(new ImageItem('랜덤 이미지', 'https://picsum.photos/500/300'));
        this.items.addChild(new ImageItem('랜덤 이미지 두번째', 'http://loremflickr.com/500/300'));
        this.items.addChild(new NoteItem('아무 의미없는 문장', "\uAC04\uC5D0 \uAC19\uC774, \uC624\uC544\uC774\uC2A4\uB3C4 \uD480\uC774 \uC704\uD558\uC5EC, \uB180\uC774 \uC548\uACE0, \uAC83\uC774\uB2E4.\n        \uD53C\uAC00 \uCCAD\uCD98\uC744 \uB530\uB73B\uD55C \uCCAD\uCD98\uC774 \uD2B8\uACE0, \uBFD0\uC774\uB2E4.\n        \uC608\uC218\uB294 \uAC00\uC9C4 \uB530\uB73B\uD55C \uB54C\uC5D0, \uD53C\uACE0 \uC637\uC744 \uC788\uC73C\uBA70, \uBCF4\uC774\uB294 \uB300\uD55C \uC544\uB2C8\uB2E4.\n        \uBCF4\uB0B4\uB294 \uADF8\uB4E4\uC758 \uC788\uB294 \uB728\uAC70\uC6B4\uC9C0\uB77C, \uAC00\uB294 \uB54C\uBB38\uC774\uB2E4.\n        \uCCAD\uCD98 \uC774 \uC778\uAC04\uC758 \uADF8\uB4E4\uC740 \uAF43\uC774 \uD53C\uC5B4\uB098\uAE30 \uD560\uC9C0\uB2C8, \uC774\uAC83\uC774\uB2E4.\n        \uB6F0\uB178\uB294 \uB053\uB294 \uCCAD\uCD98\uC758 \uBCF4\uC774\uB294 \uC778\uAC04\uC5D0 \uACE0\uB3D9\uC744 \uAC83\uC774\uB2E4.\n        \uC601\uB77D\uACFC \uB418\uB824\uB2C8\uC640, \uB450\uC190\uC744 \uD53C\uC5B4\uB098\uB294 \uC2A4\uBA70\uB4E4\uC5B4 \uAD50\uD5A5\uC545\uC774\uB2E4.\n        \uB728\uACE0, \uD53C\uACE0, \uAD70\uC601\uACFC \uB54C\uBB38\uC774\uB2E4. \uC5BC\uC74C\uACFC \uC788\uB294 \uC6B0\uB9AC \uC2F8\uC778 \uAC19\uC774, \uCC9C\uACE0\uC5D0 \uBD80\uD328\uBFD0\uC774\uB2E4.\n        \uAC19\uC740 \uC5BC\uB9C8\uB098 \uAD00\uD604\uC545\uC774\uBA70, \uC601\uC6D0\uD788 \uC5F4\uB77D\uC758 \uB728\uACE0, \uADF8\uAC83\uC740 \uC0DD\uC0DD\uD558\uBA70, \uC774\uAC83\uC774\uB2E4."));
        this.items.addChild(new ImageItem('랜덤 이미지 세번째', 'https://source.unsplash.com/random/500x300'));
        this.items.addChild(new VideoItem('Bayern Munich vs Chelsea', 'https://youtu.be/khZC_L7Yv7s'));
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
