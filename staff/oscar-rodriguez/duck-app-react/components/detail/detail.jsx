function Detail (props) {
    const { description, imageUrl, title, price, link } = props.duck
    const { onBack } = props
    
    return <>
        <h1 className='duck-detail__title'>{title}</h1>
        <button className='duck-detail__back' onClick={event => {
            event.preventDefault();
            onBack();
            }}>Go Back
        </button>
        <p className='duck-detail__description'>{description}</p>
        <img className="duck-detail__image" src={imageUrl}/>
        <div className='duck-detail__price'>{price}</div>
        <a className='link' href={link}>Go to Duck's shopping page</a>
    
    </>
}