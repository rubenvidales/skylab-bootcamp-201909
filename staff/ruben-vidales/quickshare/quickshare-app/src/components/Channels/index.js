import React, { useState } from 'react'
import InputRange from 'react-input-range'
import "react-input-range/lib/css/index.css"
import './index.sass'
import FooterBar from '../FooterBar'

export default function ({ onPlayer, onPlaylist, onLogout }) {

    return <section className="channels">
        <div className="channels__container">
            <h2 className="channels__title">RSS Channels</h2>
            <form className="channels__form" action="#">
                <input type="text" className="channels__form-input" name="url" placeholder="RSS url" />
                <input className="channels__form-submit-button" type="submit" value="Add channel" />
            </form>
            <h3 className="channels__title">Added Channels</h3>
            <section className="channels__list">
                <a className=" channels__list-link">
                    <article className="channel">Channel name</article>
                </a>
                <a className=" channels__list-link">
                    <article className="channel">Channel name</article>
                </a>
                <a className=" channels__list-link">
                    <article className="channel">Channel name</article>
                </a>
                <a className=" channels__list-link">
                    <article className="channel">Channel name</article>
                </a>
                <a className=" channels__list-link">
                    <article className="channel">Channel name</article>
                </a>
                <a className=" channels__list-link">
                    <article className="channel">Channel name</article>
                </a>
                <a className=" channels__list-link">
                    <article className="channel">Channel name</article>
                </a>
                <a className=" channels__list-link">
                    <article className="channel">Channel name</article>
                </a>
                <a className=" channels__list-link">
                    <article className="channel">Channel name</article>
                </a>
                <a className=" channels__list-link">
                    <article className="channel">Channel name</article>
                </a>
            </section>
            <FooterBar onPlayer={onPlayer} onPlaylist={onPlaylist} onLogout={onLogout} />
        </div>
    </section>
}