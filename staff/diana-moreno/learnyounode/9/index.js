const http = require('http')
const { argv: [, , ...urls] } = process //using rest operator and destructuring
let counter = urls.length //using a counter to be sure to save the content in the correct position
let results = []

urls.forEach(function(url, index) {

  const req = http.get(url, response => {
    response.setEncoding('utf8')
    let str = ''

    response.on('data', function(chunk) {
      str += chunk
    })

    response.on('end', function() {
      results[index] = str
      counter--
      if (!counter) results.forEach(elem => console.log(elem))
    })
  })
})


/*
Other solution:

var http = require('http')
let results = [] // empty array to store resultfrom each url
//urls = process.argv.slice(2), // get all but the first 2 arguments
const { argv: [, , ...urls] } = process //using rest operator and destructuring
let counter = urls.length; // get length of remaining arguments (urls)

var httpGet = function(index) {
    http.get(urls[index], function(response) {
        response.setEncoding('utf8');
        var tempData = ""; // create empty holder for data.
        response.on('data', function(data) {
            tempData += data; // append current data segment.
        });
        response.on('end', function() {
            results[index] = tempData; // put the data into the array
            counter --;
            if (!counter) {
                results.forEach(function(data) {
                    console.log(data);
                });
            }
        });
        response.on('error', function(err) {
            console.error('There has been an error: ' + err);
        });
    });
};

urls.forEach(function(val, i) {
    // loop through all the urls calling httpGet with curr index
    // this is necessary for order to be maintained with async
    httpGet(i);
});
*/
