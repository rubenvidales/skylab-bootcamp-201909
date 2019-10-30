function CharacterResults({ items, onBack, onClickCharacter }) {
    return <section className="characters">
        <h2 className="characters__title">Characters</h2>
        <ul className="characters__list">
            {items.map(item => <CharacterItem key={item.char_id} item={item} onClickCharacter={onClickCharacter} />)}
        </ul>
        <button className="register__goback" onClick={event => { // cambiar class
            event.preventDefault()
            onBack()
        }}>Go back to Search</button>
    </section>
}