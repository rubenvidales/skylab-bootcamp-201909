function Search({searchDucks, username, onFavs, logout}) {
  return (
    <header className='header view__header'>
      <div className='nav'>
        <div className='nav__links-container'>
        <a className='nav__elems nav__link' onClick={event => onFavs()}>Favorites</a>
        <a className='nav__elems nav__link' onClick={event => logout()}>Logout</a>
        </div>
        <p className='nav__elems'>Hello, {username}</p>
      </div>
      <h1 className='header__title'>Duck Store</h1>
      <form onSubmit={event => {
          event.preventDefault()
          const query = event.target.query.value
          searchDucks(query)
        }}
        className='header__form form'>
        <input className='form__input' type="text" name="query" placeholder="search..." />
        <button className='form__button'>
          <i className="fas fa-search"></i>
        </button>
      </form>
    </header>
  )
}
