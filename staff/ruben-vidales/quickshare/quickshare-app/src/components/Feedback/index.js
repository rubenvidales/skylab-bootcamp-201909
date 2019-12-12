import React from 'react'
import './index.sass'

export default function ({ message, onClose }) {
    return <section className="feedback">
        <div class="feedback__cross-block">
            <i className="feedback__cross-icon fas fa-times fa-3x" onClick={event => {
                event.preventDefault()
                onClose()
            }}>
            </i>
        </div>
        <p className="feedback__message">{message}</p>
    </section>
}