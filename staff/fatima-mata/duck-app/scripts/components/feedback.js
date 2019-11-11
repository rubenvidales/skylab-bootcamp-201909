class Feedback extends Component {
    constructor(container) {
        super(container)
    }

    render(text) {
        const message = this.container.getElementsByClassName('feedback__message')[0]
        message.innerText = text
    }
}