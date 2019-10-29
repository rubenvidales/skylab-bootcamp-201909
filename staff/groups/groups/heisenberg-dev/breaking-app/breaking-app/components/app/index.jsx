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

        handleGoBackToLanding = () => {
            this.setState({ view: 'landing' })
        }

        render() {
            const { state: { view }, handleGoToLogin, handleGoToRegister, handleGoBackToLanding } = this

            return <>
                {view === 'landing' && <Landing onLogin={handleGoToLogin} onRegister={handleGoToRegister} />}
                {view === 'register' && <Register onBack={handleGoBackToLanding}/>}
                {view === 'login' && <Login onBack={handleGoBackToLanding}/>}
                {view === 'search' && <Search />}
            </>
        }
    }
})()