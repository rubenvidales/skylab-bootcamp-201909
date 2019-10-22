const { Component } = React

class App extends Component {
    constructor() {
        super()

        this.state = { view: 'landing', error: undefined }

        this.handleGoToRegister = this.handleGoToRegister.bind(this)
        this.handleGoToLogin = this.handleGoToLogin.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
        this.handleBackFromRegister = this.handleBackFromRegister.bind(this)
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
                debugger
                if (error) this.setState({ error: error.message })
                else this.setState({ view: 'landing' })
            })
        } catch (error) {
            this.setState({ error: error.message })
        }
    }

    handleBackFromRegister() {
        this.setState({ view: 'landing', error: undefined })
    }

    render() {
        const { state: { view, error }, handleGoToRegister, handleGoToLogin, handleRegister, handleBackFromRegister } = this

        return <>
            {view === 'landing' && <Landing onLogin={handleGoToLogin} onRegister={handleGoToRegister} />}
            {view === 'register' && <Register onRegister={handleRegister} onBack={handleBackFromRegister} error={error} />}
            {view === 'login' && <Login onLogin={handleGoToLogin} onBack={handleBackFromRegister} error={error} />}
        </>
    }
}
ReactDOM.render(<App />, document.getElementsByTagName('main')[0])