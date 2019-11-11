/**
 * TODO
 */
Hooray.prototype.slice = function (begin, end) {
    begin = begin || 0;
    begin = begin < 0 ? this.length + begin : begin;
    end = end || this.length;
    end = end < 0 ? this.length + end : end;

    var result = new Hooray();

    for (var i = begin; i < end; i++)
        result[result.length++] = this[i]; // SAME-AS: result[result.length] = this[i]; result.lenth++;

    return result;
}