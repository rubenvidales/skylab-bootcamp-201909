function EpisodesList({ episodes, goToEpisode, onBackSeasons, onBackHome }) {
    return <section className="episodes">
        <h2 className="episodes__title">Episodes</h2>
        <ul className="episodes__list">
            {episodes.map(episode => <Episodes key={episode.episode_id} episode={episode} goToEpisode={goToEpisode} />)}
        </ul>
        <button className="register__goback" onClick={event => { // cambiar class
            event.preventDefault()
            onBackSeasons()
        }}>Go back to seasons</button>
        <button className="register__goback" onClick={event => { // cambiar class
            event.preventDefault()
            onBackHome()
        }}>Go back to Search</button>
    </section>
}

function Episodes({ episode: { episode_id, title, episode, imageUrl }, goToEpisode }) {
    return <li className="episodes__list-item">
        <article className="episode" onClick={event => {
            event.preventDefault()
            goToEpisode(episode_id.toString())
        }}>
            <p className="episode__description">Episode {episode}</p>
            <h3 className="episode__title">{title}</h3>
            <img className="episode__image" src={imageUrl}
                alt="episode image" />
            <p className="episode__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
                blanditiis natus illo enim deserunt cupiditate et odio est porro eaque, impedit accusamus
                    saepe eum a adipisci facilis harum totam velit!</p>
        </article>
    </li>
}