if (typeof Array.prototype.shuffle === 'undefined')
    Array.prototype.shuffle = function () {
        var result = [];

        for (var i = 0; i < this.length; i++) result[i] = this[i];

        for (var i = 0; i < result.length; i++) {
            var random = Math.floor(Math.random() * result.length);

            var value = result[i];

            result[i] = result[random];

            result[random] = value;
        }

        return result;
    };