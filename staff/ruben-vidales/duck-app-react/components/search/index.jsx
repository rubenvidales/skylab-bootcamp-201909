function Search({ onSubmit, error }) {
    return <section className="ducks-panel view">
        <form className="search__form form" onSubmit={function (event) {
            event.preventDefault()

            const { query: { value: query } } = event.target

            onSubmit(query)
        }}>
            <div className="form__part">
                <input className="form__part-input" name="query" />
                <button className="form__part-button">🔎</button>
            </div>
        </form>
        <ul className="ducks-panel__list"></ul>

        {error && <Feedback message={error} />}
    </section>
}