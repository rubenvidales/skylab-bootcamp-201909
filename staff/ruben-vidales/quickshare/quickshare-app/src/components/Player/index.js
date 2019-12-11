import React, { useState, useEffect, useRef } from 'react'
import { withRouter } from 'react-router-dom'
import './index.sass'
import Feedback from '../Feedback'
const { converter } = require('quickshare-util')

export default withRouter(function ({ error, onClose, onModifyCurrent, onRetrieveChannel, onRetrievePlayer, onRetreivePodcast }) {
    const [playerState, setPlayerState] = useState({
        position: 0,
        current: 0,
        positionString: '00:00:00',
        durationString: '00:00:00',
        audioFile: '',
        podcastId: '',
        podcastTitle: '',
        podcastImage: '',
        publicationDate: '',
        podcastDescription: '',
        isPlaying: false,
        changingPosition: false,
        playlist: []
    })

    useEffect(() => {
        async function init() {
            const { currentEpisode: { position, podcast }, playlist } = await onRetrievePlayer()
            const { title, url, duration, publicationDate, description, rssChannel } = await onRetreivePodcast(podcast)
            const channel = await onRetrieveChannel(rssChannel)
            const a = await converter.secondsToString(parseInt(duration))

            const pubDate = new Date(publicationDate)
            let day = pubDate.getDate().toString()
            let month = (pubDate.getMonth() + 1).toString()
            let year = pubDate.getFullYear()
            month = month.length === 1 ? '0' + month : month
            day = day.length === 1 ? '0' + day : day
            const dateString = month + '/' + day + '/' + year

            setPlayerState(prevState => ({ ...prevState, playlist: playlist, position: (position * 10000 / duration), positionString: converter.secondsToString(parseInt(position, 10)), durationString: a, current: position, podcastId: podcast }))
            setPlayerState(prevState => ({ ...prevState, podcastImage: channel.imageUrl, podcastTitle: title, audioFile: url, publicationDate: dateString, podcastDescription: description }))
        }
        init()
    }, [])

    const changeEpisode = async (movement) => {
        setPlayerState(prevState => ({ ...prevState, isPlaying: false }))
        let _playlist = playerState.playlist
        const index = _playlist.findIndex(_podcastId => _podcastId === playerState.podcastId)

        let newPosition = index + movement

        if ((newPosition >= 0) && (newPosition < _playlist.length)) {

            const { id, title, url, description, rssChannel } = await onRetreivePodcast(_playlist[newPosition])
            const channel = await onRetrieveChannel(rssChannel)

            setPlayerState(prevState => ({ ...prevState, podcastImage: channel.imageUrl, position: 0, current: 0, audioFile: url, podcastId: id, podcastTitle: title, podcastDescription: description, positionString: '00:00:00', durationString: '00:00:00' }))
        }
    }

    const handleChange = (event) => {
        event.persist()
        setPlayerState(prevState => ({ ...prevState, position: event.target.value, changingPosition: !playerState.changingPosition }))
    }

    const tooglePlay = () => {
        setPlayerState(prevState => ({ ...prevState, isPlaying: !playerState.isPlaying }))
    }

    let refresher
    const _player = useRef(null)
    useEffect(() => {
        const { current: player } = _player

        if (player.currentSrc !== playerState.audioFile) {
            player.src = playerState.audioFile
        }
        if (player.paused && !player.ended) {
            if (playerState.isPlaying) {
                if (playerState.position > 0) {
                    player.currentTime = parseInt((player.duration * playerState.position / 10000), 10)
                }
                else {
                    playerState.currentTime = 0
                }
                player.play()
                setPlayerState(prevState => ({ ...prevState, durationString: converter.secondsToString(parseInt(player.duration, 10)) }))
            }
        }
        else if (!playerState.isPlaying) {
            player.pause()
        }

        if (playerState.changingPosition) {
            setPlayerState(prevState => ({ ...prevState, changingPosition: !playerState.changingPosition }))
            player.currentTime = parseInt(player.duration * playerState.position / 10000, 10)
        }

        if (playerState.isPlaying) {
            playerState.position = parseInt(player.currentTime * 10000 / player.duration)
            playerState.positionString = converter.secondsToString(parseInt(player.currentTime, 10))
        }

        //Refresh
        if (typeof refresher !== 'number') refresher = setInterval(() => {
            (async () => {
                const timeToSave = converter.stringToSeconds(playerState.positionString)
                onModifyCurrent(playerState.podcastId, timeToSave, undefined)
                if (playerState.isPlaying) {
                    setPlayerState(prevState => ({ ...prevState, position: playerState.position + 1 }))
                }
            })()
        }, 1000);
        return () => { clearInterval(refresher) }

    }, [playerState])

    const playerClsName = {
        "player__controls-play": true,
        "fa-5x": true,
        "fas": true,
        "fa-play-circle": !playerState.isPlaying,
        "fa-pause-circle": playerState.isPlaying
    }

    const classnames = (obj) => {
        var css = []
        Object.keys(obj).forEach((key) => {
            if (obj[key]) {
                css.push(key)
            }
        })
        return css.join(' ')
    }

    return <section className="player">
        <div className="player__container">
            <header className="player__top">
                {/* <i className="player__top-share-icon fas fa-share-alt fa-3x"></i> */}
                <img className="player__top-image"
                    src={playerState.podcastImage} alt="podcast-img" />
                {/* <i className="player__top-fav-icon far fa-heart fa-3x"></i> */}
            </header>
            <h2 className="player__title">{playerState.podcastTitle}</h2>
            <h4 className="player__date">{playerState.publicationDate}</h4>
            <p className="player__description">{playerState.podcastDescription}</p>

            <div className="player__slider-block">
                <input type="range" min="0" max="10000" value={playerState.position} className="player__slider-bar"
                    id="myRange" onChange={(event) => handleChange(event)} />
                <span className="player__slider-current">{playerState.positionString}</span>
                <span className="player__slider-duration">{playerState.durationString}</span>
            </div>

            <div className="player__controls">
                <i className="player__controls-rew fas fa-chevron-circle-left fa-3x" onClick={(event) => {
                    event.preventDefault()
                    changeEpisode(-1)
                }
                }></i>
                <i className={classnames(playerClsName)} onClick={(event) => {
                    event.preventDefault()
                    tooglePlay()
                }}></i>
                <i className="player__controls-ff fas fa-chevron-circle-right fa-3x" onClick={(event) => {
                    event.preventDefault()
                    changeEpisode(+1)
                }
                }></i>
            </div>
        </div>
        <audio ref={_player} autoPlay={playerState.playing}>
            <source src={playerState.audioFile} />
        </audio>
        {error && <Feedback message={error} onClose={onClose} />}
    </section>
})



