function Results({ items, onItemRender,  }) {
    return <ul className="ducks-panel__list">
        {items.map(item => onItemRender(item))}
    </ul>
}