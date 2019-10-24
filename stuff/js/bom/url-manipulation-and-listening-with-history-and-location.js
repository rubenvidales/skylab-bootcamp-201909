// DEMO change hash path with automatic event dispatch alerting

function hash(path) {
    location.hash = path
}

window.addEventListener('popstate', function () { console.log('url changed to', location.href) })

hash('hello world')
// url changed to ...#hello%20world

//hash('hola mundo') // NOTE as it happens immediately after the previous call (lines above) the output is just one (this new href). so to force both hash changes to correctly dispatch popstate events, a time-out is used in next lines. this is only happening on hash changes (not with slash changes, as it could be observed in next demo with slash, lines below).
setTimeout(() => hash('hola mundo'), 1000)
// url changed to ...#hola%20mundo

// DEMO change full slash path with forced event dispatch alerting (otherwise it does not automatically happens)

function slash(path) {
    history.pushState({}, '', path)
    window.dispatchEvent(new Event('popstate'))
}

window.addEventListener('popstate', function () { console.log('url changed to', location.href) })

slash('hello world')
// url changed to .../hello%20world

slash('hola mundo')
// url changed to .../hola%20mundo

// DEMO change relative slash path, with forced event dispatch alerting over custom onpushstate event listening

(function(){
    const pushState = history.pushState

    history.pushState = function(state) {
        const result = pushState.apply(history, arguments)

        if (typeof history.onpushstate == "function") {
            history.onpushstate(state)
        }
       
        return result
    }
})()

function slash(path) {
	const { protocol, host, pathname } = location
    const url = `${protocol}//${host}${pathname}${path}`
    history.pushState({ path: url }, '', url)
}

history.onpushstate = function() { console.log('url changed to', location.href) }

slash('/1/2/3')
// url changed to .../1/2/3

slash('/4/5/6')
// url changed to .../1/2/3/4/5/6

// DEMO change query string with forced event dispatch alerting (otherwise it does not automatically happens)

function query(path) {
    const { protocol, host, pathname } = location
    const url = `${protocol}//${host}${pathname}?${path}`
    history.pushState({ path: url }, '', url)
    window.dispatchEvent(new Event('popstate'))
}

window.addEventListener('popstate', function () { console.log('url changed to', location.href) })

query('q=hello world')
// url changed to ...?q=hello%20world

query('query=hola mundo')
// url changed to ...?query=hola%20mundo
