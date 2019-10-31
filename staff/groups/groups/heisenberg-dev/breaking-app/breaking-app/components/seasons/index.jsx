function Seasons({ seasons, goToSeason, onBackHome }) {
    return <section className="seasons">
        <button className="register__goback" onClick={event => { // cambiar class
            event.preventDefault()
            onBackHome()
        }}>Go back to Search</button>
        <h2 className="seasons__title">Seasons</h2>
        <ul className="seasons__list">
            {seasons.map(season => <Season key={season} season={season} goToSeason={goToSeason} />)}
        </ul>
    </section>
}

function Season({ season: { number, air_date, imageUrl, overview }, goToSeason }) {
    return <li className="seasons__list-item">
        <article className="season" onClick={event => {
            event.preventDefault()
            goToSeason(number.toString())
        }}>
            <h3 className="season__title">Season {number}</h3>
            <p className="season__description">Air date: {air_date}<br /><br />{overview}</p>
            <img className="season__image" src={imageUrl}
                alt="season image" />
        </article>
    </li>
}