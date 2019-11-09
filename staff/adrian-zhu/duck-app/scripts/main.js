const views = document.getElementsByClassName('view');
const searchView = new View(views[0]);
const detailView = new View(views[1]);
const feedback = new Feedback(document.getElementsByClassName('feedback')[0]);

// 

const newAccount = document.getElementsByClassName('btn__new-account')[0]; 
const btnLogin = document.getElementsByClassName('btn__login')[0]; 

//

const results = new Results(document.getElementsByClassName('results')[0]);

results.onItemRender = () => { 
    const item = new ResultItem(document.createElement('li'));
    
    item.onClick = (id) => {
        retrieveDuck(id,(duck, error) => { 
            if (error) {
                feedback.render(error.message);

                results.hide();
                feedback.show();
            } else {
                
                detail.render(duck);

                searchView.hide();
                detailView.show();
            }
        });
    };

    return item;
}

//

(() => {
    searchDucks('', function(error, ducks){
        if (error) {
            feedback.render(error.message)

            results.hide();
            feedback.show();
        } else {

            ducks = ducks.shuffle().splice(0, 4);
            results.render(ducks)

        }
    })
})();

const search = new Search(document.getElementsByClassName('uploaded')[0]); 
search.onSubmit = query => {
    searchDucks(query,(error, ducks) => {
        if (error) {
            feedback.render(error.message);

            results.hide();
            feedback.show();
        } else {
            debugger
            results.render(ducks);

            feedback.hide();
            results.show();
        }
    }) 
}

const login = new Login(document.getElementsByClassName('login__form')[0]);
login.onSubmit = (username, password) => { 
    try {
        authenticateUser(username, password, (error,result)=> {
            if (error) {
                feedback.render(error.message);
                document.getElementsByClassName('feedback')[0].classList.remove('hide')
            } else {
                retrieveUser(result.id, result.token, (result)=>{
                    document.getElementsByClassName('login')[0].classList.add('hide')
                    document.getElementsByClassName('view')[0].classList.remove('hide')
              
              
                })
                }
            });

    } catch (error) {
        feedback.render(error.message);
        document.getElementsByClassName('feedback')[0].classList.remove('hide')
        document.getElementsByClassName('view')[0].classList.add('hide')
    }
};

const register = new Register(document.getElementsByClassName('register__form')[0]);
register.onSubmit = (name, surname, email, password) => { 
    try {
        registerUser(name, surname, email, password, () => {
            document.getElementsByClassName('register')[0].classList.add('hide')
            document.getElementsByClassName('view')[0].classList.remove('hide')
        });
    } catch (error) {
        feedback.render(error.message);
        document.getElementsByClassName('feedback')[0].classList.remove('hide')
        document.getElementsByClassName('view')[0].classList.add('hide')
    }
};



const detail = new Detail(document.getElementsByClassName('detail')[0]);

detail.onBack =  () => {
    
    detailView.hide();
    searchView.show();
};

newAccount.addEventListener("click", () => {
    document.getElementsByClassName("login")[0].classList.add("hide")
    document.getElementsByClassName("register")[0].classList.remove("hide")
})

btnLogin.addEventListener("click", () => {
    document.getElementsByClassName("login")[0].classList.remove("hide")
    document.getElementsByClassName("register")[0].classList.add("hide")
})
