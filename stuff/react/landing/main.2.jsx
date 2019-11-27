function HelloWorld() {
    return <h1>Hello World</h1>
}

function Hello(props) {
    return <h1>Hello {props.name}</h1>
}

function MultiHello(props) {
    return <><h1>Hello {props.name1}</h1><h1>Hello {props.name2}</h1></>
}

ReactDOM.render(<>
    <HelloWorld />
    <Hello name="Pepito" />
    <MultiHello name1="Pepito" name2="Fulanito" />
</>, document.getElementById('root'))