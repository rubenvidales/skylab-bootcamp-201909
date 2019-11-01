const { Component } = React

const App = (() => {

    const { id, token } = sessionStorage

    return class extends Component {
        state = { view: id && token ? 'search' : 'landing', error: undefined, episodes: null, episodedetail: null, items: null, item: null }

        componentWillMount() {
            if (id && token)
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
        }

        handleGoToRegister = () => {
            this.setState({ view: 'register', error: undefined })
        }

        handleGoToLogin = () => {
            this.setState({ view: 'login', error: undefined })
        }

        handleGoBackToLanding = () => {
            this.setState({ view: 'landing' })
        }

        //

        handleGoBackToHome = () => {
            this.setState({ view: 'search', error: undefined  })
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

        handleGoToProfile = () => {
            this.setState({ view: 'profile' })
        }

        handleGoToSearch = () => {
            this.setState({ view: 'search', error: undefined }) //!!!! cambiar nueva versión
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

                            try {
                                listCharacters(id, token, (error, result) => {
                                    const randomNumber = Math.floor(Math.random()*result.length);
                                    const randomChar = result[randomNumber]
                                    this.setState({ view: 'search', user: name, rdmChar: randomChar, error: undefined })
                                })
                            } catch (error) {
                                this.setState({ error: error.message })
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

                searchCharacters(id, token, query, (error, item) => {
                    if (error) return this.setState({ error: error.message })
                    else this.setState({ view: 'character-detail', item,  })
                })
            } catch (error) {
                this.setState({ error: error.message })
            }
        }

        handleRetrieveUser = () => {
            //TODO
            return retrieveUser(id)
        }

        handleGoToCharacters = () => {
            listCharacters(id, token, (error, items) => {
                if (error) this.setState({ error: error.message })
                else this.setState({ view: 'characters', items })
            })
        }
        handleOnClickCharacter = charId => {
            retrieveCharDetails(id, token, charId, (error, item) => {
                if (error) {
                    this.setState({ error: error.message })
                } else {
                    this.setState({ view: 'character-detail', item })
                }
            })
        }

        handleFavCharacter = (charId, origin) => {
            try {
                const { id, token } = sessionStorage

                favCharacterToogle(id, token, charId.toString(), error => {
                    if (error) return this.setState({ error: error.message })
                    else {
                        if (origin === undefined) {
                            this.handleGoToCharacters()
                        } else {
                            this.handleOnClickCharacter(charId)
                        }
                    }
                })
            } catch (error) {
                this.setState({ error: error.message })
            }
        }

        render() {

            const { state: { view, user, episodes, episodedetail, items, item, rdmChar, error }, handleGoToLogin, handleGoToRegister, handleGoBackToLanding, handleGoToProfile, handleGoToSearch, handleRegister, handleLogin, handleLogout, handleProfile, handleRetrieveUser, handleGoBackToHome, handleGoBackToSeasons, handleGoBackToEpisodes, handleGoToSeason, handleGoToEpisode, handleGoToCharacters, handleOnClickCharacter, handleSearch, handleFavCharacter } = this

            return <>
                {view === 'landing' && <Landing onLogin={handleGoToLogin} onRegister={handleGoToRegister} />}
                {view === 'register' && <Register onBack={handleGoBackToLanding} onRegister={handleRegister} error={error}/>}
                {view === 'login' && <Login onBack={handleGoBackToLanding} onLogin={handleLogin} error={error}/>}
                {view === 'search' && <Search user={user} rdmChar={rdmChar} onClickCharacter={handleOnClickCharacter} onFavCharacter={handleFavCharacter} onEdit={handleGoToProfile} onLogout={handleLogout} onBackSeasons={handleGoBackToSeasons} onBackCharacters={handleGoToCharacters} onSubmit={handleSearch} error={error}/>}
                {view === 'profile' && <Profile onBack={handleGoToSearch} onEdit={handleProfile} data={handleRetrieveUser} />}
                {view === 'characters' && <CharacterResults items={items} onBack={handleGoToSearch} onClickCharacter={handleOnClickCharacter} onFavCharacter={handleFavCharacter} />}
                {view === 'character-detail' && <CharacterDetail item={item} onBackCharacters={handleGoToCharacters} onBack={handleGoToSearch} onFav={handleFavCharacter} />}
                {view === 'seasons' && <Seasons goToSeason={handleGoToSeason} onBackHome={handleGoBackToHome} />}
                {view === 'episodes' && <EpisodesList episodes={episodes} goToEpisode={handleGoToEpisode} onBackSeasons={handleGoBackToSeasons} onBackHome={handleGoBackToHome} />}
                {view === 'episode-detail' && <EpisodeDetail episodedetail={episodedetail} onBackEpisodes={handleGoBackToEpisodes} onBackSeasons={handleGoBackToSeasons} />}
            </>
        }
    }
})()