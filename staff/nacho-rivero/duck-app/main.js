var searchButton = document.getElementsByClassName('search')[0];
var duckMainSection = document.getElementsByClassName('results')[0];
var duckMainArticle = document.getElementsByClassName('view detail')[0];
var ul = document.getElementsByClassName('results')[0];

searchButton.addEventListener('submit', function(event) ){
    event.preventDefault();
    var query = this.query.value;
};

function searchButtonPush(e) {
    e.preventDefault()
    ul.innerText = " ";
    var query = e.target.inputname.value;
    var xhr = new XMLHttpRequest; //objecto que generamos para llamar al ajax
    xhr.open('GET', 'https://duckling-api.herokuapp.com/api/search?q=' + query); //hacemos una llamada (con un query= green)
    xhr.onreadystatechange = function () { //lo que llegue, la respuesta, le passamos una funcion que trabaja esa respuesta
        if (this.readyState == 4 && this.status == 201) {
            var ducks = JSON.parse(xhr.responseText); //parse nos pasa a array de objetos la respuesta, para poder tratarla con js
            printDucks(ducks)
        }
    };
    xhr.send(); //envia todo lo generado por xhr, y luego sigue con el codigo  (es asincrono)
}

function printDucks(ducks) {
    duckMainSection.append(ul); 
    ducks.forEach(function (duck) {
        
        var li = document.createElement('li');
        li.className = "results__item";

        var a = document.createElement('a');
        a.className = "item";
        a.href="#";

        var title = document.createElement('h2');
        title.className = "item__title";
        title = duck.title;

        var image = document.createElement('img');
        image.className = "item__image";
        image.src = duck.imageUrl;

        var price = document.createElement('span');
        price.className = "item__price";
        price = duck.price;

        ul.append(li);
        li.append(a, title, image, price);
        li.addEventListener('click', function () {
            searchDuck(duck.id)

        });
    });
}

function searchDuck(duckId) {
    var xhr = new XMLHttpRequest; //objecto que generamos para llamar al ajax
    xhr.open('GET', 'http://duckling-api.herokuapp.com/api/ducks/' + duckId); //hacemos una llamada (con un query= green) endpont: url donde podemos solicitar 
    xhr.onreadystatechange = function () { //lo que llegue, la respuesta, le passamos una funcion que trabaja esa respuesta
        if (this.readyState == 4 && this.status == 201) {
            var duck = JSON.parse(xhr.responseText); //parse nos pasa a array de objetos la respuesta, para poder tratarla con js
            printDuck(duck);
        }
    };
    xhr.send();
}
function printDuck(duck) {
    duckMainArticle.innerText = " ";
    var image = document.createElement('img');
    var title = document.createElement('h2');
    var price = document.createElement('h4');
    var description = document.createElement('h4');
    image.src = duck.imageUrl;
    title = duck.title;
    price = duck.price;
    description = duck.description;
    
    duckMainArticle.append(title, image, price, description)
}
