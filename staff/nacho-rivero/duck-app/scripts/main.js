var xhr = new XMLHttpRequest;

xhr.open('GET', 'https://duckling-api.herokuapp.com/api/search');

xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 201) {
        var ducks = JSON.parse(xhr.responseText);

        ducks = ducks.shuffle().splice(0, 3);

        var results = document.getElementsByClassName('results')[0];
        results.innerHTML = '';

        ducks.forEach(function (duck) {
            var result = document.createElement('li');
            result.classList.add('results__item');

            var item = document.createElement('a');
            item.classList.add('item');
            item.addEventListener('click', function (event) {
                var id = duck.id;

                var xhr = new XMLHttpRequest;

                xhr.open('GET', 'https://duckling-api.herokuapp.com/api/ducks/' + id);

                xhr.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 201) {
                        var duck = JSON.parse(xhr.responseText);

                        var detail = document.getElementsByClassName('detail')[0];

                        var title = detail.getElementsByClassName('detail__title')[0];
                        title.innerText = duck.title;

                        var image = detail.getElementsByClassName('detail__image')[0];
                        image.src = duck.imageUrl;

                        var description = detail.getElementsByClassName('detail__description')[0];
                        description.innerText = duck.description;

                        var store = detail.getElementsByClassName('detail__store')[0];
                        store.href = duck.link;

                        var price = detail.getElementsByClassName('detail__price')[0];
                        price.innerText = duck.price;

                        var back = detail.getElementsByClassName('detail__back')[0];
                        back.addEventListener('click', function (event) {
                            var views = document.getElementsByClassName('view');

                            views[0].classList.remove('hide');
                            views[1].classList.add('hide');
                        });

                        var views = document.getElementsByClassName('view');

                        views[0].classList.add('hide');
                        views[1].classList.remove('hide');
                    }
                };

                xhr.send();
            });

            result.append(item);

            var title = document.createElement('h2');
            title.classList.add('item__title');
            title.innerText = duck.title;

            var image = document.createElement('img');
            image.classList.add('item__image');
            image.src = duck.imageUrl;

            var price = document.createElement('span');
            price.classList.add('item__price');
            price.innerText = duck.price;

            item.append(title, image, price);

            results.append(result);
        });
    }
};

xhr.send();

var search = document.getElementsByClassName('search')[0];

search.addEventListener('submit', function (event) {
    event.preventDefault();

    var query = this.query.value;

    var xhr = new XMLHttpRequest;

    xhr.open('GET', 'https://duckling-api.herokuapp.com/api/search?q=' + query);

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {
            var ducks = JSON.parse(xhr.responseText);

            var results = document.getElementsByClassName('results')[0];
            results.innerHTML = '';

            ducks.forEach(function (duck) {
                var result = document.createElement('li');
                result.classList.add('results__item');

                var item = document.createElement('a');
                item.classList.add('item');
                item.addEventListener('click', function (event) {
                    var id = duck.id;

                    var xhr = new XMLHttpRequest;

                    xhr.open('GET', 'https://duckling-api.herokuapp.com/api/ducks/' + id);

                    xhr.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status == 201) {
                            var duck = JSON.parse(xhr.responseText);

                            var detail = document.getElementsByClassName('detail')[0];

                            var title = detail.getElementsByClassName('detail__title')[0];
                            title.innerText = duck.title;

                            var image = detail.getElementsByClassName('detail__image')[0];
                            image.src = duck.imageUrl;

                            var description = detail.getElementsByClassName('detail__description')[0];
                            description.innerText = duck.description;

                            var store = detail.getElementsByClassName('detail__store')[0];
                            store.href = duck.link;

                            var price = detail.getElementsByClassName('detail__price')[0];
                            price.innerText = duck.price;

                            var back = detail.getElementsByClassName('detail__back')[0];
                            back.addEventListener('click', function (event) {
                                var views = document.getElementsByClassName('view');

                                views[0].classList.remove('hide');
                                views[1].classList.add('hide');
                            });

                            var views = document.getElementsByClassName('view');

                            views[0].classList.add('hide');
                            views[1].classList.remove('hide');
                        }
                    };

                    xhr.send();
                });
                result.append(item);
 
                var title = document.createElement('h2');
                title.classList.add('item__title');
                title.innerText = duck.title;

                var image = document.createElement('img');
                image.classList.add('item__image');
                image.src = duck.imageUrl;

                var price = document.createElement('span');
                price.classList.add('item__price');
                price.innerText = duck.price;

                item.append(title, image, price);

                results.append(result);
            });
        }
    };

    xhr.send();
});