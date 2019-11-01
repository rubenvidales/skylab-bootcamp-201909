function CharacterItem({ item: { char_id: charId, name, img, isFav }, onClickCharacter, onFav }) {
    return <li className="characters__list-item">
        <a href="" className="characters__list-link" onClick={event => {
            event.preventDefault()
            onClickCharacter(charId.toString())
        }}>
            <article className="character">
                <h2 className="character__title">{name}</h2>
                <img className="character__image" src={img} />
                <span className="character__fav" onClick={event => {
                    event.preventDefault()
                    event.stopPropagation()

                    //Skyker easter egg
                    if (charId == '3' && isFav === false) alert('WTF? Nobody loves Skyler')
                    
                    onFav(charId.toString())
                }}>{isFav ? '🧡' : '💔'}</span>
            </article>
        </a>
    </li>
}