import React, { useState, useEffect } from 'react'
import './index.sass'

export default function ({ name, onFavsList }) {

    const [favs, setFavs] = useState([])

    useEffect(() => {
        const { token } = sessionStorage;

        (async () => {
            if (token) {debugger
                const favs = await onFavsList(token)
                debugger
                setFavs(favs)
            }
        })()
    }, [sessionStorage.token])

    return <section className="favs">
        <div className="favs__container">
            {favs && favs.map(fav => <p>{fav.title}</p>)}
            <h2 className="favs__title">{name}'s favs</h2>
            <ul className="favs__list">
                
                <li className="fav-episode">
                    <div className="fav-episode__left-block">
                        <h3 className="fav-episode__title">Episode title</h3>
                        <h4 className="fav-episode__channel-title">Channel title</h4>
                        <p className="fav-episode__date">04/12/2019</p>
                    </div>
                    <div className="fav-episode__right-block">
                        <span className="fav-episode__right-block-buttons">
                            <i className="fav-episode__button fas fa-heart"></i>
                        </span>
                    </div>
                </li>
                <li className="fav-episode">
                    <div className="fav-episode__left-block">
                        <h3 className="fav-episode__title">Episode title</h3>
                        <h4 className="fav-episode__channel-title">Channel title</h4>
                        <p className="fav-episode__date">04/12/2019</p>
                    </div>
                    <div className="fav-episode__right-block">
                        <span className="fav-episode__right-block-buttons">
                            <i className="fav-episode__button fas fa-heart"></i>
                        </span>
                    </div>
                </li>
                <li className="fav-episode">
                    <div className="fav-episode__left-block">
                        <h3 className="fav-episode__title">Episode title</h3>
                        <h4 className="fav-episode__channel-title">Channel title</h4>
                        <p className="fav-episode__date">04/12/2019</p>
                    </div>
                    <div className="fav-episode__right-block">
                        <span className="fav-episode__right-block-buttons">
                            <i className="fav-episode__button fas fa-heart"></i>
                        </span>
                    </div>
                </li>
            </ul>
        </div>
    </section>

}