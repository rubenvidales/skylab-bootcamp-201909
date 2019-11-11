const fs = require('fs')
const {argv:[,,path]}= process

function callback(err, data) {
  console.log(data.split('\n').length-1)
  return data.toString().split('\n').length-1
}

fs.readFile(path,'utf8', callback)


/*
Same solution but simplier:

function callback(err, data) {
  console.log(data.toString().split('\n').length-1)
  return data.toString().split('\n').length-1
}

fs.readFile(process.argv[2], callback)*/
