/**
 * 
 * @param {function} items lements labels 
 * @param {function} onItemRender generate labels attending quantity data
 */

 function Results({ items, onItemRender }) {
    return <ul className="results">
        {items.map(item => onItemRender(item))}
    </ul>
}