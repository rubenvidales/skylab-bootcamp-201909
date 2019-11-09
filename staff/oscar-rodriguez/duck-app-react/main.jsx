const { Component } = React

class App extends Component {
    constructor () {
        super()

        this.state = {showMe: false , show: 'start' , error: undefined , ducksList : undefined , itemClick : false , user : undefined}

        this.handleOnLogin          =   this.handleOnLogin.bind(this)
        this.handleOnRegister       =   this.handleOnRegister.bind(this)
        this.handleSearch           =   this.handleSearch.bind(this)
        this.handleClickItem        =   this.handleClickItem.bind(this)
        this.handleBack             =   this.handleBack.bind(this)
        this.handleStart            =   this.handleStart.bind(this)
        this.handleShowForm         =   this.handleShowForm.bind(this)
        this.handleLogOut           =   this.handleLogOut.bind(this)
        this.handleEnter            =   this.handleEnter.bind(this)
        this.handleFavs             =   this.handleFavs.bind(this)
        this.handleShowFavorites    =   this.handleShowFavorites.bind(this)
    }

    componentWillMount () {
        const credentials = JSON.parse(sessionStorage.getItem('credentials'))
        if (credentials) {
            const { id , token } = credentials
            this.setState ({id : id , token : token})
            try {
                retrieveUser(id, token, (error, {data}) => {
                    const { name } = data
                    if (error) this.setState({ error: error.message })
                    else {
                        this.setState({ user: name })
                        this.setState ( {show : 'wellcome' , user : name} )
                    }

                })
            } catch (error) {
                this.setState({ error: error.message })
            }
        }
    }

    handleOnRegister (username, password, name, surname) {
        try {
            registerUser(name, surname, username, password, error => {
                if (error) this.setState({ error: error.message })
                else this.setState ( {show : 'login'} )
            })
        } catch (error) {
            this.setState({ error: error.message })
        }
    }

    handleOnLogin (username, password) {
        try {
            authenticateUser(username, password, (error, credentials) => {
                if (error) this.setState({ error: error.message })
                else {
                    try {     
                        sessionStorage.setItem ('credentials', JSON.stringify(credentials))
                        retrieveUser (credentials.id, credentials.token, (error, {data}) => {
                            const {name } = data
                            this.setState ({id : credentials.id, token: credentials.token})
                            if (error) this.setState({ error: error.message })
                            else { this.setState ( {show : 'search' , user : name} )
                                 document.getElementsByClassName('header')[0].classList.add("header--login")
                            }
                        })
                    } catch (error){
                        this.setState ({ error : error.message})
                    }
                    try {
                        searchDucks(credentials.id, credentials.token, '', (error, ducks) => {
                            if( error ) {
                                alert ("error");
                            } else {
                                this.setState( {ducksList : ducks})
                            }
                        })
                    } catch (error){
                        this.setState ({ error : error.message})
                    
                    }
                }
            })
        } catch (error) {
            this.setState({ error: error.message })
        }
    }

    handleSearch (query) {
        try {
            searchDucks(this.state.id, this.state.token, query, (error, ducks) => {
                if( error ) {
                    this.setState({ error: error.message })
                } else {
                    this.setState( {ducksList : ducks})
                }
            })
        } catch (error) {
            this.setState({ error: error.message })
        }
    }

    handleClickItem (id) {
        try {
            retrieveDuck(id, (error, duck) => {
                if ( error ) {
                    alert("error")
                } else {
                    this.setState( {itemClick : duck} )
                }
            })
        } catch (error) {
            this.setState({ error: error.message })
        }

    }

    handleBack () {
        this.setState ( { itemClick : false } )
    }

    handleStart () {
        this.setState ( { show : 'wellcome' } )
    }

    handleShowForm () {
        this.setState ( { showMe : !(this.state.showMe) , error : undefined} )
    }

    handleLogOut() {
        sessionStorage.clear();
        this.setState({credentials: undefined})
        this.setState({ducksList: undefined})
        this.setState({user: undefined})
        this.setState({show : 'start'})
        document.getElementsByClassName('header')[0].classList.remove("header--login")
    } 
    
    handleEnter() {
        document.getElementsByClassName('header')[0].classList.add("header--login")
        this.setState ( {show : 'search'} )
        this.handleSearch('');
    }

    handleFavs (duckId) {
        const { ducksList } = this.state
        
        const duckIndex = ducksList.findIndex(duck=>{
            return duck.id === duckId
        })
        ducksList[duckIndex].fav = !ducksList[duckIndex].fav
        this.setState({ ducksList})

        const {id,token} = this.state
        retrieveUser (id, token, (error, {data}) => {
            if(error) this.setState({error: error.message})
            else {
                toogleFavDucks(id,token,duckId,(error, results) => {
                    if (error) this.setState({error: error.message})
                })
            }
        })
    }

    handleShowFavorites (){
        const { id , token } = this.state
        retrieveFavDucks( id , token, ((error, results) => {
            if (error) this.setState ({ error : error.message })
            else this.setState( {ducksList : results})
        }))        
    }

    render() {
        const {state : { show, showMe, error, ducksList , itemClick, user}, handleShowFavorites, handleFavs, handleLogOut, handleEnter, handleShowForm, handleStart,handleOnLogin, handleOnRegister, handleSearch, handleClickItem, handleBack} = this
        return <>
            <section className="header">
                <Header onClick={handleStart}/>
                { (show === 'wellcome') && <Wellcome user={user} onShowForm={handleShowForm} onEnter={handleEnter} onLogOut={handleLogOut} showMe = { showMe } error={error} onLogin={handleOnLogin} onRegister={handleOnRegister}/> }
                { (show === 'search') && <Search onSearch={handleSearch} error={error}/>}
            </section>
            <section >
                { (user) && <UserData user={user} onLogOut={handleLogOut} onShowFavorites={handleShowFavorites}/> }
            </section>
            <main className="main">
                <section className="main__search" id="search-list">
                    {ducksList && !itemClick && <Results onFav={handleFavs} ducks={ducksList} onClickItem={handleClickItem}/>}
                </section>
                <section className="main__duck-detail duck-detail" id="duck-detail">
                    {itemClick && <Detail duck={itemClick} onBack={handleBack}/>}
                </section>
            </main>
            
        </>
    }
}

ReactDOM.render(<>
    <App />
</>, document.getElementById('root'))