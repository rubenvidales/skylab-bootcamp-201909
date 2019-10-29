const { Component } = React

const App = (() => {

    return class extends Component {

        state = { view: 'landing' }

        handleGoToRegister = () => {
            this.setState({ view: 'register' })
        }

        handleGoToLogin = () => {
            this.setState({ view: 'login' })
        }

        render() {
            const { state: { view }, handleGoToLogin, handleGoToRegister } = this

            return <>
                {view === 'landing' && <Landing onLogin={handleGoToLogin} onRegister={handleGoToRegister} />}
                {view === 'register' && <Register />}
            </>
        }
    }
})()