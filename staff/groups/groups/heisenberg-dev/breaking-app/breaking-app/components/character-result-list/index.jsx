function CharacterResultsItems({ items, onItemRender }) {
   return <ul className="characters__list">
       {items.map(item => onItemRender(item))}
   </ul>
}