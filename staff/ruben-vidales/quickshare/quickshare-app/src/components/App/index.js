import React, { useState, useEffect } from 'react';
import './index.sass'
import Landing from '../Landing'
import Register from '../Register'
import Login from '../Login'
import Player from '../Player'
import Playlist from '../Playlist'
import Channels from '../Channels'
import FooterBar from '../FooterBar'
import { registerUser, authenticateUser } from '../../logic'
import { Route, withRouter, Redirect } from 'react-router-dom'

export default withRouter(function ({ history }) {

    const [ viewFooter, setViewFooter ] = useState(undefined)

    const { token } = sessionStorage

    function handleGoToRegister() { history.push('/register') }
    function handleGoToLogin() { history.push('/login') }
    function handleGoToPlayer() { history.push('/player') }
    function handleGoToChannels() { history.push('/channels') }
    function handleGoBack() { history.push('/') }

    function handleGoPath(path) {
        history.push(path)
    }

    function handleLogout() {
        sessionStorage.clear()
        handleGoBack()
    }

    async function handleRegister(name, surname, email, username, password) {
        try {
            await registerUser(name, surname, email, username, password)

            history.push('/login')
        } catch (error) {
            console.error(error)
        }
    }

    async function handleLogin(username, password) {
        try {
            const token = await authenticateUser(username, password)

            sessionStorage.token = token

            history.push('/player')
        } catch (error) {
            console.error(error)
        }
    }


    async function handlePlaylist(){
        try {
            history.push('/playlist')
        } catch (error) {
            console.error(error)
        }
    }


    return <>
        <Route exact path="/" render={() => token ? <Redirect to="/player" /> : <Landing onRegister={handleGoToRegister} onLogin={handleGoToLogin} />} />
        <Route path="/register" render={() => token ? <Redirect to="/player" /> : <Register onRegister={handleRegister} onBack={handleGoBack} />} />
        <Route path="/login" render={() => token ? <Redirect to="/player" /> : <Login onLogin={handleLogin} onBack={handleGoBack} />} />
        <Route path="/player" render={() => <Player />} />
        <Route path="/playlist" render={() => <Playlist />} />
        <Route path="/channels" render={() => <Channels />} />

        {token && <FooterBar onPath={handleGoPath} onLogout={handleLogout}/>}

    </>
})
