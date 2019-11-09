function Login ({onShowForm, onLogin, error, showMe}) {
    return <section className="login" onClick={ e => {
            e.preventDefault()
            onShowForm()
    }}>
        <h1 className="login__title"><a className="link">Sign in</a></h1>
        { !showMe && <>
            <form className="login__form"  onClick={ e => {
                    e.stopPropagation()
                }} onSubmit = {function (event) {
                event.preventDefault();
                const { username : {value : username},
                        password : {value : password}
                    } = event.target;
                onLogin(username, password); }
            }>
                <input type="email" name="username" placeholder="uremail@mail.com"/>
                <input type="password" name="password"/>
                <button className="login__button" name="login">LOGIN</button>
            </form>
            {error && !showMe && <Feedback message={error} />}
        </>}
    </section>
}