import React, { useState, useEffect } from 'react'
import "react-input-range/lib/css/index.css"
import './index.sass'
import FooterBar from '../FooterBar'

export default function ({ onRetrievePlaylist, onChannels, onPlayer, onPlaylist, onLogout }) {
 
    return <section className="playlist hide">
    <div className="playlist__container">
        <h2 className="playlist__title">Name's playlist</h2>
        <section className="playlist__list">
            <article className="pl-episode">
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
            </article>
            <article className="pl-episode">
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
            </article>
            <article className="pl-episode">
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
            </article>
            <article className="pl-episode">
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
            </article>
            <article className="pl-episode">
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
            </article>
            <article className="pl-episode">
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
            </article>
            <article className="pl-episode">
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
            </article>
            <article className="pl-episode">
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
            </article>
            <article className="pl-episode">
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
            </article>
            <article className="pl-episode">
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
            </article>
        </section>
        </div>
</section>

}