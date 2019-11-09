// 1

if (typeof Array.prototype.shuffle === 'undefined')
    Array.prototype.shuffle = function() {
        var result = [];

        for (var i = 0; i < this.length; i++) result[i] = this[i];

        for (var i = 0; i < result.length; i++) {
            var random = Math.floor(Math.random() * result.length); // 0 <> length-1

            var value = result[i];

            result[i] = result[random];

            result[random] = value;
        }

        //result[0] = ':P';

        return result;
    };

var a = [1, 2, 3, 4, 5, 6, 7, 8, 9];

console.log(a.shuffle());

["adri-campo",
"adrian-zhu",
"aitor-parra",
"cristian-astudillo",
"diana-moreno",
"elena-rodriguez",
"fatima-mata",
"isidro-alonso",
"javier-sevilla",
"joan-luis",
"jose-rodriguez",
"luka-bontempi",
"marta-penya",
"martin-garcia",
"nacho-rivero",
"noli-pascual",
"oscar-rodriguez",
"ruben-vidales",
"xavier-navarro"].shuffle();

// 2

if (typeof Array.prototype.random === 'undefined')
    Array.prototype.random = function() {
        return this[Math.floor(Math.random() * this.length)];
    };

var a = [1, 2, 3, 4, 5, 6, 7, 8, 9];

console.log(a.random());
