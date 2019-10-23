class Component {
    constructor(container) {
        this.__container__ = container;
    }
    get container() {
        return this.__container__;
    }

    add = function(child) {
        if (!(child instanceof Component)) throw TypeError(child + ' is not a Component');

        this.container.append(child.container);
    };

    show = function() {
        this.container.classList.remove('hide');
    };

    hide = function() {
        this.container.classList.add('hide');
    };
}