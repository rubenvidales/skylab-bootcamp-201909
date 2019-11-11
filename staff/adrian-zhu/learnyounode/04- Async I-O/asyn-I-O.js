const fs = require('fs');
fs.readFile(process.argv[2], 'utf8', (error,data) => {
    if(error) return error;
    console.log(data.toString().split('\n').length-1);
});