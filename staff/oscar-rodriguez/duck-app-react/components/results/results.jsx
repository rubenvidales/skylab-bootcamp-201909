function Results ({ducks, onClickItem, onFav}) {
    return <ul className='search-list'>
        { ducks.map ((duck) => duck.fav ? <ListItem onFav={onFav} key={duck.id} onClickItem={onClickItem} value={duck} isFav={'fa fa-hand-spock-o'}/> : 
        <ListItem onFav={onFav} key={duck.id} onClickItem={onClickItem} value={duck} isFav={'fa fa-hand-lizard-o'}/> )}
    </ul>
}