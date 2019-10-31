/**
 * component tha paind list of characters
 * @param {integer} char_id code identification character
 * @param {string} name of character
 * @param {string} img picture of chracter
 * @param {boolean} isFav if event click true o false
 * @param {function} onClickCharacter event on click picture
 * @param {function} onFav event on click image faouvorites
 *  
 */
function CharacterItem({ item: { char_id, name, img, isFav }, onClickCharacter, onFav }) {
    return <li className="characters__list-item">
        <a href="" className="item" onClick={event => {
            event.preventDefault()
            onClickCharacter(char_id.toString())
        }}>
            <h2 className="character__title">{name}</h2>
            <img className="character__image" src={img} />
            <p className="character__description">Lorem ipsum</p>
            <span className="item__fav" onClick={event => {
                event.preventDefault()
                event.stopPropagation()
                onFav(char_id.toString())
            }}>{isFav ? '🧡' : '💔'}</span>
        </a>
    </li>
}