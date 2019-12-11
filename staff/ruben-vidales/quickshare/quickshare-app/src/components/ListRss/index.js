import React from 'react'
import './index.sass'
import Rss from '../Rss'
import { withRouter } from 'react-router-dom'

export default withRouter(function ({ channels, rssId, onChannelDetail }) {
    return <>
        <h3 className="channels__title">Added Channels</h3>
        <ul className="channels__list">
            {channels.map(channel => <li key={channel.id} className="channels__list-link">
                <Rss channel={channel} rssId={rssId} onChannelDetail={onChannelDetail} />
            </li>)}
        </ul>
    </>
})