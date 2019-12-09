import React, { useState, useEffect } from 'react';
import './index.sass'
import Landing from '../Landing'
import Register from '../Register'
import Login from '../Login'
import Player from '../Player'
import Playlist from '../Playlist'
import Channels from '../Channels'
import RssDetail from '../RssDetail'
import FooterBar from '../FooterBar'
import Favs from '../Favs'
import { registerUser, authenticateUser, retrieveUser, createRss, listRss, retrieveRss, retrievePlaylist, retrieveFavsList } from '../../logic'
import { Route, withRouter, Redirect } from 'react-router-dom'

export default withRouter(function ({ history }) {
    const [error, setError] = useState()
    const [name, setName] = useState('')
    const [channels, setChannels] = useState([])
    const [channel, setChannel] = useState({})
    const [playlist, setPlaylist] = useState([])

    /* routing handles*/
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

    function handleOnClose() {
        setError(undefined)
    }

    useEffect(() => {
        const { token } = sessionStorage;

        (async () => {
            if (token) {
                const { name } = await retrieveUser(token)
                setName(name)
            }
        })()
    }, [sessionStorage.token], channels)

    async function retrieveUserPlaylist(token) {
        const playlist = await retrievePlaylist(token)
        setPlaylist(playlist)
    }

    async function retrieveChannels(token) {
        const channels = await listRss(token)
        setChannels(channels)
    }

    async function handleRegister(name, surname, email, username, password) {
        try {
            await registerUser(name, surname, email, username, password)

            history.push('/login')
        } catch (error) {
            const { message } = error
            setError(message)
        }
    }

    async function handleLogin(username, password) {
        try {
            const token = await authenticateUser(username, password)

            sessionStorage.token = token

            history.push('/player')
        } catch (error) {
            const { message } = error
            setError(message)
        }
    }

    async function handleAddRss(url) {
        try {
            const { token } = sessionStorage
            await createRss(token, url)
        } catch (error) {
            const { message } = error
            setError(message)
        }
    }

    async function handleListRss() {
        try {
            const { token } = sessionStorage
            const channels = await listRss(token)
            setChannels(channels)

        } catch (error) {
            const { message } = error
            setError(message)
        }
    }

    async function handleRssDetail(id) {
        try {
            const { token } = sessionStorage
            const channel = await retrieveRss(token, id)
            setChannel(channel)
            history.push(`/rssDetail/${id}`)
        } catch (error) {
            const { message } = error
            setError(message)
        }
    }

    async function handleFavsList() {
        try {
            const { token } = sessionStorage
            const favs = await retrieveFavsList(token)
            return favs
        } catch (error) {
            const { message } = error
            setError(message)
        }
    }

    //TODO
    async function handleAddToPlaylist(id) {
        try {
            console.log(id)
        } catch (error) {
            const { message } = error
            setError(message)
        }
    }

    const { token } = sessionStorage
    return <>
        <Route exact path="/" render={() => token ? <Redirect to="/player" /> : <Landing onRegister={handleGoToRegister} onLogin={handleGoToLogin} />} />
        <Route path="/register" render={() => token ? <Redirect to="/player" /> : <Register error={error} onClose={handleOnClose} onRegister={handleRegister} onBack={handleGoBack} />} />
        <Route path="/login" render={() => token ? <Redirect to="/player" /> : <Login error={error} onClose={handleOnClose} onLogin={handleLogin} onBack={handleGoBack} />} />
        <Route path="/player" render={() => <Player />} />
        <Route path="/favs" render={() => <Favs name={name} onFavsList={handleFavsList} />} />
        <Route path="/playlist" render={() => <Playlist name={name} playlist={playlist} />} />
        <Route path="/channels" render={() => <Channels onAddRss={handleAddRss} onListRss={handleListRss} channels={channels} onChannelDetail={handleRssDetail} />} />
        <Route path='/rssDetail/:id' render={props => token ? <RssDetail rssId={props.match.params.id} onAddToPlayList={handleAddToPlaylist} /> : <Redirect to='/' />} />

        {token && <FooterBar onPath={handleGoPath} onLogout={handleLogout} />}
    </>
})
