import React from 'react'
import './index.sass'
import Rss from '../Rss'
import { registerUser, authenticateUser, retrieveUser, createRss, listRss, retrieveRss, retrievePlaylist, retrieveFavsList } from '../../logic'
import { Route, withRouter, Redirect } from 'react-router-dom'

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