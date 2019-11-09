//<Wellcome user={user} onClick={handleWellcome} onLogOut={handleLogOut}/>
function Wellcome ({user, onEnter, onLogOut, onShowForm, onLogin, onRegister, showMe, error}) {

return <>
        { user && <><h3> Wellcome {user}</h3>
        <div><a href="#" className="link" onClick={ e=>{
        e.preventDefault();
        onEnter()
        }}>Enter</a> or <a href="#" className="link" onClick={ e=>{
            e.preventDefault();
            onLogOut()
            }}>Log Out</a></div>
        </>}
        { (user === undefined) && <Login onShowForm={onShowForm} onLogin={onLogin} error={error} showMe = { showMe }/>}
        { (user === undefined) && <Register onShowForm={onShowForm} onRegister={onRegister} error={error} showMe = { showMe }/>}

</>
}


