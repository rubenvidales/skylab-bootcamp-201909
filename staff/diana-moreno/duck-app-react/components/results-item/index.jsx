function ResultsItem({ duck, item, add, handleFavorite }) {
  return(
    <li className="duck duck--clicked">
      <i className={duck.isFav
                    ? "duck__favorite fas fa-heart"
                    : 'duck__favorite far fa-heart'}
      onClick={event => handleFavorite(duck.id)}></i>
      <h1 className='duck__title'>{duck.title}</h1>
      <img onClick={event => item(duck)}
        className='duck__image' src={duck.imageUrl}/>
      <button className='duck__button'>{duck.price}</button>
    </li>
  )
}
