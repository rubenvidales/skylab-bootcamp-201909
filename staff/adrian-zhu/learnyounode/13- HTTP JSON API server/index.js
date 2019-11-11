const http = require('http');
const url = require('url');
 
const server = http.createServer((req, res) => {
    let urlObj = url.parse(req.url);
    let pathname = urlObj.pathname;
    if (pathname === '/api/parsetime') {
        let param = urlObj.query;
        if(param.indexOf('&') === -1){
            let params = param.split('=');
            if(params[0] === 'iso'){
                let isotime = params[1];
                let time = new Date(isotime);
                console.log(time);
                let resObj = {
                    hour : time.getHours(),
                    minute : time.getMinutes(),
                    second : time.getSeconds()
                };
                res.end(JSON.stringify(resObj));
            }
        }
    }else if (pathname === '/api/unixtime') {
        let param = urlObj.query;
        if(param.indexOf('&') === -1){
            let params = param.split('=');
            if(params[0] === 'iso'){
                let isotime = params[1];
                let time = new Date(isotime);
                let timeTamp = time.getTime();
                let resObj = {
                    unixtime : timeTamp
                };
                res.end(JSON.stringify(resObj));
            }
        }
    }
})
 
server.on('error', (err) => {
    console.log(err);
})
server.listen(Number(process.argv[2]), () => {
    console.log('listen success');
})
