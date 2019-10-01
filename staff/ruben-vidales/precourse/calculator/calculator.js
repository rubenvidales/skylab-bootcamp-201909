function checkValue(value) {
    return (typeof (value) === 'number') ? true : false;
}

function roundNumber(number) {
    return Math.round(number * 1000) / 1000;
}

function calculator(num1, num2) {
    let results = [];
    //Normal behavior
    if (checkValue(num1) && checkValue(num2)) {
        results['suma'] = roundNumber(num1 + num2);
        results['resta'] = roundNumber(num1 - num2);
        results['multiplicacion'] = roundNumber(num1 * num2);
        results['division'] = roundNumber(num1 / num2);
        console.log('RESULTS: ('+num1+'+'+num2+')='+ results['suma'] + ' ('+num1+'-'+num2+')='+results['resta']+
                    ' ('+num1+'*'+num2+')='+results['multiplicacion']+ ' ('+num1+'/'+num2+')='+results['division']);    
    }
    //1 number behavior
    else if (checkValue(num1) && !num2) {
        if (num1 > 0) {
            console.log(roundNumber(Math.sqrt(num1)));
        } else {
            console.log('Error: Square root not calculable for zero or negative numbers');
        }
    } else {
        console.log('Error: There are not correct value/es in the function');
    }
}

calculator();
calculator(3);
calculator(0);
calculator('0');
calculator(1537);
calculator('3');
calculator(15.37);
calculator('asdf');
calculator(-33);
calculator(3, 5);
calculator('asdf', 5);
calculator(52, 'asd');
calculator(0, 25);
calculator(25, 0);
calculator(127, 54);
calculator(-127, 54);