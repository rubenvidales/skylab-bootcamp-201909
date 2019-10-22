const form = document.getElementById("duck-search");
const ul = document.getElementsByClassName("results")[0];
const goHome = document.getElementsByClassName("go-home")[0];
const views = document.getElementsByClassName('view');
const newAccount = document.getElementsByClassName('btn__new-account')[0];
const btnLogin = document.getElementsByClassName('btn__login')[0];
const feedback = new Feedback(document.getElementsByClassName('feedback')[0]);


function getRandomDuck(){
    const xhr = new XMLHttpRequest;
    xhr.open('GET', 'https://duckling-api.herokuapp.com/api/search?q=');
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 201) {
            const ducks = JSON.parse(xhr.responseText);
            const randomDuck = Math.floor(Math.random()*286 )
            const logo = document.getElementsByClassName('logo')[0];
            logo.src = ducks[randomDuck].imageUrl;
        }
    };
    xhr.send(); 
}
function newElement(item, itemClass, text){
    const newItem = document.createElement(item)
    if(itemClass) newItem.classList.add(itemClass)
    if(text) newItem.innerText = text
    return newItem;
}
const search = new Search(form);
const login = new Login(document.getElementsByClassName('login__form')[0]);
login.onSubmit = (email, password) => {
    try {
        authenticateUser(email, password, (error,result)=> {
            if (error) {
                feedback.render(error.message);
                document.getElementsByClassName('feedback')[0].classList.remove('hidden')
            } else {
                retrieveUser(result.id, result.token, (result)=>{
                    document.getElementsByClassName('login')[0].classList.add('hidden')
                    document.getElementsByClassName('main')[0].classList.remove('hidden')
                    document.getElementsByClassName('search__form')[0].classList.remove('hidden')
                    document.getElementsByClassName('user')[0].innerText = result.data.name+" |"
                })
            }

        });
    } catch (error) {
        feedback.render(error.message);
        document.getElementsByClassName('feedback')[0].classList.remove('hidden')
        document.getElementsByClassName('main')[0].classList.add('hidden')
    }
};
const register = new Register(document.getElementsByClassName('register__form')[0]);

register.onSubmit = (name, surname, email, password) => {
    try {
        registerUser(name, surname, email, password, function(){
            document.getElementsByClassName('register')[0].classList.add('hidden')
            document.getElementsByClassName('main')[0].classList.remove('hidden')
        });
    } catch (error) {
        feedback.render(error.message);
        document.getElementsByClassName('feedback')[0].classList.remove('hidden')
        document.getElementsByClassName('main')[0].classList.add('hidden')
    }
}
const results = new Results(ul);
results.onItemRender = () =>{
    const item = new ResultItem(newElement('li','results__item'));
    item.onClick = function (id) {
        retrieveDuck(id, function (duck) {
            const detail = new Detail(document.getElementsByClassName('details')[0]);
            detail.render(duck);
            switchViews();
        });
    };
    return item;
}

search.onSubmit = query => {
    searchDucks(query, (error, ducks) => {
        if (error) {
            feedback.render(error.message);
            document.getElementsByClassName('feedback')[0].classList.remove('hidden')
            document.getElementsByClassName('main')[0].classList.add('hidden')
            
        } else {
            document.getElementsByClassName('details')[0].classList.add('hidden')
            document.getElementsByClassName('main')[0].classList.remove('hidden')
            ducks = ducks.splice(0, 9);
            results.render(ducks);
        }
    });
}

// Selfie to print 9 ducks at the beginning
(function () {
    searchDucks('', (error, ducks) => {
        if (error) {
            feedback.render(error.message);
            document.getElementsByClassName('feedback')[0].classList.remove('hidden')
            document.getElementsByClassName('main')[0].classList.add('hidden')
        } else {
            ducks = ducks.splice(0, 9);
            results.render(ducks);
        }
    });
})();

ul.addEventListener("click", (e)=> {
    const t = e.target;
    const parent = t.parentElement;
    const d = parent.dataset;
    const detail = new Detail(document.getElementsByClassName('details')[0]);
    retrieveDuck(d.duckId, detail.render);
    switchViews();
})
function switchViews(){
    document.getElementsByClassName('main')[0].classList.toggle('hidden')
    document.getElementsByClassName('details')[0].classList.toggle('hidden')
}
goHome.addEventListener("click", switchViews);
newAccount.addEventListener("click", ()=>{
    document.getElementsByClassName("login")[0].classList.add("hidden")
    document.getElementsByClassName("register")[0].classList.remove("hidden")
})
btnLogin.addEventListener("click", () =>{
    document.getElementsByClassName("login")[0].classList.remove("hidden")
    document.getElementsByClassName("register")[0].classList.add("hidden")
})
getRandomDuck()
const popupOff = document.getElementsByClassName("feedback__cross")[0]
popupOff.addEventListener("click", ()=>{
    document.getElementsByClassName("feedback")[0].classList.add("hidden")
})