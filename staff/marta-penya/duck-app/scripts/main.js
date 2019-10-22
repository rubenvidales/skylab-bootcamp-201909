//panel para el registro de usuario

const register = new Register(document.getElementsByClassName('register')[0]);

register.onSubmit = (name, surname, email, password) => {
    try{ 
        registerUser(name, surname, email, password, error => {
            if(error){
                register.feedback.render(error.message)
            }else{
                register.hide()
                login.show()
            }
        })

    } catch(error){
        register.feedback.render(error.message)
    }
}

register.onGoLogin = () => {
    register.hide()
    login.show()
}

//panel de login

const login = new Login(document.getElementsByClassName('login')[0])

login.onSubmit = (email, password) => {
    try{
        authenticateUser(email, password, (error, response) => {
            if(error){
                login.feedback.render(error.message)
            } else {
                
                retrieveUser(response.id, response.token, (error, result) =>{
                    
                    const hello = new Hello(document.getElementsByClassName('hello')[0])
                    hello.show()
                    hello.render(result)
                    hello.onBack = () => {
                        login.show()
                        search.hide()
                        results.hide()
                        hello.hide()
                    }
                    // document.getElementsByClassName('hello__user')[0].innerHTML = `hello ${result.data.name}`

                })
                
                login.hide()
                search.show() //store id and token somewhere to retrieve user later
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
                results.show()
                // ducks.show()
            }
        })
    } catch (error){
        login.feedback.render(error.message)
    }
}

login.onGoRegistrer = ()=> {
    login.hide()
    register.show()
}

//panel de búsqueda, si se introduce algun input que no concuerda con ningun pato
//saltará error, sino la lista con todos los patos que cumplan

const search = new Search(document.getElementsByClassName('search')[0])
search.onSubmit = query => {
    searchDucks(query, (error, ducks) => {
        if(error){
            search.feedback.render(error.message)

            results.hide()
        } else {
            search.feedback.hide()

            results.render(ducks)
            results.show()
        }
    })
}

//panel para mostrar los resultados de búsqueda, añadiendo el onclick para que cada pato pueda ser pulsado
const ducks = document.getElementsByClassName('ducks')[0]

const results = new Results(document.getElementsByClassName('item-list')[0]);
results.onItemRender = () => {
    const item = new ResultItem(document.createElement('li'))

    item.onClick = id => {
        retrieveDuck(id, (error, duck) => {
            if(error) {
                feedback.render(error.message)
                feedback.show()

                results.hide()
            } else {
                search.hide()
                results.hide()
                detail.render(duck)

                // detail.render(duck);
                // document.getElementsByClassName('ducks')[0].classList.add('hide')
                // document.getElementsByClassName('detail')[0].classList.remove('hide')
            }
        })
    }
    return item
}

results.onItemRender = function () {
    var item = new ResultItem(document.createElement('li'))
    
    item.onClick = function (id) {
        retrieveDuck(id, function (error, duck) {
            if (error) {
                feedback.render(error.message)

                results.hide()
                feedback.show()
            } else {
                detail.render(duck)
                detail.show()
                results.hide()

                // document.getElementsByClassName('ducks')[0].classList.add('hide')
                // document.getElementsByClassName('detail')[0].classList.remove('hide')
                // searchView.hide();
                // detailView.show();
            }
        });
    };

    return item;
};

//panel de detalles, cuando un pato es pulsado se abre un nuevo panel con los detalles
const detail = new Detail(document.getElementsByClassName('detail')[0]);

detail.onBack = () => {
    detail.hide()
    search.show()
    results.show()
}

//panel de feedback
const feedback = new Feedback(document.getElementsByClassName('feedback')[0]);


