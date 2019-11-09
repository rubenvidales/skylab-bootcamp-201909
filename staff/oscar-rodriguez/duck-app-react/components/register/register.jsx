function Register ({onShowForm,onRegister, error, showMe}) {
    return <>
            <section className="sign-up" onClick={event=>{
                    event.preventDefault()
                    onShowForm()
                }}>
                <h1 className="sign-up__title _hide"><a className="link">Sign up</a></h1>
            {showMe && 
                <form onClick={ e => e.stopPropagation() } onSubmit={function (e){
                    e.preventDefault();
                    const { username : { value : username },
                            password : { value : password },
                            name     : { value : name },
                            surname  : { value : surname }
                        } = e.target
                    
                    onRegister(username, password, name, surname);
                }}>
                    <label className="label">Enter your email: <br/><input type="email" name="username" placeholder="uremail@mail.com"/></label>
                    <label className="label">Enter your password: <br/><input type="password" name="password"/></label>
                    <label className="label">Name: <br/><input type="text" name="name" placeholder="name"/></label>
                    <label className="label">Surname: <br/><input type="text" name="surname" placeholder="surname"/></label>
                    <button className="sign-up__button" name="sign-up">LOGIN</button>
                </form>
            }
            {error && showMe && <Feedback message={error} />}
            </section>
        </>
}