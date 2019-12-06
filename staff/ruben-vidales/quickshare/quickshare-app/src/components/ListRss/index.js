import React from 'react'
import "react-input-range/lib/css/index.css"
import './index.sass'

export default function ({ channels }) {
console.log(channels)
    return <>
        <h3 className="channels__title">Added Channels</h3>
        <section className="channels__list">
            <a className=" channels__list-link">
                <article className="channel">Channel name</article>
            </a>
            <a className=" channels__list-link">
                <article className="channel">Channel name</article>
            </a>
        </section>
    </>
}