export default function (name, surname, email, username, password) {
	// TODO validate all fields

	return fetch('http://192.168.0.41:8000/users', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ name, surname, email, username, password })
	})
		.then(res => res.status === 201 ? undefined : res.json().then(({ message }) => { throw Error(message) }))

}