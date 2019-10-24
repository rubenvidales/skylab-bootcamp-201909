function ResultItem({ item: { id, title, image, price }, onClick }) {
    return <li className="ducks-panel__list-item">
        <a href="#" className="" onClick={event => {
            event.preventDefault()

            onClick(id)
        }}>
            <article className="duck">
            <h3 className="duck__title">{title}</h3>
            <img className="duck__image" src={image} />
            <p className="duck__price">{price}</p>
            <p className="duck__fav">♡</p>
            </article>
        </a>
    </li>
}