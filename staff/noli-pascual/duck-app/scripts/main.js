const views = document.getElementsByClassName('view')

const registerView = new View(views[0])
const loginView= new View(views[1])
const searchView = new View(views[2])
const detailView = new View(views[3])

const header = document.getElementsByClassName('header')[0]


//para mostrar errores

const feedback = new Feedback(document.getElementsByClassName('feedback')[0])

const register = new Register(document.getElementsByClassName('register')[0])


register.onSubmit = (name, surname, email, password) => {

    try {
        registerUser(name, surname, email, password, function(error) {
            
            if (error) { //error asincrono
                feedback.render(error.message) 
            } else {
                registerView.hide()
                loginView.show()
            }
            
        })

    } catch (error) { //error sincrono
        feedback.render(error.message)
        feedback.show()
    }
}


//go back in register, aplicamos su método onBack

register.onBack = () => {
    registerView.hide()
    loginView.show() //todo landing
}


const login = new Login(document.getElementsByClassName('login')[0])

const goRegister = document.getElementsByClassName('login__goRegister')[0]


goRegister.addEventListener('click', function() {
    loginView.hide()
    registerView.show()
})

login.onSubmit = (email, password) => {
    
    try {
      
        authenticateUser(email, password, (error, result) => {
            //devuelve id y token. callback({ id, token })
        
            if (error) {
                feedback.show()
                feedback.render(error.message)
                const closeX = feedback.container.getElementsByClassName('feedback__close')[0]

                closeX.addEventListener('click', () => {
                    feedback.hide()
                })


            } else {

                loginView.hide()
                searchView.show()

                //iife
                searchDucks('', (error, ducks) => {
                        if (error) {
                            feedback.render(error.message)
                
                            results.hide()
                            feedback.show()

                        } else {
                            ducks = ducks.shuffle().splice(0, 3)
                
                            results.render(ducks)
                        }
                })
                    retrieveUser(result.id, result.token, function(result) { 
                    const userArea = document.getElementsByClassName('header__userArea')[0]
                    const wellcomeMessage = 'Welcome'
                    userArea.innerHTML = wellcomeMessage + result.data.name + '!'
                    loginView.hide()
                    searchView.show()
                    }) 
            }
                
        })
    } catch (error) {
        
        feedback.render(error.message)
        feedback.show()
    }
}

    
const search = new Search(document.getElementsByClassName('search')[0])
search.onSubmit = (query) => {
    searchDucks(query, function (error, ducks) {
        if (error) {
            feedback.render(error.message)

            results.hide()
            feedback.show()
            const closeX = feedback.container.getElementsByClassName('feedback__close')[0]

                closeX.addEventListener('click', () => {
                    feedback.hide()
            })

        } else {
            
            feedback.hide()
            results.render(ducks)

            results.show()
        }
    })
}

const results = new Results(document.getElementsByClassName('results')[0])
results.onItemRender = () => {
    const item = new ResultItem(document.createElement('li'))

    item.onClick = (id) => {
        retrieveDuck(id, function (error, duck) {
            if (error) {
                feedback.render(error.message)

                results.hide()
                feedback.show()
            } else {
                detail.render(duck)

                searchView.hide()
                detailView.show()
            }
        })
    }

    return item
}

const detail = new Detail(document.getElementsByClassName('detail')[0])

detail.onBack = () => {
    detailView.hide()
    searchView.show()
}

