function Search({ onSearch, onLogout, results, error, onResultsRender, user, id, token }) {
    return <section className="ducks-panel view">
        <form className="search__logout-form" onSubmit={function (event) {
            event.preventDefault()
            onLogout()
        }}>
            <span className="search__user">Hi {user}!</span>
            <button className="search__logout-button">🚪</button>
        </form>
        <h2 className="search__title">Search</h2>
        <form className="search__form form" onSubmit={function (event) {
            event.preventDefault()

            const query = event.target.query.value

            onSearch(id, token, query)
        }}>
            <div className="form__part">
                <input className="form__part-input" name="query" />
                <button className="form__part-button">🔎</button>
            </div>
        </form>

        {error && <Feedback message={error} />}

        {results && onResultsRender(results)}
    </section>
}