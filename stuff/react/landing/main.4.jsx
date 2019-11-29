const { Component } = React

class Calculin extends Component { // smart
    constructor() {
        super()

        this.state = { result: null }
    }

    render() {
        return <form onSubmit={event => {
            event.preventDefault()

            const { num1: { value: num1 }, num2: { value: num2 } } = event.target

            this.setState({ result: Number(num1) + Number(num2) })
        }}>
            <input type="number" name="num1" /><input type="number" name="num2" />
            <button>=</button>
            <span>{this.state.result}</span>
        </form>
    }
}

ReactDOM.render(<>
    <Calculin />
</>, document.getElementById('root'))