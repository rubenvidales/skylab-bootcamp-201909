function CharacterItem({ item: { char_id, name, img, isFav }, onClickCharacter, onFav }) {
   return <li className="character__list__item">
       <a href="" className="item" onClick={event => {
           event.preventDefault()

           onClickCharacter(char_id.toString())
       }}>
           <h2 className="character__title">{name}</h2>
           <img className="character__image" src={img} />
           <p className="character_description">Lorem ipsum</p>
           <span className="item__fav" onClick={event => {
               event.preventDefault()
               event.stopPropagation()

               onFav(char_id.toString())
           }}>{isFav ? '🧡' : '💔'}</span>
       </a>
   </li>
}