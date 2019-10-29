const { Component } = React

const App = (() => {
    const { id, token } = sessionStorage

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

        handleGoToProfile = () => {
            this.setState({ view: 'profile' })
        }

        handleGoToSearch = () => {
            this.setState({ view: 'search' })
        }

        handleRegister = (name, surname, email, password) => {
            try {
                registerUser(name, surname, email, password, error => {
                    if (error) return this.setState({ error: error.message })

                    this.setState({ view: 'login' })
                })
            } catch (error) {
                this.setState({ error: error.message })
            }
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

        handleProfile = () => {
            try {
                registerUser(name, surname, email, password, error => {
                    if (error) return this.setState({ error: error.message })

                    this.setState({ view: 'login' })
                })
            } catch (error) {
                this.setState({ error: error.message })
            }
        }

        handleLogout = () => {
            delete sessionStorage.id
            delete sessionStorage.token

            this.setState({ view: 'landing' })
        }

        render() {
            const { state: { view, user }, handleGoToLogin, handleGoToRegister, handleGoBackToLanding, handleGoToProfile, handleGoToSearch, handleRegister, handleLogin, handleLogout, handleProfile } = this

            return <>
                {view === 'landing' && <Landing onLogin={handleGoToLogin} onRegister={handleGoToRegister} />}
                {view === 'register' && <Register onBack={handleGoBackToLanding} onRegister={handleRegister} />}
                {view === 'login' && <Login onBack={handleGoBackToLanding} onLogin={handleLogin} />}
                {view === 'search' && <Search user={user} onEdit={handleGoToProfile} onLogout={handleLogout} />}
                {view === 'profile' && <Profile onBack={handleGoToSearch} onEdit={handleProfile} />}
            </>
        }
    }
})()