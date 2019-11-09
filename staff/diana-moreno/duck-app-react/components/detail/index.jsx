function Detail({ item, onBack, handleFavorite, error }) {
  return (
    <div className='duck duck--litle'>
      <i className={item.isFav
                    ? "duck__favorite duck__favorite--litle fas fa-heart"
                    : 'duck__favorite duck__favorite--litle far fa-heart'}
         onClick={event => handleFavorite(item.id)}></i>
      <h1 className='duck__title'>{item.title}</h1>
      <img className='duck__image' src={item.imageUrl} />
      <p className='duck__description duck__description--litle'>{item.description}</p>
      <div className='duck__container-buttons'>
        <p className='duck__button'>{item.price}</p>
        <button
          onClick={event => {
            event.preventDefault()
            onBack()
          }}
        className='duck__button duck__button--back'>◀</button>
      </div>
    </div>
  )
}

