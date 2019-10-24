function Detail({ item: { title, image, description, price, link }, onBack }) {
    return <section className="view detail ">
        <article className="duck">
        <h2 className="duck__title">{title}</h2>
        <img className="duck__image" src={image} />
        <p className="duck__description">{description}</p>
        <a className="duck__store" href={link}>Go to store</a>
        <p className="duck__price">{price}</p>
        <a className="duck__back" href="" onClick={event => {
            event.preventDefault()

            onBack()
        }}>Go back</a>
        </article>
    </section>
}