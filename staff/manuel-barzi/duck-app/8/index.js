const landing = new Landing(document.getElementsByClassName('landing')[0])
landing.onRegister = () => {
    landing.hide()
    register.show()
}
landing.onLogin = () => {
    landing.hide()
    login.show()
}

const register = new Register(document.getElementsByClassName('register')[0])
register.onSubmit = (name, surname, email, password) => {
    try {
        registerUser(name, surname, email, password, error => {
            if (error) {
                register.feedback.render(error.message) 
            } else {
                register.hide()
                landing.show()
            }
        })
    } catch (error) {
        register.feedback.render(error.message)
    }
}
register.onBack = () => {
    register.hide()
    landing.show()
}

const login = new Login(document.getElementsByClassName('login')[0])
login.onSubmit = (email, password) => {
    try {
        authenticateUser(email, password, (error, response) => {
            if (error) {
                login.feedback.render(error.message)
            } else {
                login.hide()
                search.show() // TODO store id and token somewhere to retrieve user later on...

                searchDucks('', (error, ducks) => {
                    if (error) {
                        feedback.render(error.message)
                        feedback.show()

                        results.hide()
                    } else {
                        ducks = ducks.shuffle().splice(0, 3)

                        results.render(ducks)
                    }
                })
            }
        })
    } catch (error) {
        login.feedback.render(error.message)
    }
}
login.onBack = () => {
    login.hide()
    landing.show()
}

const search = new Search(document.getElementsByClassName('search')[0])
search.onSubmit = query => {
    searchDucks(query, (error, ducks) => {
        if (error) {
            search.feedback.render(error.message)

            results.hide()
        } else {
            search.feedback.hide()

            results.render(ducks)
            results.show()
        }
    })
}

const results = new Results(document.getElementsByClassName('results')[0])
results.onItemRender = () => {
    const item = new ResultItem(document.createElement('li'))

    item.onClick = id => {
        retrieveDuck(id, (error, duck) => {
            if (error) {
                feedback.render(error.message)
                feedback.show()

                results.hide()
            } else {
                search.hide()
                
                detail.render(duck)
            }
        })
    }

    return item
}

const detail = new Detail(document.getElementsByClassName('detail')[0])
detail.onBack = () => {
    detail.hide()
    search.show()
}

const feedback = new Feedback(document.getElementsByClassName('global-feedback')[0])