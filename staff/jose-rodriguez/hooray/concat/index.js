Hooray.prototype.concat = function () {
    var newHooray = new Hooray();

    for (var i = 0; i < this.length; i++) {
        newHooray[newHooray.length++] = this[i];
    }

    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] instanceof Hooray) {
            debugger
            for (var j = 0; j < arguments[i].length; j++) {
                newHooray[newHooray.length++] = arguments[i][j];
            }
        } else {
            debugger
            newHooray[newHooray.length++] = arguments[i];
        }
    } return newHooray;
}