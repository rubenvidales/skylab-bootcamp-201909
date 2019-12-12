import React, { useState, useEffect } from 'react'
import "react-input-range/lib/css/index.css"
import './index.sass'
import AddRss from '../AddRss'
import ListRss from '../ListRss'
import { listRss } from '../../logic'

export default function ({ onAddRss, channels, rssId, onChannelDetail }) {
    const [_channels, setChannels] = useState([])
    useEffect(() => {
        const { token } = sessionStorage;

        (async () => {
            if (token) {
                const _channels = await listRss(token)
                setChannels(_channels)
            }
        })()
    }, [channels])
    return <section className="channels">
        <div className="channels__container">
            <AddRss onAddRss={onAddRss} />
            <ListRss channels={_channels} rssId={rssId} onChannelDetail={onChannelDetail} />
        </div>
    </section>
}