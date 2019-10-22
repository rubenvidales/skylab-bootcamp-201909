window.addEventListener('popstate', function () { console.log('url changed to', window.location.href) })

function slash(path) {
    history.pushState({}, '', path)
    window.dispatchEvent(new Event('popstate'))
}

slash('hello world')
// url changed to http://127.0.0.1:5500/staff/manuel-barzi/test/hello%20world

function hash(path) {
    window.location.hash = path
}

hash('hello world')
// url changed to http://127.0.0.1:5500/staff/manuel-barzi/duck-app-react/1/hello#hello%20world