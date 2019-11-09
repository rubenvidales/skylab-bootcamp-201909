function Search ({onSearch}) {
    
    return <nav className="search-bar">
        <form className='form-0' onSubmit={ event => {
                event.preventDefault();
                const query = event.target.search.value;
                
                onSearch(query);
        }}>
            <input type="text" placeholder="Search.." name="search"/>
            <button className="form-0__button" type="submit"><i className="fa fa-search"></i></button>
        </form>
    </nav>
}