import React, { useState } from 'react'
import './index.sass'

export default function ({ onChannels, onPlayer, onPlaylist, onLogout }) {
    return <section className="footer">
        <span className="footer__option" onClick={event => {
            event.preventDefault()
            onPlaylist()
        }}><i className="fas fa-list-ul fa-2x"></i></span>
        <span className="footer__option"><i className="fas fa-heart fa-2x"></i></span>
        <span className="footer__option" onClick={event => {
            event.preventDefault()
            onPlayer()
        }}><i className="far fa-play-circle fa-3x"></i></span>
        <span className="footer__option" onClick={event => {
            event.preventDefault()
            onChannels()
        }}><i className="fas fa-podcast fa-2x"></i></span>
        <span className="footer__option" onClick={event => {
            event.preventDefault()
            onLogout()
        }}><i className="fas fa-sign-out-alt fa-2x"></i></span>
    </section>
}