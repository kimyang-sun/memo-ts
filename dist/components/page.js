var Page = (function () {
    function Page() {
        this.element = document.createElement('ul');
        this.element.setAttribute('class', 'document__items');
    }
    Page.prototype.attachTo = function (parent, position) {
        if (position === void 0) { position = 'afterbegin'; }
        parent.insertAdjacentElement(position, this.element);
    };
    return Page;
}());
export { Page };
