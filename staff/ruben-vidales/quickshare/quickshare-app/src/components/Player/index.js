import React, { Component } from 'react'
import './index.sass'
const { converter } = require('quickshare-util')

class Player extends Component {
    //export default withRouter(function ({ history }) {
    //export default function ({ onChannels, onPlaylist, onLogout }) {
    constructor() {
        super()

        this.state = {
            position: 0,
            positionString: '00:00:00',
            durationString: '00:00:00',
            audioFile: "http://www.ivoox.com/4x03-de-organizarse-o-intentarlo_mf_44029972_feed_1.mp3",
            is_playing: false,
            changing_position: false
        };
    }

    handleChange = (event) => {
        this.setState({position: event.target.value})
        this.setState({changing_position: !this.state.changing_position})
    }

    tooglePlay() {
        this.setState({ is_playing: !this.state.is_playing })
    }

    render() {
        if (this.refs.player) {
            var player = this.refs.player
            if (player.currentSrc !== this.state.audioFile) {
                player.src = this.state.audioFile
            }
            if (player.paused) {
                if (this.state.is_playing) {
                    player.play()
                    this.setState({durationString: converter.secondsToString(parseInt(player.duration,10))})
                }
            }
            else if (!this.state.is_playing) {
                player.pause()
            }

            if (this.state.changing_position) {
                this.setState({
                    changing_position: !this.state.changing_position
                })
                player.currentTime = parseInt(player.duration * this.state.position / 10000, 10)
            }
    
            if( this.state.is_playing ){
                this.state.position = parseInt(player.currentTime * 10000 / player.duration, 10)
                this.state.positionString = converter.secondsToString(parseInt(player.currentTime,10))
            }  
        }

        const playerClsName = {
            "player__controls-play": true,
            "fa-5x": true,
            "fas": true,
            "fa-play-circle": !this.state.is_playing,
            "fa-pause-circle": this.state.is_playing
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
                    <input type="range" min="0" max="10000" value={this.state.position} className="player__slider-bar" 
                    id="myRange" onChange={this.handleChange}/>
                    <span className="player__slider-current">{this.state.positionString}</span>
                    <span className="player__slider-duration">{this.state.durationString}</span>
                </div>

                <div className="player__controls">
                    <i className="player__controls-rew fas fa-chevron-circle-left fa-3x"></i>
                    <i className={classnames(playerClsName)} onClick={
                        this.tooglePlay.bind(this)
                    }></i>
                    <i className="player__controls-ff fas fa-chevron-circle-right fa-3x"></i>
                </div>
            </div>
            <audio ref="player" autoPlay={this.state.playing}>
                <source src={this.state.audioFile} />
            </audio>
        </section>
    }
}

function classnames(obj) {
    var css = []
    Object.keys(obj).forEach((key) => {
        if (obj[key]) {
            css.push(key)
        }
    })
    return css.join(' ')
}

export default Player;