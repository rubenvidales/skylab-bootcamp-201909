/**
 * 
 * @param {String} message the error message that appears when you do something unexpected
 */

function Feedback({ message }) {
    return <section className="feedback">
        <h2 className="feedback__message">{message}</h2>
    </section>
}