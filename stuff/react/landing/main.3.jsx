function Calculin(props) { // dumb
    return <h1>{props.num1 + props.num2}</h1>
}

ReactDOM.render(<>
    <Calculin num1={1} num2={2} />
</>, document.getElementById('root'))