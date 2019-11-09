// DEMO synchronous operations

new Promise((resolve, reject) => {
	resolve(10)
})
	.then(res => res * 10)
	.then(res => { console.log(res); return res })
	.catch(error => console.error(1, error.message))
	.then(res => { throw Error(res) })
	.then(res => res + 10)
	.then(res => console.log(res))
	.catch(error => console.error(2, error.message))

// DEMO asynchronous operations

new Promise((resolve, reject) => {
	resolve(10)
})
	.then(res => res * 10)
	.then(res => { console.log(res); return res })
	//.catch(error => console.error(1, error.message))
	//.then(res => { throw Error(res) })
	.then(res => new Promise((resolve, reject) => setTimeout(() => resolve(res * 5), 5000)))
	.then(res => res + 10)
	.then(res => { console.log(res); return res })
	.then(res => new Promise((resolve, reject) => setTimeout(() => resolve(res + 2000), 3000)))
	.then(res => res + 10)
	.then(res => console.log(res))
	//.catch(error => console.error(2, error.message))

// DEMO parallel, no order

fetch('http://duckling-api.herokuapp.com/api/search?q=green') // Fetch API
	.then(res => res.json())
	.then(ducks => {
		ducks.forEach(({id}) => fetch(`http://duckling-api.herokuapp.com/api/ducks/${id}`)
									.then(res => res.json())
									.then(duck => console.log(duck)))
	})

// DEMO parallel, with order

fetch('http://duckling-api.herokuapp.com/api/search?q=green') // Fetch API
	.then(res => res.json())
	.then(ducks => Promise.all(ducks.map(({id}) => fetch(`http://duckling-api.herokuapp.com/api/ducks/${id}`)
									.then(res => res.json()))))
	.then(ducks => ducks.forEach(duck => console.log(duck)))

