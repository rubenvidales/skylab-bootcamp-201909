import React from 'react';
import './index.sass'
import Landing from '../Landing'
import Register from '../Register'
import Login from '../Login'
import Player from '../Player'
import { registerUser, authenticateUser } from '../../logic'
import { Route, withRouter, Redirect } from 'react-router-dom'

export default withRouter(function ({ history }) {
    const { token } = sessionStorage

    function handleGoToRegister() { history.push('/register') }
    function handleGoToLogin() { history.push('/login') }
    function handleGoBack() { history.push('/') }

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


    return <>
        <Route exact path="/" render={() => token ? <Redirect to="/player" /> : <Landing onRegister={handleGoToRegister} onLogin={handleGoToLogin} />} />
        <Route path="/register" render={() => token ? <Redirect to="/player" /> : <Register onRegister={handleRegister} onBack={handleGoBack} />} />
        <Route path="/login" render={() => token ? <Redirect to="/player" /> : <Login onLogin={handleLogin} onBack={handleGoBack} />} />
        <Route path="/player" render={() => <Player onLogout={handleLogout} />} />
    </>
})
