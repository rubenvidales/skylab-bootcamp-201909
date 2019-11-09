function Login() {
    return `<form method="POST" action="/login">
        <input type="email" name="email" placeholder="your e-mail">
        <input type="password" name="password" placeholder="your password">
        <button>Login</button>
    </form>`
}

module.exports = Login