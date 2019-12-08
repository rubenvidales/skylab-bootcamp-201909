import React from 'react'
import './index.sass'

export default function ({channel}) {
    console.log(channel)
    return <section class="rss">
    <div class="rss__container">
        <h2 class="rss__title">RSS Channel Title</h2>
        <h3 class="rss__url">http://www.url.com</h3>
        <p class="rss__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. At, vitae in odio
            ad distinctio unde nihil
            ipsa error quidem harum vero! Possimus ab porro omnis aut eum molestias animi illum.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At, vitae in odio
            ad distinctio unde nihil
            ipsa error quidem harum vero! Possimus ab porro omnis aut eum molestias animi illum.</p>
        <section class="rss__list">
            <a class="episodes__list-link">
                <article class="episode">
                    <div class="episode__left-block">
                        <h4 class="episode__title">Episode title</h4>
                        <p class="episode__date">04/12/2019</p>
                    </div>
                    <div class="episode__right-block">
                        <span class="episode__button-block">
                            <i class="fas fa-plus"></i>
                        </span>
                    </div>
                </article>
                <article class="episode">
                    <div class="episode__left-block">
                        <h4 class="episode__title">Episode title</h4>
                        <p class="episode__date">04/12/2019</p>
                    </div>
                    <div class="episode__right-block">
                        <span class="episode__button-block--delete">
                            <i class="fas fa-times"></i>
                        </span>
                    </div>
                </article>
                <article class="episode">
                    <div class="episode__left-block">
                        <h4 class="episode__title">Episode title</h4>
                        <p class="episode__date">04/12/2019</p>
                    </div>
                    <div class="episode__right-block">
                        <span class="episode__button-block">
                            <i class="fas fa-plus"></i>
                        </span>
                    </div>
                </article>
                <article class="episode">
                    <div class="episode__left-block">
                        <h4 class="episode__title">Episode title</h4>
                        <p class="episode__date">04/12/2019</p>
                    </div>
                    <div class="episode__right-block">
                        <span class="episode__button-block">
                            <i class="fas fa-plus"></i>
                        </span>
                    </div>
                </article>
                <article class="episode">
                    <div class="episode__left-block">
                        <h4 class="episode__title">Episode title</h4>
                        <p class="episode__date">04/12/2019</p>
                    </div>
                    <div class="episode__right-block">
                        <span class="episode__button-block">
                            <i class="fas fa-plus"></i>
                        </span>
                    </div>
                </article>
                <article class="episode">
                    <div class="episode__left-block">
                        <h4 class="episode__title">Episode title</h4>
                        <p class="episode__date">04/12/2019</p>
                    </div>
                    <div class="episode__right-block">
                        <span class="episode__button-block">
                            <i class="fas fa-plus"></i>
                        </span>
                    </div>
                </article>
                <article class="episode">
                    <div class="episode__left-block">
                        <h4 class="episode__title">Episode title</h4>
                        <p class="episode__date">04/12/2019</p>
                    </div>
                    <div class="episode__right-block">
                        <span class="episode__button-block">
                            <i class="fas fa-plus"></i>
                        </span>
                    </div>
                </article>
            </a>
        </section>
        <div class="footer">
            <span class="footer__option"><i class="fas fa-list-ul fa-2x"></i></span>
            <span class="footer__option"><i class="fas fa-heart fa-2x"></i></span>
            <span class="footer__option"><i class="fas fa-podcast fa-2x"></i></span>
            <span class="footer__option"><i class="far fa-edit fa-2x"></i></span>
            <span class="footer__option"><i class="fas fa-sign-out-alt fa-2x"></i></span>
        </div>
    </div>
</section>
}