const url = 'https://duckling-api.herokuapp.com/api/search?q=green'

// with promises

false && fetch(url)
	.then(res => res.json())
	//.then(ducks => console.log(ducks))
	.then(ducks => Promise.all(ducks.map(({id}) => fetch('https://duckling-api.herokuapp.com/api/ducks/' + id).then(res => res.json()))))
	.then(ducks => console.log(ducks))
	.catch(error => console.error('KO', error.message));

// with async await

false && (async function() {
	try {
        const res = await fetch(url)

        let ducks = await res.json()

        //console.log(ducks)

		ducks = await Promise.all(ducks.map(async ({id}) => {
			const res = await fetch('https://duckling-api.herokuapp.com/api/ducks/' + id)

			const duck = await res.json()

			return duck
        }))

		console.log(ducks)
    } catch(error) {
    	console.error('KO', error.message)
	}
})()