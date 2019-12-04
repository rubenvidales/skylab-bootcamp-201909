import React, { useState } from 'react'
import InputRange from 'react-input-range'
import "react-input-range/lib/css/index.css"
import './index.sass'
import FooterBar from '../FooterBar'

export default function ({ onPlaylist, onLogout }) {

    return <section class="playlist hide">
    <div class="playlist__container">
        <h2 class="playlist__title">Name's playlist</h2>
        <section class="playlist__list">
            <article class="pl-episode">
                <div class="pl-episode__left-block">
                    <h4 class="pl-episode__title">Episode title</h4>
                    <p class="pl-episode__date">04/12/2019</p>
                </div>
                <div class="pl-episode__right-block">
                    <span class="pl-episode__right-block-buttons">
                        <i class="pl-episode__button fas fa-chevron-up"></i>
                        <i class="pl-episode__button fas fa-chevron-down"></i>
                        <i class="pl-episode__button far fa-trash-alt"></i>
                    </span>
                </div>
            </article>
            <article class="pl-episode">
                <div class="pl-episode__left-block">
                    <h4 class="pl-episode__title">Episode title</h4>
                    <p class="pl-episode__date">04/12/2019</p>
                </div>
                <div class="pl-episode__right-block">
                    <span class="pl-episode__right-block-buttons">
                        <i class="pl-episode__button fas fa-chevron-up"></i>
                        <i class="pl-episode__button fas fa-chevron-down"></i>
                        <i class="pl-episode__button far fa-trash-alt"></i>
                    </span>
                </div>
            </article>
            <article class="pl-episode">
                <div class="pl-episode__left-block">
                    <h4 class="pl-episode__title">Episode title</h4>
                    <p class="pl-episode__date">04/12/2019</p>
                </div>
                <div class="pl-episode__right-block">
                    <span class="pl-episode__right-block-buttons">
                        <i class="pl-episode__button fas fa-chevron-up"></i>
                        <i class="pl-episode__button fas fa-chevron-down"></i>
                        <i class="pl-episode__button far fa-trash-alt"></i>
                    </span>
                </div>
            </article>
            <article class="pl-episode">
                <div class="pl-episode__left-block">
                    <h4 class="pl-episode__title">Episode title</h4>
                    <p class="pl-episode__date">04/12/2019</p>
                </div>
                <div class="pl-episode__right-block">
                    <span class="pl-episode__right-block-buttons">
                        <i class="pl-episode__button fas fa-chevron-up"></i>
                        <i class="pl-episode__button fas fa-chevron-down"></i>
                        <i class="pl-episode__button far fa-trash-alt"></i>
                    </span>
                </div>
            </article>
            <article class="pl-episode">
                <div class="pl-episode__left-block">
                    <h4 class="pl-episode__title">Episode title</h4>
                    <p class="pl-episode__date">04/12/2019</p>
                </div>
                <div class="pl-episode__right-block">
                    <span class="pl-episode__right-block-buttons">
                        <i class="pl-episode__button fas fa-chevron-up"></i>
                        <i class="pl-episode__button fas fa-chevron-down"></i>
                        <i class="pl-episode__button far fa-trash-alt"></i>
                    </span>
                </div>
            </article>
            <article class="pl-episode">
                <div class="pl-episode__left-block">
                    <h4 class="pl-episode__title">Episode title</h4>
                    <p class="pl-episode__date">04/12/2019</p>
                </div>
                <div class="pl-episode__right-block">
                    <span class="pl-episode__right-block-buttons">
                        <i class="pl-episode__button fas fa-chevron-up"></i>
                        <i class="pl-episode__button fas fa-chevron-down"></i>
                        <i class="pl-episode__button far fa-trash-alt"></i>
                    </span>
                </div>
            </article>
            <article class="pl-episode">
                <div class="pl-episode__left-block">
                    <h4 class="pl-episode__title">Episode title</h4>
                    <p class="pl-episode__date">04/12/2019</p>
                </div>
                <div class="pl-episode__right-block">
                    <span class="pl-episode__right-block-buttons">
                        <i class="pl-episode__button fas fa-chevron-up"></i>
                        <i class="pl-episode__button fas fa-chevron-down"></i>
                        <i class="pl-episode__button far fa-trash-alt"></i>
                    </span>
                </div>
            </article>
            <article class="pl-episode">
                <div class="pl-episode__left-block">
                    <h4 class="pl-episode__title">Episode title</h4>
                    <p class="pl-episode__date">04/12/2019</p>
                </div>
                <div class="pl-episode__right-block">
                    <span class="pl-episode__right-block-buttons">
                        <i class="pl-episode__button fas fa-chevron-up"></i>
                        <i class="pl-episode__button fas fa-chevron-down"></i>
                        <i class="pl-episode__button far fa-trash-alt"></i>
                    </span>
                </div>
            </article>
            <article class="pl-episode">
                <div class="pl-episode__left-block">
                    <h4 class="pl-episode__title">Episode title</h4>
                    <p class="pl-episode__date">04/12/2019</p>
                </div>
                <div class="pl-episode__right-block">
                    <span class="pl-episode__right-block-buttons">
                        <i class="pl-episode__button fas fa-chevron-up"></i>
                        <i class="pl-episode__button fas fa-chevron-down"></i>
                        <i class="pl-episode__button far fa-trash-alt"></i>
                    </span>
                </div>
            </article>
            <article class="pl-episode">
                <div class="pl-episode__left-block">
                    <h4 class="pl-episode__title">Episode title</h4>
                    <p class="pl-episode__date">04/12/2019</p>
                </div>
                <div class="pl-episode__right-block">
                    <span class="pl-episode__right-block-buttons">
                        <i class="pl-episode__button fas fa-chevron-up"></i>
                        <i class="pl-episode__button fas fa-chevron-down"></i>
                        <i class="pl-episode__button far fa-trash-alt"></i>
                    </span>
                </div>
            </article>
        </section>
        <FooterBar onPlaylist={onPlaylist} onLogout={onLogout}/>
    </div>
</section>

}