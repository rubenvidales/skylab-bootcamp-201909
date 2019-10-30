function characterListItem({ item: { id, title, image, description, isFav }, onClick, onFav }) {
   return <li className="character__list__item">
       <a href="#" className="item" onClick={event => {
           event.preventDefault()

           onClick(id)
       }}>
           <h2 className="character__title">{title}</h2>
           <img className="character__image" src={image} />
           <p className="character_description">{description}</p>
           <span className="item__fav" onClick={event => {
               event.preventDefault()
               event.stopPropagation()

               onFav(id)
           }}>{isFav ? '🧡' : '💔'}</span>
       </a>
   </li>
}