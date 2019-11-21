import React, { useState, useEffect } from 'react';
import './index.sass'
import Landing from '../Landing'
import Register from '../Register'
import Login from '../Login'
import Board from '../Board'
import { Route, withRouter } from 'react-router-dom'
import { authenticateUser, registerUser, retrieveUser } from '../../logic'

export default withRouter(function ({ history }) {
    const [name, setName] = useState()

    useEffect(() => {
        const { token } = sessionStorage;
        
        (async () => {
            if (token) {
                const { name } = await retrieveUser(token)
        
                setName(name)
            }
        })()
    }, [sessionStorage.token])

    function handleGoToRegister() { history.push('/register') }

    function handleGoToLogin() { history.push('/login') }

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

            history.push('/tasks')
        } catch (error) {
            console.error(error)
        }
    }

    function handleGoBack() { history.push('/') }

    function handleLogout() {
        sessionStorage.clear()

        handleGoBack()
    }

    return <>
        <Route exact path='/' render={() => <Landing onRegister={handleGoToRegister} onLogin={handleGoToLogin} />} />
        <Route path="/register" render={() => <Register onRegister={handleRegister} onBack={handleGoBack} />} />
        <Route path="/login" render={() => <Login onLogin={handleLogin} onBack={handleGoBack} />} />
        <Route path="/tasks" render={() => <Board user={name} onLogout={handleLogout}/>} />
    </>
})
