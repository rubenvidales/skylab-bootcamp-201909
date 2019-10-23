const swapToLogin = document.getElementsByClassName('register__form__login')[0];
const swapToRegister = document.getElementsByClassName('login__form__register')[0];





const login = new Login(document.getElementsByClassName('login')[0]);
login.onSubmit(function(mail, password) {
    logIn(mail, password, (error, user) => {

        if (error) {
            feedback.render(error.message);
            const button = document.getElementsByClassName('login__form__button')[0];
            button.innerHTML = 'Error, try again';
            button.style.backgroundColor = '#fc7978';

        } else {
            login.hide();
            feedback.render("Succesful login");
            logBar.render(mail);
            login.clearFields();

            setTimeout(() => {
                search.show();
                feedback.hide();

            }, 1000);
            retrieveUser(user.id, user.token, result => {
                logBar.render(result.data.username);
            });

            searchDucks('', function(error, ducks) {
                if (error) {
                    feedback.render(error.message);
                    search.hide();
                    setTimeout(() => {
                        search.show();
                        feedback.hide();
                    }, 2000);
                } else {
                    results.render(ducks.slice(0, 7));
                    search.show()
                }
            });
        }
    });
});







const register = new Register(document.getElementsByClassName('register')[0]);
register.onSubmit(function(name, lastName, mail, password, age) {
    registUser(name, lastName, mail, password, age, (error, user) => {

        if (error) {
            feedback.render(error.message);
            register.show()
            const button = document.getElementsByClassName('login__form__button')[0];
            button.innerHTML = 'Error, try again';
            button.style.backgroundColor = '#fc7978';

        } else {
            register.hide();
            register.clearFields();
            feedback.render("Succesful registering");
            logBar.render(mail);

            setTimeout(() => {
                search.show();
                feedback.hide();
            }, 1000);

            searchDucks('', function(error, ducks) {
                if (error) {
                    feedback.render(error.message);
                    search.hide();
                    setTimeout(() => {
                        search.show();
                        feedback.hide();
                    }, 2000);

                } else {
                    results.render(ducks.slice(0, 7));
                    search.show()
                }
            });

        }
    });
});


const search = new Search(document.getElementsByClassName('search')[0]);
search.onSubmit(function(query) {
    searchDucks(query, function(error, ducks) {
        if (error) {
            feedback.render(error.message);
            search.hide();
            setTimeout(() => {
                search.show();
                feedback.hide();
            }, 2000);
        } else {
            debugger
            results.render(ducks);
            search.show()
            feedback.hide();
        }
    });
});


const results = new Results(document.getElementsByClassName('search__main')[0]);
results.onItemRender = function() {
    const item = new ResultItem(document.createElement('article'));

    item.onClick = function(id) {
        retrieveDuck(id, function(error, duck) {
            if (error) {
                feedback.render(error.message);
                search.hide();
                setTimeout(() => {
                    search.show();
                    feedback.hide();
                }, 2000);

            } else {
                detail.render(duck);
                feedback.hide();
                search.hide();
            }
        });
    }
    return item;
}

const logBar = new LogBar(document.getElementsByClassName('log-bar')[0]);
logBar.onBack = () => {
    logBar.hide();
    login.show();
    search.hide();
    detail.hide();
}

const detail = new Detail(document.getElementsByClassName('result')[0]);
detail.onBack = function() {
    search.show();
    detail.hide();
};

let feedback = new Feedback(document.getElementsByClassName('feedback')[0]);

swapToLogin.addEventListener('click', () => {
    register.hide();
    login.show();
});

swapToRegister.addEventListener('click', () => {
    register.show();
    login.hide();
});