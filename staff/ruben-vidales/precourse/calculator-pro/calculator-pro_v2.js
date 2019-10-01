/**
 * Check if the args are numbers
 * @param {*} arrayValues 
 * @returns boolean
 */
function checkValues(arrayValues) {
    let flag = true;
    for (let i = 0; i < arrayValues.length; i++) {
        if (typeof (arrayValues[i]) === 'number') {
            continue;
        } else {
            flag = false;
            break;
        }
    }
    return flag;
}

/**
 * Calculate a float number with 3 decimals
 * @param {*} number
 * @returns float
 */
function roundNumber(number) {
    return Math.round(number * 1000) / 1000;
}

/**
 * Sum all args numbers
 * @param {*} arrayValues 
 * @return number
 */
function sum(arrayValues) {
    let result = 0;
    for (let i = 0; i < arrayValues.length; i++) {
        result += arrayValues[i];
    }
    return result;
}

/**
 * Substracts all args numbers
 * @param {*} arrayValues 
 * @return number
 */
function substract(arrayValues) {
    let result = arrayValues[0];
    for (let i = 1; i < arrayValues.length; i++) {
        result -= arrayValues[i];
    }
    return result;
}

/**
 * Multiply all args numbers
 * @param {*} arrayValues 
 * @return number
 */
function multiply(arrayValues) {
    let result = arrayValues[0];
    for (let i = 1; i < arrayValues.length; i++) {
        result *= arrayValues[i];
    }
    return result;
}

/**
 * Divides all args numbers
 * @param {*} arrayValues 
 * @return number
 */
function divide(arrayValues) {
    let result = arrayValues[0];
    for (let i = 1; i < arrayValues.length; i++) {
        result /= arrayValues[i];
    }
    return result;
}

let resultsSaved = [];
let operationsCounter = 0;

function calculatorPro() {

    //Save arguments in a lineal array
    let arrayValues = Array.prototype.slice.call(arguments);

    if (checkValues(arrayValues)) {
        if (arrayValues.length === 1) {
            if (arrayValues[0] > 0) {
                let result = roundNumber(Math.sqrt(arrayValues[0]));
                console.log('RESULT: Square root of ' + arrayValues[0] + ': ' + result);
                resultsSaved.push(['squareRoot', result]);
                operationsCounter++;
            } else {
                console.log('Error: Square root not calculable for zero or negative numbers');
            }
        } else {
            let results = [];
            results['sum'] = roundNumber(sum(arrayValues));
            results['substract'] = roundNumber(substract(arrayValues));
            results['multiply'] = roundNumber(multiply(arrayValues));
            results['divide'] = roundNumber(divide(arrayValues));
            console.log('RESULTS: SUM:(' + arrayValues.join('+') + ')=' + results['sum'] + ' SUBSTRACT:(' + arrayValues.join('-') + ')=' + results['substract'] +
                ' MULTIPLY:(' + arrayValues.join('*') + ')=' + results['multiply'] + ' DIVIDE:(' + arrayValues.join('/') + ')=' + results['divide']);
            resultsSaved.push(['complete',results]);
            operationsCounter++;
        }
    } else {
        console.log('Error: There are not correct value/es in the function');
    }

    let answer = prompt('New calculation? y/n');
    if (answer === 'y') {
        let inputString = prompt('Enter values separated by commas');
        //Transform the prompt string to array of numbers
        let inputArray = inputString.split(',').map(Number);
        //Pass the new array of numbers like parameters
        calculatorPro.apply(null, inputArray);
    } else {
        console.log('Bye!');
    }
}

//First operation
calculatorPro(5, 21, 4);
