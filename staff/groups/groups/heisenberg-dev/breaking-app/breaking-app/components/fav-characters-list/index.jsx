function FavoritesList( {items, onBack, onClickCharacter, onFavCharacter} ){
    return <section className="favorite-characters">
        <button className="favorite-characters__goback" onClick={event => { 
            event.preventDefault()
            onBack()
        }}>Go back to Search</button>
        <h2 className="characters__title">Favorite Characters</h2>
        <ul>
        {items.map(character => <CharacterItem key={character.char_id} item={character} onClickCharacter={onClickCharacter} onFav={onFavCharacter} />)}
        </ul>
    </section>
}