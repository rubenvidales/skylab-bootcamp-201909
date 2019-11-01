/**
 * 
 * @param {string} episodes quantity of episodes
 * @param {function} goToEpisode event to show view episode
 * @param {function} onBackSeasons event to return back seasons
 * @param {function} onBackHome event to return view home
 */

 function EpisodesList({ episodes, goToEpisode, onBackSeasons, onBackHome }) {
    return <section className="episodes">
        <button className="episodes__goback-seasons" onClick={event => { 
            event.preventDefault()
            onBackSeasons()
        }}>Go back to Seasons</button>
        <button className="episodes__goback-home" onClick={event => { 
            event.preventDefault()
            onBackHome()
        }}>Go back to Search</button>
        <h2 className="episodes__title">Episodes</h2>
        <ul className="episodes__list">
            {episodes.map(episode => <Episodes key={episode.episode_id} episode={episode} goToEpisode={goToEpisode} />)}
        </ul>
    </section>
}

function Episodes({ episode: { episode_id, title, episode, imageUrl, overview }, goToEpisode }) {
    return <li className="episodes__list-item">
        <article className="episode" onClick={event => {
            event.preventDefault()
            goToEpisode(episode_id.toString())
        }}>
            <p className="episode__description">Episode {episode}</p>
            <h3 className="episode__title">{title}</h3>
            <img className="episode__image" src={imageUrl} alt="episode image" />
            <p className="episode__description">{overview}</p>
        </article>
    </li>
}