function EpisodeDetail ({ episodedetail: {season, episode, title, imageUrl, air_date, characters, overview}, onBackEpisodes, onBackSeasons }) {
    return <section className="episode-detail">
        <article className="episode-detail__bloc">
            <p className="episode-detail__description">Season {season}, Episode {episode}</p>
            <h3 className="episode-detail__title">{title}</h3>
            <img className="episode-detail__image" src={imageUrl}
                alt="episode detail image" />
            <p className="episode-detail__description">Air Date: {air_date}</p>
            <p className="episode-detail__description">Character List:</p>
            <ul className="episode-detail__description">{characters.map((character) => <li key={character} >{character}</li>)}</ul>
            <p className="episode-detail__description">{overview}</p>
        </article>
        <button className="register__goback" onClick={event => { // cambiar class
            event.preventDefault()
            onBackEpisodes() 
        }}>Go back to episodes</button>
        <button className="register__goback" onClick={event => { // cambiar class
            event.preventDefault()
            onBackSeasons()
        }}>Go back to seasons</button>
    </section>
}