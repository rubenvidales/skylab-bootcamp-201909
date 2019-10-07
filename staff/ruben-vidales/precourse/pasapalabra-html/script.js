//Observaciones:
//Cargamos el archivo gamedata.js a parte para separar las preguntas de la programación

//Handlebars para crear las letras
const source = document.getElementById('abecedario').innerHTML;
const template = Handlebars.compile(source);
const compiledHtml = template(gameData);
const displayGoals = document.getElementById('bl-izq');
displayGoals.innerHTML = compiledHtml;

//GAME LOGIC
let userName;
let rosco;
let index;
let aciertos;
let flagEndGame;
let time;

let ranking = [{name: 'pepe', aciertos: 12},{name: 'ru', aciertos: 5},{name: 'joan', aciertos: 6},{name: 'luis', aciertos: 18},];

const answerInput = document.getElementById('answerInput');

const btnResponder = document.getElementById('btnResponder');
const btnPasapalabra = document.getElementById('btnPasapalabra');
const btnEndGame = document.getElementById('btnEndGame');

const generateRandom = (maxNumber) => {
    return Math.floor(Math.random() * maxNumber);
}

const btnNombre = document.getElementById('btnNombre');
btnNombre.addEventListener('click', function (e) {
    startGame();
});

const prepareRosco = () => {
    let rosco = [];
    for (let i = 0; i < gameData.letters.length; i++) {
        let letra = {};
        letra.name = gameData.letters[i].name;
        letra.status = gameData.letters[i].status;
        let randomNum = generateRandom(gameData.letters[i].questions.length);
        letra.question = gameData.letters[i].questions[randomNum].question;
        letra.answer = gameData.letters[i].questions[randomNum].answer;
        rosco.push(letra);
    }
    return rosco;
}

const updateAcientos = () => {
    document.getElementsByClassName('dato-aciertos')[0].innerHTML = aciertos;
}

const changeLetterStatus = (letra, status) => {
    for (letter of rosco) {
        if (letter.name === letra) {
            letter.status = status;
            break;
        }
    }
}

const letraIncorrecta = (letra) => {
    document.getElementsByClassName('letra-' + letra)[0].style.backgroundColor = '#D66965';
    changeLetterStatus(letra, -1);
}

const letraCorrecta = (letra) => {
    document.getElementsByClassName('letra-' + letra)[0].style.backgroundColor = '#65D68D';
    changeLetterStatus(letra, 1);
    aciertos++;
    updateAcientos();
}

const letraReset = (letra) => {
    document.getElementsByClassName('letra-' + letra)[0].style.backgroundColor = '#5C89D6';
    changeLetterStatus(letra, 0);
}

const letraFocus = (letra) => {
    document.getElementsByClassName('letra-' + letra)[0].style.backgroundColor = '#C0DAED';
}

const cleanInput = () => {
    document.getElementById('answerInput').value = '';
    document.getElementById('answerInput').focus();
}

const updateQuestion = () => {
    cleanInput();
    if (index > rosco.length - 1) {
        index = 0;
    }
    if (index == -1) {
        finishGame();
    } 
    else {
        if (rosco[index].status == 0) {
            document.getElementsByClassName('question')[0].innerHTML = rosco[index].question;
            letraFocus(rosco[index].name);
        } else {
            index = findNextQuestion(index);
            updateQuestion();
        }
    }
}

const resetRosco = () => {
    for (letter of rosco) {
        letraReset(letter.name);
    }
}

const findNextQuestion = () => {
    let newIndex = -1;

    //Primero comprueba desde la posicion inicial
    for (let i = index; i < rosco.length; i++) {
        if (rosco[i].status == 0) {
            newIndex = i;
            break;
        }
    }
    //Si sigue sin encontrarlo hace una busqueda desde el inicio
    if (newIndex == -1) {
        index = 0;
        for (let i = index; i < rosco.length; i++) {
            if (rosco[i].status == 0) {
                newIndex = i;
                break;
            }
        }
    }
    if (newIndex == -1) {
        finishGame();
    }
    return newIndex;
}

const startGame = () => {
    userName = document.getElementById('userNameInput').value;
    document.getElementsByClassName('nombre-jugador')[0].innerHTML = userName ? userName : 'John Doe';
    document.getElementById('bl-intro').style.display = 'none';
    document.getElementById('userNameInput').value = '';

    document.getElementById('bl-pregunta').style.display = 'block';

    //prepare variables
    rosco = prepareRosco();
    index = 0;
    aciertos = 0;
    flagEndGame = false;
    time = 180;

    updateQuestion();
    timer();
}

const timer = () =>{
    time = time - 1;
    document.getElementsByClassName('dato-time')[0].innerHTML = time;
    if (time > 0 ){
        setTimeout(function(){timer()},1000);
    }
    else{
        finishGame();
    }
}

const finishGame = () => {
    resetRosco();
    ranking.push({name: userName, aciertos: aciertos});

    document.getElementById('bl-pregunta').style.display = 'none';
    //clean variables
    document.getElementsByClassName('nombre-jugador')[0].innerHTML = '...';

    if(aciertos == rosco.length){
        document.getElementsByClassName('instrucciones')[0].innerHTML = 'FELICIDADES! has acertado todas las preguntas y te llevas el bote,<br> introduce tu nombre para volver a jugar';
    }
    else{
    document.getElementsByClassName('instrucciones')[0].innerHTML = 'La partida ha finalizado con '+aciertos+' aciertos,<br> introduce tu nombre para volver a jugar';
    }
    document.getElementById('bl-intro').style.display = 'block';
}

btnResponder.addEventListener('click', function (e) {
    if (answerInput.value.toLowerCase() == rosco[index].answer.toLowerCase()) {
        letraCorrecta(rosco[index].name);
    } else {
        letraIncorrecta(rosco[index].name);
    }

    updateQuestion();
});

btnPasapalabra.addEventListener('click', function (e) {
    letraReset(rosco[index].name);
    index++;
    updateQuestion();
});

btnEndGame.addEventListener('click', function (e) {
    flagEndGame = true;
    finishGame();
});