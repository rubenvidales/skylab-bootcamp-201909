const { Component } = React

const App = (() => {
    const { id, token } = sessionStorage

    const { pathname, query, hash } = location

    return class extends Component {
        state = { view: id && token ? (hash? 'detail' : 'search') : 'landing', error: undefined, query }

        componentDidMount() {
            const { id, token } = sessionStorage

            if (id && token) {
                try {
                    retrieveUser(id, token, (error, user) => {
                        if (error) return this.setState({ error: error.message })

                        const { name } = user

                        this.setState({ user: name })
                    })
                } catch (error) {
                    this.setState({ error: error.message })
                }

                const { hash } = location

                if (hash) {
                    const [, duckId] = hash.split('/duck/')

                    this.handleDetail(duckId)
                } else {
                    const { state: { query } } = this
    
                    query && this.handleSearch(query)
                }
            }
        }

        handleGoToRegister = () => {
            this.setState({ view: 'register' })
        }

        handleGoToLogin = () => {
            this.setState({ view: 'login' })
        }

        handleRegister = (name, surname, email, password) => {
            try {
                registerUser(name, surname, email, password, error => {
                    if (error) return this.setState({ error: error.message })

                    this.setState({ view: 'landing' })
                })
            } catch (error) {
                this.setState({ error: error.message })
            }
        }

        handleBackToLanding = () => {
            this.setState({ view: 'landing', error: undefined })
        }

        handleLogin = (email, password) => {
            try {
                authenticateUser(email, password, (error, data) => {
                    if (error) return this.setState({ error: error.message })

                    try {
                        const { id, token } = data

                        sessionStorage.id = id
                        sessionStorage.token = token

                        retrieveUser(id, token, (error, user) => {
                            if (error) return this.setState({ error: error.message })

                            const { name } = user

                            this.setState({ view: 'search', user: name })
                        })
                    } catch (error) {
                        this.setState({ error: error.message })
                    }
                })
            } catch (error) {
                this.setState({ error: error.message })
            }
        }

        handleSearch = query => {
            try {
                const { id, token } = sessionStorage

                searchDucks(id, token, query, (error, ducks) => {
                    if (error) return this.setState({ error: error.message })

                    location.query = query

                    this.setState({ query, error: undefined, ducks })
                })
            } catch (error) {
                this.setState({ error: error.message })
            }
        }

        handleDetail = duckId => {
            try {
                location.slash = pathname
                location.hash = `/duck/${duckId}`

                const { id, token } = sessionStorage

                retrieveDuck(id, token, duckId, (error, duck) => {
                    if (error) return this.setState({ error: error.message })

                    this.setState({ view: 'detail', duck })
                })
            } catch (error) {
                this.setState({ error: error.message })
            }
        }

        handleBackToSearch = () => {
            location.hash = ''

            const { state: { query } } = this

            this.setState({ view: 'search' }) // NOTE in case you needa do things in order you can use this callback from setState (it is called after state changes are effective)

            query && this.handleSearch(query)
        }

        handleFav = duckId => {
            try {
                const { id, token } = sessionStorage

                toggleFavDuck(id, token, duckId, error => {
                    if (error) return this.setState({ error: error.message })

                    const { state: { view, query, duck } } = this

                    view === 'search' ? this.handleSearch(query) : this.handleDetail(duck.id)
                })
            } catch (error) {
                this.setState({ error: error.message })
            }
        }

        handleLogout = () => {
            sessionStorage.clear()

            this.handleBackToLanding()
        }

        render() {
            const { state: { view, error, ducks, duck, user, query }, handleGoToRegister, handleGoToLogin, handleRegister, handleBackToLanding, handleLogin, handleSearch, handleDetail, handleBackToSearch, handleFav, handleLogout } = this

            return <>
                {view === 'landing' && <Landing onLogin={handleGoToLogin} onRegister={handleGoToRegister} />}
                {view === 'register' && <Register onRegister={handleRegister} onBack={handleBackToLanding} error={error} />}
                {view === 'login' && <Login onLogin={handleLogin} onBack={handleBackToLanding} error={error} />}
                {view === 'search' && <>
                    <Search onSubmit={handleSearch} results={ducks} error={error} onResultsRender={results => <Results items={results} onItemRender={item => <ResultItem item={item} key={item.id} onClick={handleDetail} onFav={handleFav} />} />} user={user} query={query} onLogout={handleLogout} />
                    {error && <Feedback message={error} />}
                </>}
                {view === 'detail' && duck && <Detail item={duck} onBack={handleBackToSearch} onFav={handleFav} />}
            </>
        }
    }
})()