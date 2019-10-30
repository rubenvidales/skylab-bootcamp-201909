function Search({ user, onEdit, onLogout, onBackCharacters, onBackSeasons }) {
    return <section className="search">
        <h3>Hi! {user}</h3> <button className="search__button-edit" onClick={ event => {
            event.preventDefault()
            onEdit()
        }}>Go to profile</button> <button className="search__button-logout" onClick={ event => {
            event.preventDefault()
            onLogout()
        }}>Log out</button>

        <form className="search__form">
            <input className="search__form-input" type="text" />
            <button className="search__form-submit">Search</button>
        </form>

        <section class="home">
            <button class="home__button button-characters" onClick={event => { // cambiar class
            event.preventDefault()
            onBackCharacters()
        }}>Characters</button>
            <button class="home__button button-episodes" onClick={event => { // cambiar class
            event.preventDefault()
            onBackSeasons()
        }}>Episodes</button>
            <article class="random-episode episode">
                <h3 class="episode__title">Random Episode: Lorem Ipsum</h3>
                <img class="episode__image" src="http://via.placeholder.com/300?text=season-image" alt="season image" />
            </article>
            <article class="random-character character">
                <h3 class="character__title">Random Character: Lorem Ipsum</h3>
                <img class="character__image" src="http://via.placeholder.com/300?text=season-image"
                    alt="season image" />
            </article>
        </section>
    </section>
}