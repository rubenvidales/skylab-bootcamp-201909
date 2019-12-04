import React, { useState } from 'react'
import './index.sass'

export default function ({ onLogout }) {
    return <section className="footer">
        <span className="footer__option"><i className="fas fa-list-ul fa-2x"></i></span>
        <span className="footer__option"><i className="fas fa-heart fa-2x"></i></span>
        <span className="footer__option"><i className="fas fa-podcast fa-2x"></i></span>
        <span className="footer__option"><i className="far fa-edit fa-2x"></i></span>
        <span className="footer__option"><i className="fas fa-sign-out-alt fa-2x" onClick={event => {
            event.preventDefault()
            onLogout()
        }}></i></span>
    </section>
}