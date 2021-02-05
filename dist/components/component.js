var BaseComponent = (function () {
    function BaseComponent(htmlString) {
        var temp = document.createElement('template');
        temp.innerHTML = htmlString;
        this.element = temp.content.firstElementChild;
    }
    BaseComponent.prototype.attachTo = function (parent, position) {
        if (position === void 0) { position = 'afterbegin'; }
        parent.insertAdjacentElement(position, this.element);
    };
    BaseComponent.prototype.removeFrom = function (parent) {
        if (parent !== this.element.parentElement) {
            throw new Error('Parent mismatch!');
        }
        parent.removeChild(this.element);
    };
    return BaseComponent;
}());
export { BaseComponent };
