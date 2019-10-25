function ResultItem({ item: { id, title, image, price, fav }, onClick, onFav }) {
    return <li key={id} className="ducks-panel__list-item">
        <a href="" className="" onClick={event => {
            event.preventDefault()

            onClick(id)
        }}>
            <article className="duck">
                <h3 className="duck__title">{title}</h3>
                <img className="duck__image" src={image} />
                <p className="duck__price">{price}</p>
                <p href="" className="duck__fav" onClick={event => {
                    event.preventDefault()
                    event.stopPropagation()
                    onFav(id)
                }}>{fav ? '❤️' : '♡'}</p>

            </article>
        </a>
    </li>
}