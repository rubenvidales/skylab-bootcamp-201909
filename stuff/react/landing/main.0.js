const title = React.createElement('h1', undefined, 'Hola Mundo')

const names = ['James', 'John', 'Jim', 'Jack', 'Jake', 'Jason', 'Johnson', 'Joe', 'Jacob', 'Jonathan', 'Jennifer', 'Chonny']

const items = names.map(name => React.createElement('li', undefined, name))

const list = React.createElement('ul', undefined, items)

ReactDOM.render([title, list], document.getElementById('root'))