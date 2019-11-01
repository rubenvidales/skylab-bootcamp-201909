/**
 * 
 * @param {function} onBack event click return previous
 * @param {function} onEdit event click editable data of user
 * @param {object} data  contain element of user elements
 */

 function Profile({ onBack, onEdit, data }) {
    return <section className="register">
        <h2 className="register__title">Edit profile</h2>
        <Form back={onBack} onAction={onEdit} button={'Edit'} onData={data}/>
    </section>
}