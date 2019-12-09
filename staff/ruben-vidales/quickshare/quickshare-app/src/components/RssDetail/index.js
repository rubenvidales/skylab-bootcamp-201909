import React, { useState, useEffect } from 'react'
import './index.sass'
import { retrieveRss, listPodcastsByRss, retrievePlaylist } from '../../logic'
import { Route, withRouter, Redirect } from 'react-router-dom'

export default withRouter(function ({ history, onAddToPlayList }) {
    const [channel, setChannel] = useState({})
    const [podcasts, setPodcasts] = useState([])
    const [playlist, setPlaylist] = useState([])
    useEffect(() => {
        (async () => {
            const { token } = sessionStorage
            if (token) {
                let channelId = history.location.pathname.split('/')[2]
                const pods = await listPodcastsByRss(token, channelId)
                setPodcasts(pods)

                const chan = await retrieveRss(token, channelId)
                setChannel(chan)

                const list = await retrievePlaylist(token)
                setPlaylist(list)
            }
        })()
    }, [sessionStorage.token])

    const { title, imageUrl, description } = channel

    return <section className="rss">
        <div className="rss__container">
            <h2 className="rss__title">{title}</h2>
            <img src={imageUrl} className="rss__image" alt="channel image" />
            <p className="rss__description">{description}</p>
            <section className="rss__list">
                <ul className="episodes__list">
                    {podcasts.map(podcast => {
                        const pubDate = new Date(podcast.publicationDate)
                        let day = pubDate.getDate().toString()
                        let month = (pubDate.getMonth() + 1).toString()
                        let year = pubDate.getFullYear()
                        month = month.length == 1 ? '0' + month : month
                        day = day.length == 1 ? '0' + day : day
                        const dateString = month + '/' + day + '/' + year

                        let podcastId = podcast.id

                        let addable = true
                        playlist.map(episode => {
                            if (episode.id == podcastId) {
                                addable = false
                            }
                        })

                        return <li key={podcast.id} className="episode">
                            <div className="episode__left-block">
                                <h4 className="episode__title">{podcast.title}</h4>
                                <p className="episode__date">{dateString}</p>
                            </div>
                            <div className="episode__right-block">
                                <span className="episode__button-block">
                                    {addable ? <i onClick={() => { onAddToPlayList(podcastId) }} className="fas fa-plus"></i> : null}
                                </span>
                            </div>
                        </li>
                    })}
                </ul>
            </section>
        </div>
    </section >
})