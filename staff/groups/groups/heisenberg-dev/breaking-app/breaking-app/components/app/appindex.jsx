const { Component } = React

const App = (() => {

    const { id, token } = sessionStorage

    return class extends Component {
        state = { view: 'landing', episodes: null, episodedetail: null, items: null, item: null }

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

        handleSearch = query => {
            try {
                const { id, token } = sessionStorage

                searchCharacters(id, token, query, (error, character)=>{
                    if (error) return this.setState({ error: error.message })
                    this.setState({ query, error: undefined, character })
                })
            } catch (error) {
                this.setState({ error: error.message })
            }
        }

        handleRetrieveUser = () => {
            //TODO
            return retrieveUser(id)
        }

        handleGoToCharacters = items => {
            listCharacters((error, items) => {
                if (error) this.setState({ error: error.message })
                else this.setState({ view: 'characters', items })
            })
        }
        handleOnClickCharacter = char_id => {
            retrieveCharDetails(char_id, (error, item) => {
                if (error) this.setState({ error: error.message })
                else this.setState({ view: 'character-detail', item })
            })
        }

        render() {
<<<<<<< HEAD:staff/groups/groups/heisenberg-dev/breaking-app/breaking-app/components/app/appindex.jsx
            const { state: { view, user, episodes, episodedetail }, handleGoToLogin, handleGoToRegister, handleGoBackToLanding, handleGoToProfile, handleGoToSearch, handleRegister, handleLogin, handleLogout, handleProfile, handleRetrieveUser, handleGoBackToHome, handleGoBackToSeasons, handleGoBackToEpisodes, handleGoToSeason, handleGoToEpisode, handleSearch } = this
=======

            const { state: { view, user, episodes, episodedetail, items, item }, handleGoToLogin, handleGoToRegister, handleGoBackToLanding, handleGoToProfile, handleGoToSearch, handleRegister, handleLogin, handleLogout, handleProfile, handleRetrieveUser, handleGoBackToHome, handleGoBackToSeasons, handleGoBackToEpisodes, handleGoToSeason, handleGoToEpisode, handleGoToCharacters, handleOnClickCharacter } = this
>>>>>>> breaking-app-develop:staff/groups/groups/heisenberg-dev/breaking-app/breaking-app/components/app/index.jsx

            return <>
                {view === 'landing' && <Landing onLogin={handleGoToLogin} onRegister={handleGoToRegister} />}
                {view === 'register' && <Register onBack={handleGoBackToLanding} onRegister={handleRegister} />}
                {view === 'login' && <Login onBack={handleGoBackToLanding} onLogin={handleLogin} />}
<<<<<<< HEAD:staff/groups/groups/heisenberg-dev/breaking-app/breaking-app/components/app/appindex.jsx
                {view === 'search' && <Search user={user} onEdit={handleGoToProfile} onLogout={handleLogout} onSubmit={handleSearch} />}
=======
                {view === 'search' && <Search user={user} onEdit={handleGoToProfile} onLogout={handleLogout} onBackSeasons={handleGoBackToSeasons} onBackCharacters={handleGoToCharacters}  />}
>>>>>>> breaking-app-develop:staff/groups/groups/heisenberg-dev/breaking-app/breaking-app/components/app/index.jsx
                {view === 'profile' && <Profile onBack={handleGoToSearch} onEdit={handleProfile} data={handleRetrieveUser} />}
                {view === 'characters' && <CharacterResults items={items} onBack={handleGoToSearch} onClickCharacter={handleOnClickCharacter} />}
                {view === 'character-detail' && <CharacterDetail item={item} onBackCharacters={handleGoToCharacters} onBack={handleGoToSearch} />}
                {view === 'seasons' && <Seasons goToSeason={handleGoToSeason} onBackHome={handleGoBackToHome} />}
                {view === 'episodes' && <EpisodesList episodes={episodes} goToEpisode={handleGoToEpisode} onBackSeasons={handleGoBackToSeasons} onBackHome={handleGoBackToHome} />}
                {view === 'episode-detail' && <EpisodeDetail episodedetail={episodedetail} onBackEpisodes={handleGoBackToEpisodes} onBackSeasons={handleGoBackToSeasons} />}
            </>
        }
    }
})()