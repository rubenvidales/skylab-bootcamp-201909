const { Component } = React

const App = (() => {
    const { id, token } = sessionStorage

    return class extends Component {

        state = { view: 'search', episodes: null, episodedetail: null }

        handleGoToRegister = () => {
            this.setState({ view: 'register' })
        }

        handleGoToLogin = () => {
            this.setState({ view: 'login' })
        }

        handleGoBackToLanding = () => {
            this.setState({ view: 'landing' })
        }
        //
        handleGoBackToHome = () => {
            this.setState({ view: 'search' })
        }

        handleGoBackToSeasons = () => {
            this.setState({ view: 'seasons' })
        }

        handleGoBackToEpisodes = () => {
            this.setState({ view: 'episodes' })
        }

        handleGoToSeason = season => {
            listEpisodes(season, (error, episodes) => {
                if (error) this.setState({ error: error.message })
                else this.setState({ view: 'episodes', episodes })
            })
        }

        handleGoToEpisode = episode_id => {
            retrieveEpisode(episode_id, (error, episodedetail) => {
                if (error) this.setState({ error: error.message })
                else this.setState({ view: 'episode-detail', episodedetail })
            })
        }
        //
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

        handleRetrieveUser = () => {
            //TODO
            return retrieveUser(id)
            
        }

        handleGoToCharacters = () => {
            this.setState({ view: 'characters' })
        }

        render() {
            const { state: { view, user, episodes, episodedetail }, handleGoToLogin, handleGoToRegister, handleGoBackToLanding, handleGoToProfile, handleGoToSearch, handleRegister, handleLogin, handleLogout, handleProfile, handleRetrieveUser, handleGoBackToHome, handleGoBackToSeasons, handleGoBackToEpisodes, handleGoToSeason, handleGoToEpisode, handleGoToCharacters } = this

            return <>
                {view === 'landing' && <Landing onLogin={handleGoToLogin} onRegister={handleGoToRegister} />}
                {view === 'register' && <Register onBack={handleGoBackToLanding} onRegister={handleRegister} />}
                {view === 'login' && <Login onBack={handleGoBackToLanding} onLogin={handleLogin} />}
                {view === 'search' && <Search user={user} onEdit={handleGoToProfile} onLogout={handleLogout} onBackSeasons={handleGoBackToSeasons} onBackCharacters={handleGoToCharacters}  />}
                {view === 'profile' && <Profile onBack={handleGoToSearch} onEdit={handleProfile} data={handleRetrieveUser} />}
                {view === 'characters' && <CharacterResults items={items} onBack={handleGoToSearch} />}
                {view === 'character-detail' && <CharacterDetail onBackCharacters={handleGoToCharacters} onBack={handleGoToSearch} />}
                {view === 'seasons' && <Seasons goToSeason={handleGoToSeason} onBackHome={handleGoBackToHome} />}
                {view === 'episodes' && <EpisodesList episodes={episodes} goToEpisode={handleGoToEpisode} onBackSeasons={handleGoBackToSeasons} onBackHome={handleGoBackToHome} />}
                {view === 'episode-detail' && <EpisodeDetail episodedetail={episodedetail} onBackEpisodes={handleGoBackToEpisodes} onBackSeasons={handleGoBackToSeasons} />}
            </>
        }
    }
})()