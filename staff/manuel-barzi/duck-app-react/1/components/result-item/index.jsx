function ResultItem({ item: { id, title, image, price }, onClick }) {
    return <li className="results__item">
        <a href="#" className="item" onClick={event => {
            event.preventDefault()

            onClick(id)
        }}>
            <h2 className="item__title">{title}</h2>
            <img className="item__image" src={image} />
            <span className="item__price">{price}</span>
        </a>
    </li>
}