function Detail({ item: { id, title, image, description, price, link, isFav }, onBack, onFav }) {
    return <section className="view detail _hide">
        <h2 className="detail__title">{title}</h2>
        <img className="detail__image" src={image} />
        <p className="detail__description">{description}</p>
        <a className="detail__store" href={link}>Go to store</a>
        <span className="detail__price">{price}</span>
        <span className="detail__fav" onClick={event => {
                event.preventDefault()
                event.stopPropagation()

                onFav(id)
            }}>{isFav ? '🧡' : '💔'}</span>
        <a className="detail__back" href="" onClick={event => {
            event.preventDefault()

            onBack()
        }}>Go back</a>
    </section>
}