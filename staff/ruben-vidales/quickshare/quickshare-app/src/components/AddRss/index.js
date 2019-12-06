import React from 'react'
import "react-input-range/lib/css/index.css"
import './index.sass'

export default function ({ onAddRss }) {

    return <>
        <h2 className="channels__title">RSS Channels</h2>
        <form className="channels__form" onSubmit={event => {
            event.preventDefault()
            onAddRss()
        }}>
            <input type="text" className="channels__form-input" name="url" placeholder="RSS url" />
            <input className="channels__form-submit-button" type="submit" value="Add channel" />
        </form>
    </>
}