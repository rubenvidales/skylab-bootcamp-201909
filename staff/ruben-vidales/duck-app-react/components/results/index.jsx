function Results({ items, onItemRender }) {
    console.log(items)
    return <ul className="ducks-panel__list">
        {items.map(item => onItemRender(item))}
    </ul>
}