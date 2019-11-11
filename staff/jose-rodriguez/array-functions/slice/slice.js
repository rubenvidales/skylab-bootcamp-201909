

function slice(array, start,end) {
    var newArray = [];

    
    start = start || 0;
    start = start < 0 ? array.length + start : start;
    end = end || array.length;
    end = end < 0 ? array.length + end : end;

    
    if (start > array.length) {
        return newArray;
    }


 
    for (var i = start; i < end; i++) {
        newArray[i-start] = array[i]; 
    }
    return newArray;
}