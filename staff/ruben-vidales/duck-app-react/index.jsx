const { Component } = React

class App extends Component {
    constructor() {
        super()

        this.state = { view: 'search', error: undefined }

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
            authenticateUser(email, password, error => {
                if (error) this.setState({ error: error.message })
                else this.setState({ view: 'search' })
            })
        } catch (error) {
            this.setState({ error: error.message })
        }
    }

    handleSearch = (query) => {
        try {
            searchDucks(query, (error, ducks) => {
                if (error) this.setState({ error: error.message })
                else this.setState({ error: undefined, ducks })
            })
        } catch (error) {
            this.setState({ error: error.message })
        }
    }

    handleDetail(id) {
        console.log(id) // TODO show detail
    }

    handleBackToLanding = () => {
        this.setState({ view: 'landing', error: undefined })
    }

    render() {
        const { state: { view, error, ducks }, handleGoToRegister, handleGoToLogin, handleRegister, handleBackToLanding, handleLogin, handleSearch, handleDetail } = this
        return <>
            {view === 'landing' && <Landing onLogin={handleGoToLogin} onRegister={handleGoToRegister} />}
            {view === 'register' && <Register onRegister={handleRegister} onBack={handleBackToLanding} error={error} />}
            {view === 'login' && <Login onLogin={handleLogin} onBack={handleBackToLanding} error={error} />}
            {view === 'search' && <Search onSubmit={handleSearch} results={ducks} error={error} onResultsRender={results => <Results items={results} onItemRender={item => <ResultItem item={item} key={item.id} onClick={handleDetail} />} />} />}
        </>
    }
}
ReactDOM.render(<App />, document.getElementsByTagName('main')[0])