import React, { useState } from 'react'
import InputRange from 'react-input-range'
import "react-input-range/lib/css/index.css"
import './index.sass'

export default function ({ onChannels, onPlaylist, onLogout }) {

    const [ rangeValue, setRangeValue ] = useState(50)

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
            
            {/* <div className="player__slider-block">
                <input type="range" min="1" max="100" defaultValue="20" className="player__slider-bar" id="myRange" />
            </div> */}
            <div className="player__slider-block">
                <InputRange
                    maxValue={100}
                    minValue={0}
                    value={rangeValue}
                    onChange={value => setRangeValue(value)} />
            </div>
            <div className="player__controls">
                <i className="player__controls-rew fas fa-chevron-circle-left fa-3x"></i>
                <i className="player__controls-play fas fa-play-circle fa-5x"></i>
                <i className="player__controls-ff fas fa-chevron-circle-right fa-3x"></i>
            </div>
        </div>
    </section>
}