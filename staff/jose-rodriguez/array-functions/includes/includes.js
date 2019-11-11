

 function includes (array, elem) {
     var start= arguments.length > 2 ? arguments[2] : 0;
     for (var i = start; i < array.length; i++) {
         if( elem === array[i]) return true;
     } return false;
 }