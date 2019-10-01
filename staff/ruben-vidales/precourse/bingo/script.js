var originalCarton = [1, 27, 46, 69, 74];

/**
 * Return a random number
 * @returns {int} Random number between 1 and 90
 *
 */
function generateRandomNumber() {
    return Math.floor(Math.random() * 90) + 1;
}

/**
 * Main function
 */
function bingo() {

    /**
     * Print the carton on console
     */
    function printCarton() {
        let stringCarton = '';
        for (let i = 0; i < carton.length; i++) {
            stringCarton += ` ${carton[i]} `;
        }
        console.log(stringCarton);
    }

    /**
     * Checks all the carton, if a number appears, the game is not over
     * @returns {boolean} true if the game is over
     */
    function isCartonCompleted() {
        let flagCheckNumbers = true;
        for (let i = 0; i < carton.length; i++) {
            if (typeof (carton[i]) === 'number') {
                flagCheckNumbers = false;
                break;
            }
        }
        return flagCheckNumbers;
    }

    /**
     * Ask for a new turn
     */
    function askNewTurn() {
        if (isCartonCompleted()) {
            console.log('The game is over in ' + counter + ' turns!');
            flagEndGame = true;
        } else {
            let response = confirm('Do you want to play a new turn?');
            if (response) {
                counter++;
                newTurn();
            } else {
                console.log('No problem, maybe in other time');
                flagEndGame = true;
            }
        }
    }

    /**
     * New turn function that checks if the number is in the carton
     */
    function newTurn() {
        let randomNum = generateRandomNumber();
        let indexResult = carton.indexOf(randomNum);
        if (indexResult > -1) {
            carton[indexResult] = 'X';
            console.log('Number '+randomNum+' found!');
        } else {
            console.log('Number '+randomNum+' NOT found!');
        }
        console.log('Turn counter: '+counter);
        printCarton();
        console.log('--------');
    }

    //First restart/inicialize the values
    let counter = 0;
    let flagEndGame = false;
    let carton = originalCarton.slice();

    console.log('This is the initial carton');
    printCarton();
    console.log('--------');

    do {
        askNewTurn();
    } while (!flagEndGame);

    //Restart
    let restart = prompt(`Do you want to play again? (yes/no)`);
    switch (restart) {
        case 'yes':
            bingo();
            break;
        case 'no':
            console.log('Thank you for playing. Bye!');
            break;
    }
}

let userName = prompt(`What's your username?`);
console.log(`Hi ${userName}!`);
console.log('--------');
bingo();