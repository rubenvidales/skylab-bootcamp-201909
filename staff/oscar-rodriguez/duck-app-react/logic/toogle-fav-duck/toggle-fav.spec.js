describe ('uptdate-user', function (){
    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`

        call('POST', 'https://skylabcoders.herokuapp.com/api/user', { name, surname, username: email, password }, undefined, result => {
        })

        call('POST', 'https://skylabcoders.herokuapp.com/api/auth', { username: email, password }, undefined, result => {
            if (result.error)
                done(new Error(result.error))
            else {
                credentials = result.data
                done(undefined, credentials)
            }
        })

    })
})