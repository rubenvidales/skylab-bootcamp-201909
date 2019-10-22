class Component {
    constructor(container) {
        this.__container__ = container
    }

    get container() {
        return this.__container__
    }

    add(child) {
        if (!(child instanceof Component)) throw TypeError(child + ' is not a Component')
        this.container.append(child.container)
    }
    
    show() {
        this.container.classList.remove('hidden')
    }
    
    hide() {
        this.container.classList.add('hidden')
    }
}