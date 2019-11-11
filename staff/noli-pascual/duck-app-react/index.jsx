const { Component } = React

const { query } = location

const { id, token } = sessionStorage

class App extends Component {
    state = { view: id && token ? 'search' : 'landing', error: undefined, query }

    componentWillMount() {
        if (id && token) {
            try {
                retrieveUser(id, token, (error, user) => {
                    if (error) this.setState({ error: error.message })
                    else {
                        const { name } = user

                        this.setState({ user: name })
                    }
                })
            } catch (error) {
                this.setState({ error: error.message })
            }

            const { state: { query } } = this

            query && this.handleSearch(query)
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
                if (error) this.setState({ error: error.message })
                else this.setState({ view: 'landing' })
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
                if (error) this.setState({ error: error.message })
                else
                    try {
                        const { id, token } = data

                        sessionStorage.id = id
                        sessionStorage.token = token

                        retrieveUser(id, token, (error, user) => {
                            if (error) this.setState({ error: error.message })
                            else {
                                const { name } = user

                                this.setState({ view: 'search', user: name })
                            }
                        })
                    } catch (error) {
                        this.setState({ error: error.message })
                    }
            })
        } catch (error) {
            this.setState({ error: error.message })
        }
    }

    handleSearch = (query) => {
        try {
            searchDucks(query, (error, ducks) => {
                if (error) this.setState({ error: error.message })
                else {
                    location.query = query

                    this.setState({ error: undefined, ducks })
                }
            })
        } catch (error) {
            this.setState({ error: error.message })
        }
    }

    handleDetail = (id) => {
        try {
            retrieveDuck(id, (error, duck) => {
                if (error) this.setState({ error: error.message })
                else this.setState({ view: 'detail', duck })
            })
        } catch (error) {
            this.setState({ error: error.message })
        }
    }

    handleBackToSearch = () => {
        this.setState({ view: 'search' })
    }

    handleFav = (id) => {
        // TODO toggleFavDuck(user-id, user-token, id)
    }

    render() {
        const { state: { view, error, ducks, duck, user, query }, handleGoToRegister, handleGoToLogin, handleRegister, handleBackToLanding, handleLogin, handleSearch, handleDetail, handleBackToSearch, handleFav } = this

        return <>
            {view === 'landing' && <Landing onLogin={handleGoToLogin} onRegister={handleGoToRegister} />}
            {view === 'register' && <Register onRegister={handleRegister} onBack={handleBackToLanding} error={error} />}
            {view === 'login' && <Login onLogin={handleLogin} onBack={handleBackToLanding} error={error} />}
            {view === 'search' && <>
                <Search onSubmit={handleSearch} results={ducks} error={error} onResultsRender={results => <Results items={results} onItemRender={item => <ResultItem item={item} key={item.id} onClick={handleDetail} onFav={handleFav} />} />} user={user} query={query} />
                {error && <Feedback message={error} />}
            </>}
            {view === 'detail' && <Detail item={duck} onBack={handleBackToSearch} />}
        </>
    }
}

ReactDOM.render(<App />, document.getElementById('root'))