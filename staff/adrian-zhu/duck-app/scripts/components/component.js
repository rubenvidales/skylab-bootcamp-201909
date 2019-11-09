class Component {
    constructor(container){
        this.__container__ = container
    }

    get container(){
        return this.__container__
    }

    add(child) {
        if(!(child instanceof Component)) throw TypeError(`${child} + is a COmmponent`)

        this.container.append(child.container)
    }

    show(){
        this.container.classList.remove('hide')
    }

    hide(){
        this.container.classList.add('hide')
    }
}