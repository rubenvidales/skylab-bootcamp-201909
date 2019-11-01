/**
 * 
 * @param {object} param0 elements of characters
 * @param {function} onBack return on view list search
 * @param {function} onClickCharacter event on image character
 */

 function CharacterResults({ items, onBack, onClickCharacter, onFavCharacter }) {
    return <section className="characters">
        <button className="register__goback" onClick={event => { 
            event.preventDefault()
            onBack()
        }}>Go back to Search</button>
        <h2 className="characters__title">Characters</h2>
        <ul className="characters__list">
            {items.map(character => <CharacterItem key={character.char_id} item={character} onClickCharacter={onClickCharacter} onFav={onFavCharacter} />)}
        </ul>
    </section>
}