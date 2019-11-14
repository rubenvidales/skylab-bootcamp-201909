function Search({ onSubmit, results, error, onResultsRender, user, query, onLogout }) {
    return <section className="view search">
        <h1 className="search__user">Hello {user}</h1>
        <h2 className="search__title">SEARCH</h2><button className="search__logout" onClick={event => {
            event.preventDefault()

            onLogout()
        }}>LOGOUT</button>
        <form className="search__form" onSubmit={event => {
            event.preventDefault()

            const query = event.target.query.value

            onSubmit(query)
        }}>
            <input className="search__criteria" type="text" name="query" placeholder="" defaultValue={query} />
            <button className="search__submit">🔍</button>
        </form>

        {error && <Feedback message={error} />}

        {results && onResultsRender(results)}
    </section>
}