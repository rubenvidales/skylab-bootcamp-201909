function ListItem ({value, onClickItem, onFav, isFav}) {

    const { id, imageUrl, title, price } = value

    return  <li className="search-list__entry entry" onClick={event => {
            event.preventDefault();
            onClickItem(id)
        }}>
            <img className='entry__img' src={imageUrl} />
            <div className='entry__tittle'>{title}</div>
            <div className="entry__like">
                <i className={`${isFav}`} onClick={e=>{
                e.preventDefault()
                e.stopPropagation()
                onFav(id)
            }}></i></div>
            <div className="entry__price">{price}</div>
        </li>
}