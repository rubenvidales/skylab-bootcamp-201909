function Search({ onSubmit, results, error, onResultsRender, user }) {
    return <section className="ducks-panel view">
        <h2 className="search__title">Search</h2>
        <h3 className="search__user">{user}</h3>
        <form className="search__form form" onSubmit={function (event) {
            event.preventDefault()

            const query = event.target.query.value

            onSubmit(query)
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