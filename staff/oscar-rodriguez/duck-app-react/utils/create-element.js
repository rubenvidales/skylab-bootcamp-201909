/**
 * create an html element the specified atributes. The atribute and it's value, must be sent on pairs.
 * 
 * @param {String} elem - The name of element we want to create.
 * @param {String} Atribute Optional - The atribute of element we want to assign a value.
 * @param {String} Value Required if Atribute is sent - The value of the atribute.
 */
function createElement (elem) {
    var element = document.createElement(elem);

    for ( let i=1; i<arguments.length; i+=2) {

        if (arguments[i].toLowerCase() === "innerhtml" || arguments[i].toLowerCase() === "innertext") {
            element.innerHTML=arguments[i+1];
        } else {
            element.setAttribute(arguments[i],arguments[i+1]);
        }
    }
	return element;
}