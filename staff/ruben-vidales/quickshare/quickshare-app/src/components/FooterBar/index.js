import React, { useState, useEffect } from 'react'
import config from './config'
import './index.sass'
import { withRouter } from 'react-router-dom'

export default withRouter(function ({ history, onPath, onLogout }) {

    const [view, setViews] = useState([true, true, false, true])

    useEffect(() => {
        const { pathname } = history.location

        config.forEach(elem => {
            if(pathname === elem.path) {
                const visibility = elem.visibility
                let arr = []
            
                for (const vis in visibility) {
                    arr.push(visibility[vis])
                }
                setViews(arr)
            }
        })
    }, [history.location])

    return <section className="footer">
        {
            config.map((elem, index) => {
                return view[index] && <span key={elem.name} className="footer__option" onClick={event => {
                    event.preventDefault()
                    onPath(elem.path)
                }}><i className={elem.icon}></i></span>
            })
        }
        <span className="footer__option" onClick={event => {
            event.preventDefault()
            onLogout()
        }}><i className="fas fa-sign-out-alt fa-2x"></i></span>
    </section>
})