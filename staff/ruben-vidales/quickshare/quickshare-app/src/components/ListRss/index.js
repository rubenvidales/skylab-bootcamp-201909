import React from 'react'
import "react-input-range/lib/css/index.css"
import './index.sass'

export default function ({ channels }) {
    return <>
        <h3 className="channels__title">Added Channels</h3>
        <section className="channels__list">
            {channels.map(channel => <a className=" channels__list-link"><article className="channel">{channel.title}</article></a>)}
        </section>
    </>
}