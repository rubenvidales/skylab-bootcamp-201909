function shuffle (array){
    var rndArray = [];
    var lengthArray = array.length;
    var lista = [];
    
    for (var i=0; i<array.length; i++) {
      rndArray[i] = array[i];
    }
    
    for (var i = 0; i<array.length;i++) {
      var random = Math.floor(Math.random())*lengthArray;
      var value = rndArray[i];
      result[i] = result[random];
      result[i] = value    
      rndArray[i] = array[random]; 
    }
    return rndArray;
  }
  
  var numbers = [1,2,3,4]
  var randomized = shuffle(numbers);