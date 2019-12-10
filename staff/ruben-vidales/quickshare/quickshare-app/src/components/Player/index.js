import React, { useState, useEffect, useRef } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'
import './index.sass'
const { converter } = require('quickshare-util')

export default withRouter(function ({ history }) {
    const [error, setError] = useState()
    const [playerState, setPlayerState] = useState({
        position: 0,
        positionString: '00:00:00',
        durationString: '00:00:00',
        audioFile: "http://www.ivoox.com/4x03-de-organizarse-o-intentarlo_mf_44029972_feed_1.mp3",
        isPlaying: false,
        changingPosition: false
    })

    let refresher
    useEffect(() => {
        if (typeof refresher !== 'number') refresher = setInterval(() => {
            if (playerState.isPlaying) {
                setPlayerState(prevState => ({ ...prevState, position: playerState.position + 0.5 }))
            }
        }, 500);

        return () => { clearInterval(refresher) }
    }, [playerState])

    const handleChange = (event) => {
        event.persist()
        setPlayerState(prevState => ({ ...prevState, position: event.target.value, changingPosition: !playerState.changingPosition }))
    }

    const tooglePlay = () => {
        setPlayerState(prevState => ({ ...prevState, isPlaying: !playerState.isPlaying }))
    }

    const _player = useRef(null)
    useEffect(() => {
        const { current: player } = _player

        if (player.currentSrc !== playerState.audioFile) {
            player.src = playerState.audioFile
        }
        if (player.paused && !player.ended) {
            if (playerState.isPlaying) {
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
            playerState.position = parseInt(player.currentTime * 10000 / player.duration, 10)
            playerState.positionString = converter.secondsToString(parseInt(player.currentTime, 10))
        }
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
                <i className="player__top-share-icon fas fa-share-alt fa-3x"></i>
                <img className="player__top-image"
                    src="https://static-1.ivoox.com/canales/8/1/8/3/1141522943818_XXL.jpg" alt="podcast-img" />
                <i className="player__top-fav-icon far fa-heart fa-3x"></i>
            </header>
            <h2 className="player__title">Podcast title</h2>
            <h4 className="player__creator">Podcast creator</h4>
            <h4 className="player__date">22/11/2020</h4>
            <p className="player__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt,
                repudiandae consectetur voluptatem
                odio voluptas corporis maiores magnam aspernatur ullam, debitis amet temporibus quasi quaerat iusto
        sunt! Sunt facere odit dignissimos!</p>

            <div className="player__slider-block">
                <input type="range" min="0" max="10000" value={playerState.position} className="player__slider-bar"
                    id="myRange" onChange={(event) => handleChange(event)} />
                <span className="player__slider-current">{playerState.positionString}</span>
                <span className="player__slider-duration">{playerState.durationString}</span>
            </div>

            <div className="player__controls">
                <i className="player__controls-rew fas fa-chevron-circle-left fa-3x"></i>
                <i className={classnames(playerClsName)} onClick={(event) => {
                    event.preventDefault()
                    tooglePlay()
                }}></i>
                <i className="player__controls-ff fas fa-chevron-circle-right fa-3x"></i>
            </div>
        </div>
        <audio ref={_player} autoPlay={playerState.playing}>
            <source src={playerState.audioFile} />
        </audio>
    </section>
})



