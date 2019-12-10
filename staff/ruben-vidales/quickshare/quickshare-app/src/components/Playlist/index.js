import React, { useState, useEffect } from 'react'
import './index.sass'
import { retrieveRss, listPodcastsByRss, retrievePlaylist } from '../../logic'
import { Route, withRouter, Redirect } from 'react-router-dom'

export default withRouter(function ({ history, name, onDeleteFromPlaylist, onReoder }) {
    const [render, setRender] = useState(true)
    const [playlist, setPlaylist] = useState([])
    useEffect(() => {
        const { token } = sessionStorage;

        (async () => {
            if (token) {
                const list = await retrievePlaylist(token)
                setPlaylist(list)
            }
        })()
    }, [sessionStorage.token, render])

    return <section className="playlist">
        <div className="playlist__container">
            <h2 className="playlist__title">{name}'s playlist</h2>
            <ul className="playlist__list">
                {playlist.map(episode => {
                    const pubDate = new Date(episode.publicationDate)
                    let day = pubDate.getDate().toString()
                    let month = (pubDate.getMonth() + 1).toString()
                    let year = pubDate.getFullYear()
                    month = month.length == 1 ? '0' + month : month
                    day = day.length == 1 ? '0' + day : day
                    const dateString = month + '/' + day + '/' + year

                    return <li key={episode.id} className="pl-episode">
                        <div className="pl-episode__left-block">
                            <h4 className="pl-episode__title">{episode.title}</h4>
                            <p className="pl-episode__date">{dateString}</p>
                        </div>
                        <div className="pl-episode__right-block">
                            <span className="pl-episode__right-block-buttons">
                                <i className="pl-episode__button fas fa-chevron-up" onClick={() => {onReoder(episode.id, 1); setRender(!render);}}></i>
                                <i className="pl-episode__button fas fa-chevron-down" onClick={() => {onReoder(episode.id, -1); setRender(!render);}}></i>
                                <i className="pl-episode__button fas fa-times" onClick={() => { onDeleteFromPlaylist(episode.id); setRender(!render); } }></i>
                            </span>
                        </div>
                    </li>
                })}
            </ul>
        </div>
    </section>

})