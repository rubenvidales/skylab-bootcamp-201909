const search = new Search(document.getElementsByClassName('ducks-panel')[0])

const ducksPanel = new Results(document.getElementsByClassName('ducks-panel__list')[0])

const detailPanel = new Detail(document.getElementsByClassName('detail-panel')[0])

const feedback = new Feedback(document.getElementsByClassName('global-feedback')[0])

search.onSubmit = query => {
    searchDucks(query, (error, ducks) => {
        if (error) {
            feedback.render(error.message)

            ducksPanel.hide()
        } else {
            search.feedback.hide()

            ducksPanel.render(ducks)
            ducksPanel.show()
        }
    })
}

ducksPanel.onItemRender = function () {
    const item = new ResultItem(document.createElement('li'));

    item.onClick = function (id) {
        retrieveDuck(id, function (error, duck) {
            if (error) {
                feedback.render(error.message);

                ducksPanel.hide();
                feedback.show();
            } else {
                detailPanel.render(duck);

                ducksPanel.hide();
                detailPanel.show();
            }
        });
    };

    return item;
};

detailPanel.onBack = function () {
    detailPanel.hide();
    ducksPanel.show();
};

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

                        ducksPanel.hide()
                    } else {
                        ducks = ducks.shuffle().splice(0, 6)

                        ducksPanel.render(ducks)
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