import React from 'react'
import './index.sass'

export default function ({ handleGoToRegistrationPage }) {
    return <section className="landing">
                <article className="landing__container container">
                <h2 className="container__title">Time2Padel</h2>
                    <div className="container__images images" onClick={event => {
                        event.preventDefault()

                        handleGoToRegistrationPage()
                        }}>
                        <img className="images__img1" src={process.env.PUBLIC_URL + '/img/iconopalapadel.png'}/>
                        <img className="images__img2" src={process.env.PUBLIC_URL + '/img/iconopelotapadel.png'}/>
                    </div>
                </article>
            </section>  
}