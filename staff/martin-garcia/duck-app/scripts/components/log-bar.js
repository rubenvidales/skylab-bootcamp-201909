class LogBar extends Component {
    constructor(container) {
        super(container);
    }

    onBack = undefined;

    render = text => {
        const message = this.container.getElementsByClassName('log-bar__user')[0];
        message.innerText = text;

        const back = this.container.getElementsByClassName('log-bar__button')[0];
        back.addEventListener('click', this.onBack);
        this.show();
    }
}