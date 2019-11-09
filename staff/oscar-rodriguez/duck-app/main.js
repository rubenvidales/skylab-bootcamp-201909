var _form = document.getElementsByClassName("form-0");
_form[0].addEventListener('submit', search);

var allButton = document.getElementById("all");

allButton.addEventListener('click', function () {

    listAll();

});

listAll();

function listAll() {
    listSearchResults('');
}

function listSearchResults (query) {
    searchDucks(query,createList);
}

function searchDucks (query, callback) {
    call ('GET','https://duckling-api.herokuapp.com/api/search?q='+query,callback);
}

function call (method, url, callback) {
    var ducksRequest = new XMLHttpRequest;
    ducksRequest.open(method, url);
    
    ducksRequest.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 201) {
            var ducks = JSON.parse(ducksRequest.responseText);
            callback(ducks);
        }
    };
    
    ducksRequest.send();
}

function createList (ducks) {
    var ducksList = document.getElementById("search-list");
    ducksList.innerHTML="";
    
    var ul = createElement('ul','class','search-list');
    ducksList.append(ul);

    ducks.forEach(function(duck) {

            var li = createElement('li','class',"search-list__entry entry");
            var img = createElement('img','class','entry__img','src',duck.imageUrl);
            var title = createElement('div','class','entry__tittle',"innerHtml",duck.title);
            var price = createElement('div',"innerHtml",duck.price,"class","entry__price");

            li.append(img);
            li.append(title);
            li.append(price);
            
            var link = createElement("a",'class',"link",'href', '#'+duck.id);

            link.addEventListener('click',function (event){
                    openDuck(duck.id)});

            link.append(li);
            ul.append(link);
    
    });
}

function retrieveDuck (query, callback) {
    call('GET','http://duckling-api.herokuapp.com/api/ducks/'+query,callback);
}

function openDuck (id) {

    retrieveDuck (id, paintDuck);
}

function paintDuck (duckInfo) {

    var list_Panel = document.getElementById("search-list");
    var duck_Panel = document.getElementById("duck-detail");

    list_Panel.style.display = "none";
    duck_Panel.innerHTML = "";
    duck_Panel.style.display = "flex";

    var title = createElement("h1",'class','duck-detail__title','innerHtml',duckInfo.title);
    var description = createElement("p","class","duck-detail__description","innerHtml",duckInfo.description);
    var image = createElement("img",'class',"duck-detail__image",'src',duckInfo.imageUrl);
    var price = createElement("div",'class','duck-detail__price','innerHtml',duckInfo.price);
    var link = createElement("a", 'class','link',"innerHtml","Go to Duck's shopping page","href",duckInfo.link);

    var back = createElement("button","innerHtml","Atrás",'class','duck-detail__back');
    back.addEventListener('click', function (){
        list_Panel.style.display = "flex";
        duck_Panel.style.display = "none";
    })

    duck_Panel.append(title);
    duck_Panel.append(back);
    duck_Panel.append(description);
    duck_Panel.append(image);
    duck_Panel.append(price);
    duck_Panel.append(link);
}

function search(e) {
    e.preventDefault()
    
    var search = this.search.value;
    var duck_Panel = document.getElementById("duck-detail");
    var list_Panel = document.getElementById("search-list");

    if (duck_Panel.style.display !== "none") {
        duck_Panel.style.display = "none";
        list_Panel.style.display = "flex";
    }

    listSearchResults(search);
}

function createElement (elem) {
    var element = document.createElement(elem);

    for ( let i=1; i<arguments.length; i+=2) {

        if (arguments[i].toLowerCase() === "innerhtml") {
            element.innerHTML=arguments[i+1];
        } else {
            element.setAttribute(arguments[i],arguments[i+1]);
        }
    }
	return element;
}