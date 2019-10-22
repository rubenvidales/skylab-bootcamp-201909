function handleGoToLogin() {
    debugger
}

function handleGoToRegister() {
    debugger
}

function handleRegister(name, surname, email, password) {
    debugger
}

function handleLogin(email, password) {
    debugger
}

// TODO search

ReactDOM.render(<>
    <Header />
</>, document.getElementsByTagName('header')[0]);

ReactDOM.render(<>
    <Landing onLogin={handleGoToLogin} onRegister={handleGoToRegister}  />
    <Register onRegister={handleRegister} />
    <Login onLogin={handleLogin} />
</>, document.getElementsByTagName('main')[0])