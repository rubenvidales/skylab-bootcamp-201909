function Results({ items, onItemRender }) {
    return <ul className="results">
        {items.map(item => onItemRender(item))}
    </ul>
}