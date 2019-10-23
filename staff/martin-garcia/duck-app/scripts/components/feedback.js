class Feedback extends Component {
    constructor(container) {
        super(container);
    }

    render = text => {
        const message = this.container.getElementsByClassName('feedback__message')[0];
        if (text === 'Succesful login' || text === 'Succesful registering')
            message.style.backgroundColor = '#42b883';
        else
            message.style.backgroundColor = '#c299fc';

        this.show()
        message.innerText = text;
    }
}