const names = ['James', 'John', 'Jim', 'Jack', 'Jake', 'Jason', 'Johnson', 'Joe', 'Jacob', 'Jonathan', 'Jennifer', 'Chonny']

ReactDOM.render(<>
    <h1>Hola Mundo</h1>
    <ul className="panel">{names.map((name, index) => <li key={index}>{name}</li>)}</ul>
</>
    , document.getElementById('root'))