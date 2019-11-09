function Header ({onClick}) {

return <>
        <img className="header__image" src='./img/duck.png' onClick={ event => {
                    event.preventDefault()
                    onClick()
                }}/>
        <h5>Wellcome to Duck's Hell</h5>
        </>
}