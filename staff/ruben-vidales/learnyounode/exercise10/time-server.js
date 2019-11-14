const net = require('net')
const strftime = require('strftime')

const [, , port] = process.argv

const server = net.createServer((socket) => {
    //With Date object (issues with zeros in days, months, hours and minutes)
    // const date = new Date()
    // socket.write(date.getFullYear()+'-'+(date.getMonth() + 1)+
    // '-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+'\r\n');

    const timeStr = strftime('%Y-%m-%d %H:%M\n')
    socket.end(timeStr)
})
server.listen(port)

//Learnyounode proposal
/* 
'use strict'
const net = require('net')

function zeroFill(i) {
    return (i < 10 ? '0' : '') + i
}

function now() {
    const d = new Date()
    return d.getFullYear() + '-' +
        zeroFill(d.getMonth() + 1) + '-' +
        zeroFill(d.getDate()) + ' ' +
        zeroFill(d.getHours()) + ':' +
        zeroFill(d.getMinutes())
}

const server = net.createServer(function (socket) {
    socket.end(now() + '\n')
})

server.listen(Number(process.argv[2]))
 */