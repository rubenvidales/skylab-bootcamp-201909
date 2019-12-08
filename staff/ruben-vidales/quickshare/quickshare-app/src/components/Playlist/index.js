import React from 'react'
import './index.sass'

export default function ({ name, playlist }) {
    return <section className="playlist">
        <div className="playlist__container">
            <h2 className="playlist__title">{name}'s playlist</h2>
            <ul className="playlist__list">
{/*TODO: maquetar episodios añadidos a favoritos*/}
                {playlist.map(episode => <li>episode.title</li>)}
                <li className="pl-episode">
                    <div className="pl-episode__left-block">
                        <h4 className="pl-episode__title">Episode title</h4>
                        <p className="pl-episode__date">04/12/2019</p>
                    </div>
                    <div className="pl-episode__right-block">
                        <span className="pl-episode__right-block-buttons">
                            <i className="pl-episode__button fas fa-chevron-up"></i>
                            <i className="pl-episode__button fas fa-chevron-down"></i>
                            <i className="pl-episode__button far fa-trash-alt"></i>
                        </span>
                    </div>
                </li>
                <li className="pl-episode">
                    <div className="pl-episode__left-block">
                        <h4 className="pl-episode__title">Episode title</h4>
                        <p className="pl-episode__date">04/12/2019</p>
                    </div>
                    <div className="pl-episode__right-block">
                        <span className="pl-episode__right-block-buttons">
                            <i className="pl-episode__button fas fa-chevron-up"></i>
                            <i className="pl-episode__button fas fa-chevron-down"></i>
                            <i className="pl-episode__button far fa-trash-alt"></i>
                        </span>
                    </div>
                </li>
                <li className="pl-episode">
                    <div className="pl-episode__left-block">
                        <h4 className="pl-episode__title">Episode title</h4>
                        <p className="pl-episode__date">04/12/2019</p>
                    </div>
                    <div className="pl-episode__right-block">
                        <span className="pl-episode__right-block-buttons">
                            <i className="pl-episode__button fas fa-chevron-up"></i>
                            <i className="pl-episode__button fas fa-chevron-down"></i>
                            <i className="pl-episode__button far fa-trash-alt"></i>
                        </span>
                    </div>
                </li>
                <li className="pl-episode">
                    <div className="pl-episode__left-block">
                        <h4 className="pl-episode__title">Episode title</h4>
                        <p className="pl-episode__date">04/12/2019</p>
                    </div>
                    <div className="pl-episode__right-block">
                        <span className="pl-episode__right-block-buttons">
                            <i className="pl-episode__button fas fa-chevron-up"></i>
                            <i className="pl-episode__button fas fa-chevron-down"></i>
                            <i className="pl-episode__button far fa-trash-alt"></i>
                        </span>
                    </div>
                </li>
            </ul>
        </div>
    </section>

}