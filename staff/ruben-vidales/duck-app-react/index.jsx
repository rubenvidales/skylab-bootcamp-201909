const { Component } = React

class App extends Component {
    constructor() {
        super()

        this.state = { view: 'landing', error: undefined }

        this.handleGoToRegister = this.handleGoToRegister.bind(this)
        this.handleGoToLogin = this.handleGoToLogin.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleBackFromRegister = this.handleBackFromRegister.bind(this)
        this.handleBackFromLogin = this.handleBackFromLogin.bind(this)
    }

    handleGoToRegister() {
        this.setState({ view: 'register' })
    }

    handleGoToLogin() {
        this.setState({ view: 'login' })
    }

    handleRegister(name, surname, email, password) {
        try {
            registerUser(name, surname, email, password, error => {
                if (error) this.setState({ error: error.message })
                else this.setState({ view: 'landing' })
            })
        } catch (error) {
            this.setState({ error: error.message })
        }
    }

    handleLogin(email, password) {
        try {
            authenticateUser(email, password, error => {
                if (error) this.setState({ error: error.message })
                else this.setState({ view: 'search' })
            })
        } catch (error) {
            this.setState({ error: error.message })
        }
    }

    handleSearch(query) {
        try {
            searchDucks(query, error => {
                if (error) this.setState({ error: error.message })
                else {}
            })
        } catch (error) {
            this.setState({ error: error.message })
        }
    }

    handleBackFromRegister() {
        this.setState({ view: 'landing', error: undefined })
    }

    handleBackFromLogin() {
        this.setState({ view: 'landing', error: undefined })
    }

    render() {
        const { state: { view, error }, handleGoToRegister, handleGoToLogin, handleRegister, handleLogin, handleBackFromRegister, handleBackFromLogin } = this

        return <>
            {view === 'landing' && <Landing onLogin={handleGoToLogin} onRegister={handleGoToRegister} />}
            {view === 'register' && <Register onRegister={handleRegister} onBack={handleBackFromRegister} error={error} />}
            {view === 'login' && <Login onLogin={handleLogin} onBack={handleBackFromLogin} error={error} />}
            {view === 'search' && <Search onSearch={this.handleSearch} />}
        </>
    }
}
ReactDOM.render(<App />, document.getElementsByTagName('main')[0])