/**
 * show detail of episodes
 * @param {integer} season The season that the episode belongs to
 * @param {integer} episode The episode number of it's season
 * @param {string} title The title of the episode
 * @param {string} imageUrl data of another api: image of episode
 * @param {string} air_date The original air date of the episode
 * @param {array} characters Main characters that are associated with the episode
 * @param {string} overview data of another api: summary of episode
 * @param {function} onBackEpisodes event to return on list epidodes
 * @param {function} onBackSeasons event to return list season
 */

 function EpisodeDetail({ episodedetail: { season, episode, title, imageUrl, air_date, characters, overview }, onBackEpisodes, onBackSeasons }) {
    return <section className="episode-detail">
        <button className="register__goback" onClick={event => { // cambiar class
            event.preventDefault()
            onBackEpisodes()
        }}>Go back to episodes</button>
        <button className="register__goback" onClick={event => { // cambiar class
            event.preventDefault()
            onBackSeasons()
        }}>Go back to seasons</button>
        <article className="episode-detail__bloc">
            <p className="episode-detail__description">Season {season} Episode {episode}</p>
            <h3 className="episode-detail__title">{title}</h3>
            <img className="episode-detail__image" src={imageUrl}
                alt="episode detail image" />
            <p className="episode-detail__description">Air Date: {air_date}</p>
            <p className="episode-detail__description">Character List:</p>
            <ul className="episode-detail__description">{characters.map((character) => <li key={character} >{character}</li>)}</ul>
            <p className="episode-detail__description">{overview}</p>
        </article>
    </section>
}