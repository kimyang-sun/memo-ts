var ImageItem = (function () {
    function ImageItem(title, url) {
        var temp = document.createElement('template');
        temp.innerHTML = "\n    <li class=\"document__item\">\n      <div class=\"item__box\">\n        <h3 class=\"item__title\"></h3>\n        <div class=\"item__image\"></div>\n        <button class=\"item__delete\">\u274E</button>\n      </div>\n    </li>\n    ";
        this.element = temp.content.firstElementChild;
        var imageElement = this.element.querySelector('.item__image');
        imageElement.style.backgroundImage = "url('" + url + "')";
        var titleElement = this.element.querySelector('.item__title');
        titleElement.textContent = title;
    }
    ImageItem.prototype.attachTo = function (parent, position) {
        if (position === void 0) { position = 'afterbegin'; }
        parent.insertAdjacentElement(position, this.element);
    };
    return ImageItem;
}());
export { ImageItem };
