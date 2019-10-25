const { Component } = React

const { id, token } = sessionStorage

const { query } = location

class App extends Component {
    constructor() {
        super()

        this.state = { view: 'landing', error: undefined }

    }

    componentWillMount() {
        const { id, token } = sessionStorage

        if (id && token) 
            try {
                retrieveUser(id, token, (error, { name }) => {
                    if (error) this.setState({ error: error.message })
                    else this.setState({ user: name })
                })
            } catch (error) {
                this.setState({ error: error.message })
            }

        const { state: { query } } = this

        query && this.handleSearch(query)
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

    handleLogin = (email, password) => {
        try {
            authenticateUser(email, password, (error, { id, token }) => {
                if (error) this.setState({ error: error.message })
                else
                    try {
                        sessionStorage.id = id
                        sessionStorage.token = token

                        retrieveUser(id, token, (error, { name }) => {
                            if (error) this.setState({ error: error.message })
                            else this.setState({ view: 'search', user: name })
                        })
                    } catch (error) {
                        this.setState({ error: error.message })
                    }
            })
        } catch (error) {
            this.setState({ error: error.message })
        }
    }

    handleLogout = () => {
        delete sessionStorage.id
        delete sessionStorage.token
        this.setState({view: 'landing'})
    }

    handleSearch = (id, token, query) => {
        try {
            searchDucks(id, token, query, (error, ducks) => {
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

    handleDetail = (duckId) => {
        const {id, token} = sessionStorage
        try {
            retrieveDuck(id, token, duckId, (error, duck) => {
                if (error) this.setState({ error: error.message })
                else this.setState({ view: 'detail', duck })
            })
        } catch (error) {
            this.setState({ error: error.message })
        }
    }

    handleBackToLanding = () => {
        this.setState({ view: 'landing', error: undefined })
    }

    handleBackToSearch = () => {
        this.setState({ view: 'search' })
    }

    handleFav = (duckId) => {

        const {id, token} = sessionStorage

        try{
            toogleFavDucks(id, token, duckId, error => {
                if (error) this.setState({ error: error.message })
                else {
                    try {
                        searchDucks(id, token, query, (error, ducks) => {
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
            })
        }catch (error){
            this.setState({ error: error.message })
        }
        
    }

    render() {
        const { state: { view, error, ducks, duck, user, query }, handleGoToRegister, handleGoToLogin, handleRegister, handleBackToLanding, handleLogin, handleLogout, handleSearch, handleDetail, handleBackToSearch, handleFav } = this

        return <>
            {view === 'landing' && <Landing onLogin={handleGoToLogin} onRegister={handleGoToRegister} />}
            {view === 'register' && <Register onRegister={handleRegister} onBack={handleBackToLanding} error={error} />}
            {view === 'login' && <Login onLogin={handleLogin} onBack={handleBackToLanding} error={error} />}
            {view === 'search' && <>
                <Search onSearch={handleSearch} onLogout={handleLogout} id={sessionStorage.id} token={sessionStorage.token} results={ducks} error={error} onResultsRender={results => <Results items={results} onItemRender={item => <ResultItem item={item} key={item.id} onClick={handleDetail} onFav={handleFav} />} />} user={user} query={query} />
                {error && <Feedback message={error} />}
            </>}
            {view === 'detail' && <Detail item={duck} onBack={handleBackToSearch} onFav={handleFav} />}
        </>
    }
}
ReactDOM.render(<App />, document.getElementsByTagName('main')[0])