var resultado = 0;
var firstNumber = 0;
var operation = "";
var secondNumber = 0;

const resultScreen = document.getElementById('result-value');

const botonSumar = document.getElementsByClassName('btn-sumar')[0];
const botonRestar = document.getElementsByClassName('btn-restar')[0];
const botonMultiplicar = document.getElementsByClassName('btn-multiplicar')[0];
const botonDividir = document.getElementsByClassName('btn-dividir')[0];
const botonCalcular = document.getElementsByClassName('btn-igual')[0];

const botonDecimal = document.getElementsByClassName('btn-decimal')[0];
const botonAc = document.getElementsByClassName('btn-ac')[0];
const botonBack = document.getElementsByClassName('btn-back')[0];

//Comportamiento onclick para los números
const numeros = document.getElementsByClassName('numero');
for (let i = 0; i < numeros.length; i++) {
    numeros[i].onclick = () => {
        if (resultado === 0) {
            resultado = numeros[i].innerHTML;
        } else {
            resultado = resultado + numeros[i].innerHTML;
        }
        showResult();
    }; 
};

//Comportamiento de la tecla decimal
botonDecimal.onclick = () => {
    if(resultado === 0 || resultado === ""){
        resultado = "0.";
    }
    else{
        resultado = resultado + ".";
    }
    showResult();
};

//TODO: Refactorizar todas estas funciones 
//Comportamiento suma
botonSumar.onclick = () => {
    firstNumber = parseFloat(resultado);
    operation = "sumar";
    resultado = "";
    showResult();
};

//Comportamiento resta
botonRestar.onclick = () => {
    firstNumber = parseFloat(resultado);
    operation = "restar";
    resultado = "";
    showResult();
};

//Comportamiento multiplicar
botonMultiplicar.onclick = () => {
    firstNumber = parseFloat(resultado);
    operation = "multiplicar";
    resultado = "";
    showResult();
};

//Comportamiento dividir
botonDividir.onclick = () => {
    firstNumber = parseFloat(resultado);
    operation = "dividir";
    resultado = "";
    showResult();
};

//Comportamiento Calcular
botonCalcular.onclick = () => {
    if (operation !== "") {
        secondNumber = parseFloat(resultado);
        switch (operation) {
            case 'sumar':
                resultado = (firstNumber + secondNumber);
                break;
            case 'restar':
                resultado = (firstNumber - secondNumber);
                break;
            case 'multiplicar':
                resultado = (firstNumber * secondNumber);
                break;
            case 'dividir':
                resultado = (firstNumber / secondNumber);
                break;
        }
        resultado = Math.round(resultado * 1000) / 1000;
        operation = "";
        showResult();
    }
};

//Comportamiento boton AC
botonAc.onclick = () => {
    resultado = 0;
    showResult();
};

//Comportamiento boton back
botonBack.onclick = () => {
    if(resultScreen.innerHTML.length > 0){
        let aux = resultScreen.innerHTML.slice(0, -1);
        resultado = aux;
    }
    showResult();
};

const showResult = () => {
    resultScreen.innerHTML = resultado;
    if(resultado.length > 10){
        resultScreen.style.fontSize = '25px';
    }else{
        resultScreen.style.fontSize = '50px';
    }
};