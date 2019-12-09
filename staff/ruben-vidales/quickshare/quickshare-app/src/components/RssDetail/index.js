import React from 'react'
import './index.sass'

export default function ({channel}) {

console.log(channel)

    const {title, imageUrl, description} = channel
    //console.log(title, url, description)
    return <section className="rss">
    <div className="rss__container">
        <h2 className="rss__title">{title}</h2>
        <img src={imageUrl} className="rss__image" alt="channel image"/>
        <p className="rss__description">{description}</p>
        <section className="rss__list">
            <ul className="episodes__list">
                <li className="episode">
                    <div className="episode__left-block">
                        <h4 className="episode__title">Episode title</h4>
                        <p className="episode__date">04/12/2019</p>
                    </div>
                    <div className="episode__right-block">
                        <span className="episode__button-block">
                            <i className="fas fa-plus"></i>
                        </span>
                    </div>
                </li>
                <li className="episode">
                    <div className="episode__left-block">
                        <h4 className="episode__title">Episode title</h4>
                        <p className="episode__date">04/12/2019</p>
                    </div>
                    <div className="episode__right-block">
                        <span className="episode__button-block--delete">
                            <i className="fas fa-times"></i>
                        </span>
                    </div>
                </li>
                <li className="episode">
                    <div className="episode__left-block">
                        <h4 className="episode__title">Episode title</h4>
                        <p className="episode__date">04/12/2019</p>
                    </div>
                    <div className="episode__right-block">
                        <span className="episode__button-block">
                            <i className="fas fa-plus"></i>
                        </span>
                    </div>
                </li>
                <li className="episode">
                    <div className="episode__left-block">
                        <h4 className="episode__title">Episode title</h4>
                        <p className="episode__date">04/12/2019</p>
                    </div>
                    <div className="episode__right-block">
                        <span className="episode__button-block">
                            <i className="fas fa-plus"></i>
                        </span>
                    </div>
                </li>
                <li className="episode">
                    <div className="episode__left-block">
                        <h4 className="episode__title">Episode title</h4>
                        <p className="episode__date">04/12/2019</p>
                    </div>
                    <div className="episode__right-block">
                        <span className="episode__button-block">
                            <i className="fas fa-plus"></i>
                        </span>
                    </div>
                </li>
                <li className="episode">
                    <div className="episode__left-block">
                        <h4 className="episode__title">Episode title</h4>
                        <p className="episode__date">04/12/2019</p>
                    </div>
                    <div className="episode__right-block">
                        <span className="episode__button-block">
                            <i className="fas fa-plus"></i>
                        </span>
                    </div>
                </li>
                <li className="episode">
                    <div className="episode__left-block">
                        <h4 className="episode__title">Episode title</h4>
                        <p className="episode__date">04/12/2019</p>
                    </div>
                    <div className="episode__right-block">
                        <span className="episode__button-block">
                            <i className="fas fa-plus"></i>
                        </span>
                    </div>
                </li>
            </ul>
        </section>
        <div className="footer">
            <span className="footer__option"><i className="fas fa-list-ul fa-2x"></i></span>
            <span className="footer__option"><i className="fas fa-heart fa-2x"></i></span>
            <span className="footer__option"><i className="fas fa-podcast fa-2x"></i></span>
            <span className="footer__option"><i className="far fa-edit fa-2x"></i></span>
            <span className="footer__option"><i className="fas fa-sign-out-alt fa-2x"></i></span>
        </div>
    </div>
</section>
}