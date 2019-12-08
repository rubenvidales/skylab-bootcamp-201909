import React from 'react'
import './index.sass'

export default function ({ channel, rssId, onChannelDetail }) {
    return <>
        <article className="channel" onClick={event => {
            event.preventDefault()
            onChannelDetail(channel.id)
        }}>
            {channel.title}</article>
    </>
}