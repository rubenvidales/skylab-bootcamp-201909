var userName = '';
var ranking = [];

/**
 * Calculates the score
 * @param {int} turns 
 * @returns {int} score
 */
function generateScore(turns) {
    let score = 0;
    const MAX_TURNS = 90;
    //Perfect score
    if (turns == 15) {
        score = 1000;
    } else {
        score = (MAX_TURNS - turns) * 10;
    }
    return score;
}

/**
 * Point comparation function
 * @param {object} player a
 * @param {object} player b
 */
function compareRanking(a, b) {
    if (a.points > b.points) {
        return -1;
    }
    if (a.points < b.points) {
        return 1;
    }
    return 0;
}

/**
 * Print the ranking by console after sort it
 */
function printRanking() {
    if (ranking.length > 0) {
        ranking.sort(compareRanking);
        console.log('RANKING');
        console.log('---');
        console.table(ranking);
    }
}

/**
 * Return a random number
 * @returns {int} Random number between 1 and 90
 *
 */
function generateRandomNumber() {
    return Math.floor(Math.random() * 90) + 1;
}

/**
 * Find a number inside the bingo card
 * @param {int} wantedNumber 
 * @param {object} bingoCard 
 * @returns {boolean}
 */
function isNumberInBingoCard(wantedNumber, bingoCard) {
    let result = false;
    let exitForced = false;
    for (linea of bingoCard) {
        for (number of linea.numbers) {
            if (exitForced) {
                break;
            }
            if (number.number == wantedNumber) {
                result = true;
                exitForced = true;
            }
        }
        if (exitForced) {
            break;
        }
    }
    return result;
}

/**
 * Find if the number appears in a especific line
 * @param {int} wantedNumber 
 * @param {object} linea 
 * @returns {boolean}
 */
function isNumberInLine(wantedNumber, linea) {
    let result = false;
    for (number of linea.numbers) {
        if (number.number == wantedNumber) {
            result = true;
        }
    }
    return result;
}

/**
 * Comparation object number function to sort
 * @param {object} number a 
 * @param {object} number b 
 * @returns {int} orderNumber
 */
function numberCompare(a, b) {
    if (a.number < b.number) {
        return -1;
    }
    if (a.number > b.number) {
        return 1;
    }
    return 0;
}

/**
 * Creates a bingo card object
 * @returns {object} bingoCard
 */
function newBingoCard() {
    let bingoCard = [];
    while (bingoCard.length < 3) {
        let linea = {};
        linea.lineStatus = 0;
        linea.numbers = [];
        while (linea.numbers.length < 5) {
            let randomNum = generateRandomNumber();
            //If the number is not in other lines or in the line that is being created, we add it
            if (!isNumberInBingoCard(randomNum, bingoCard) && !isNumberInLine(randomNum, linea)) {
                let number = {
                    number: randomNum,
                    status: 0
                }
                linea.numbers.push(number);
            }
        }
        linea.numbers.sort(numberCompare);
        bingoCard.push(linea);

    }
    return bingoCard;
}

/**
 * Show the bingo card by console
 * If the number has already appeared prints an "X"
 * @param {object} bingoCard 
 */
function printBingoCard(bingoCard) {
    for (linea of bingoCard) {
        let stingLine = '';
        for (number of linea.numbers) {
            if (number.status === 0) {
                stingLine = stingLine + number.number + ' ';
            } else {
                stingLine = stingLine + 'X' + ' ';
            }
        }
        console.log(stingLine);
    }
}

/**
 * Check if the bingo card is completed
 * @param {object} bingoCard 
 * @returns {boolean}
 */
function isBingoCardCompleted(bingoCard) {
    let result = true;
    for (linea of bingoCard) {
        if (linea.lineStatus === 0) {
            result = false;
            break;
        }
    }
    return result;
}

/**
 * Check if a specific bingo line is completed
 * @param {object} bingoLine 
 * @returns {boolean}
 */
function isLineCompleted(bingoLine) {
    let result = true;
    for (number of bingoLine.numbers) {
        if (number.status === 0) {
            result = false;
            break;
        }
    }
    return result;
}

/**
 * Main function
 */
function bingo() {

    //Restart/inicialize the values
    let counter = 0;
    let displayedNumbers = [];
    let flagEndGame = false;
    let bingoCard = newBingoCard();
    let flagCartonSelected = false;

    //Internal fuctions to access to the vars
    function askNewTurn() {
        if (isBingoCardCompleted(bingoCard)) {
            console.log('The game is over in ' + counter + ' turns!');
            flagEndGame = true;
            ranking.push({
                name: userName,
                turns: counter,
                points: generateScore(counter),
            });
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

    function newTurn() {
        let randomNum = 0;
        let flagLine = false;

        while (randomNum == 0) {
            let auxRandom = generateRandomNumber();
            if (displayedNumbers.indexOf(auxRandom) == -1) {
                randomNum = auxRandom;
            }
        }

        if (isNumberInBingoCard(randomNum, bingoCard)) {
            console.log('Number ' + randomNum + ' found!');
            for (linea of bingoCard) {
                for (number of linea.numbers) {
                    if (number.number == randomNum) {
                        number.status = 1;
                    }
                }
                if (isLineCompleted(linea)) {
                    linea.lineStatus = 1;
                    if (!flagLine) {
                        console.log('--------');
                        console.log('The LINE has appeared!!!');
                        console.log('--------');
                        flagLine = true;
                    }
                }
            }
        } else {
            console.log('Number ' + randomNum + ' NOT found!');
        }

        displayedNumbers.push(randomNum);
        displayedNumbers.sort((a, b) => a - b);
        console.log('Numbers already displayed: ' + displayedNumbers);

        console.log('Turn counter: ' + counter);
        printBingoCard(bingoCard);
        console.log('--------');
    }

    console.log('--------');
    console.log('Score system:');
    console.log('If you get it in 15 spins, you get a perfect score of 1000 points.');
    console.log('If you get it in between 16 spins and 89 spins, your points are calculated with the following formula: (90 - spins) * 10)');
    console.log('If you get it in more spins, sorry but 0 points.');

    printRanking();

    userName = prompt(`Hi! what's your name?`);
    console.log(`Hi, ${userName}! Let's get started!:`);
    console.log('--------');

    console.log('This is your bingo card:');
    printBingoCard(bingoCard);
    console.log('--------');

    //Ask for a new bingo card
    do {
        let response = prompt('Do you like this bingo card or do you prefer another one? (this/another)');
        switch (response) {
            case 'this':
                flagCartonSelected = true;
                break;
            case 'another':
                bingoCard = newBingoCard();
                console.log('This is the new bingo card:');
                printBingoCard(bingoCard);
                console.log('--------');
                break;
        }
    } while (!flagCartonSelected);

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

bingo();