import React, { useState, useEffect } from 'react';
import './index.sass'
import Landing from '../Landing'
import Register from '../Register'
import Login from '../Login'
import Player from '../Player'
import Playlist from '../Playlist'
import Channels from '../Channels'
import FooterBar from '../FooterBar'
import { registerUser, authenticateUser, retrieveUser, createRss, listRss } from '../../logic'
import { Route, withRouter, Redirect } from 'react-router-dom'

export default withRouter(function ({ history }) {
    const [name, setName] = useState('')
    const [channels, setChannels] = useState([])

    function handleGoToRegister() { history.push('/register') }
    function handleGoToLogin() { history.push('/login') }

    function handleGoPath(path) {
        history.push(path)
    }

    function handleGoBack() { history.push('/') }

    function handleLogout() {
        sessionStorage.clear()
        handleGoBack()
    }

    useEffect(() => {
        const { token } = sessionStorage;

        (async () => {
            if (token) {
                const { name } = await retrieveUser(token)

                setName(name)

                await retrieveChannels(token)
            }
        })()
    }, [sessionStorage.token, channels])

    async function retrieveChannels(token) {
        const channels = await listRss(token)

        setChannels(channels)
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

    async function handleAddRss(url) {
        try {
            const { token } = sessionStorage
            await createRss(token, url)
        } catch (error) {
            console.log(error)
        }
    }

    async function handleListRss(){
        try {
            const { token } = sessionStorage
            const channels = await listRss(token)
            setChannels(channels)

        } catch (error) {
            console.log(error)
        }
    }
    const { token } = sessionStorage
    return <>
        <Route exact path="/" render={() => token ? <Redirect to="/player" /> : <Landing onRegister={handleGoToRegister} onLogin={handleGoToLogin} />} />
        <Route path="/register" render={() => token ? <Redirect to="/player" /> : <Register onRegister={handleRegister} onBack={handleGoBack} />} />
        <Route path="/login" render={() => token ? <Redirect to="/player" /> : <Login onLogin={handleLogin} onBack={handleGoBack} />} />
        <Route path="/player" render={() => <Player />} />
        <Route path="/playlist" render={() => <Playlist />} />
        <Route path="/channels" render={() => <Channels onAddRss={handleAddRss} onListRss={handleListRss} channels={channels}/>} />

        {token && <FooterBar onPath={handleGoPath} onLogout={handleLogout} />}
    </>
})
