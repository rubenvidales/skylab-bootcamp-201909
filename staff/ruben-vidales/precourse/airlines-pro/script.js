var flights = [{
    id: 00,
    to: 'Bilbao',
    from: 'Barcelona',
    cost: 1600,
    scale: false
}, {
    id: 01,
    to: 'New York',
    from: 'Barcelona',
    cost: 700,
    scale: false
}, {
    id: 02,
    to: 'Los Angeles',
    from: 'Madrid',
    cost: 1100,
    scale: true
}, {
    id: 03,
    to: 'Paris',
    from: 'Barcelona',
    cost: 210,
    scale: false
}, {
    id: 04,
    to: 'Roma',
    from: 'Barcelona',
    cost: 150,
    scale: false
}, {
    id: 05,
    to: 'London',
    from: 'Madrid',
    cost: 200,
    scale: false
}, {
    id: 06,
    to: 'Madrid',
    from: 'Barcelona',
    cost: 90,
    scale: false
}, {
    id: 07,
    to: 'Tokyo',
    from: 'Madrid',
    cost: 1500,
    scale: true
}, {
    id: 08,
    to: 'Shangai',
    from: 'Barcelona',
    cost: 800,
    scale: true
}, {
    id: 09,
    to: 'Sidney',
    from: 'Barcelona',
    cost: 150,
    scale: true
}, {
    id: 10,
    to: 'Tel-Aviv',
    from: 'Madrid',
    cost: 150,
    scale: false
}];

/**
 * Calculate a float number with 3 decimals
 * @param {*} number
 * @returns float
 */
function roundNumber(number) {
    return Math.round(number * 100) / 100;
}

/**
 * Show by console the flight data
 * @param {*} flightObject 
 */
function printInfo(flightObject) {
    let stringScale = (flightObject.scale) ? 'makes a stopover' : 'doesn\'t make any stopover';
    console.log('-Flight id:' + flightObject.id + ' with origin: ' + flightObject.from + ', and destination: ' + flightObject.to + ' has a cost of ' +
        flightObject.cost + '€ and ' + stringScale);
}

/**
 * Calculate the average cost of all flights
 * @param {*} flightsArray
 * @returns float
 */
function averageCost(flightsArray) {
    let costsSum = 0;
    for (let i = 0; i < flightsArray.length; i++) {
        costsSum += flightsArray[i].cost;
    }
    return roundNumber(costsSum / flightsArray.length);
}

/**
 * Get the last id of flights
 * @returns int
 */
function getLastFlightId() {
    let lastFlight = flights[flights.length - 1];
    return lastFlight['id'];
}

/**
 * Check if the flight exists by id
 * @param {*} idFlight 
 * @returns boolean
 */
function findFlightbyId(idFlight) {
    return (flights.findIndex(item => item.id === idFlight) > -1) ? true : false;
}

/**
 * Shows by console the information about the cheapest flights
 */
function getCheaperFlights(costWanted) {
    costWanted = parseInt(costWanted);
    let cheaperFlights = [];
    for (let i = 0; i < flights.length; i++) {
        if (flights[i].cost < costWanted) {
            cheaperFlights.push(flights[i]);
        }
    }
    console.log('Flights cheaper than ' + costWanted + '€:');
    if (cheaperFlights.length > 0) {
        for (let i = 0; i < cheaperFlights.length; i++) {
            printInfo(cheaperFlights[i]);
        }
    } else {
        console.log('Sorry, there are not flights cheaper than this cost');
    }
}

/**
 * Shows by console the information about flights more expensive than the cost entered
 */
function getExpensiveFlights(costWanted) {
    costWanted = parseInt(costWanted);
    let expensiveFlights = [];
    for (let i = 0; i < flights.length; i++) {
        if (flights[i].cost > costWanted) {
            expensiveFlights.push(flights[i]);
        }
    }
    console.log('Flights more expensive than ' + costWanted + '€:');
    if (expensiveFlights.length > 0) {
        for (let i = 0; i < expensiveFlights.length; i++) {
            printInfo(expensiveFlights[i]);
        }
    } else {
        console.log('Sorry, there are not flights more expensive than this cost');
    }
}

/**
 * Shows for flights with the price entered
 * @param {int} costWanted 
 */
function getFlightsByCost(costWanted) {
    costWanted = parseInt(costWanted);
    let flightsFound = [];
    for (let i = 0; i < flights.length; i++) {
        if (flights[i].cost === costWanted) {
            flightsFound.push(flights[i]);
        }
    }
    if (flightsFound.length > 0) {
        console.log('The flights with the entered cost are:');
        for (let i = 0; i < flightsFound.length; i++) {
            printInfo(flightsFound[i]);
        }
    } else {
        console.log('There are not flights with this cost');
    }
}

/**
 * Add an flight object to flights array
 * @param {*} stringFlights 
 */
function addFlights(stringFlights) {
    let arrayFlights = stringFlights.split(';');
    if (arrayFlights.length > 15) {
        alert('ERROR: You enter more than 15 flights');
    } else {
        console.log('Flights added:');
        for (let i = 0; i < arrayFlights.length; i++) {
            if (arrayFlights[i] !== '') {
                let arrayFlight = arrayFlights[i].split(',');
                let resultObject = {};
                resultObject['id'] = getLastFlightId() + 1;
                resultObject['to'] = arrayFlight[0].trim();
                resultObject['from'] = arrayFlight[1].trim();
                resultObject['cost'] = parseInt(arrayFlight[2]);
                console.log();
                resultObject['scale'] = (arrayFlight[3] === 'true') ? true : false;
                flights.push(resultObject);
                printInfo(resultObject);
            }
        }
    }
}

/**
 * Detete a flight by id
 * @param {*} stringIds 
 */
function deleteFlights(stringIds) {
    let arrayIds = stringIds.split(',');
    for (let i = 0; i < arrayIds.length; i++) {
        if (findFlightbyId(parseInt(arrayIds[i]))) {
            flights.splice(flights.findIndex(item => item.id === parseInt(arrayIds[i])), 1);
            console.log('Flight with ID: ' + arrayIds[i] + ' deleted');
        } else {
            console.log('Flight with ID: ' + arrayIds[i] + ' not found');
        }
    }
}

/**
 * Control admin functions
 */
function adminFunctions() {
    let action = prompt('What action do you want to do? (add/delete/exit)');
    switch (action) {
        case 'add':
            let stringToAdd = prompt('Enter flights by separating parameters with commas' +
                ' and semicolons to separate flights (MAX. 15 flights) ' +
                '(example: to, from, cost, scale; to2, from2, cost2, scale2):');
            addFlights(stringToAdd);
            break;
        case 'delete':
            let stringToDelete = prompt('Enter id\'s to delete separated by commas:');
            deleteFlights(stringToDelete);
            break;
        case 'exit':
            break;
        default:
            adminFunctions();
            break;
    }
    console.log('------');
    let repeatAction = prompt('Do you want to repeat an action? (yes/no)');
    switch (repeatAction) {
        case 'yes':
            adminFunctions();
            break;
        case 'no':
            console.log('Bye!');
            break;
    }
}

/**
 * Control user functions
 */
function userFunctions() {
    let action = prompt('What information do you want? (cheaper/expensive/equal/exit)');
    let costWanted;
    switch (action) {
        case 'cheaper':
            costWanted = prompt('Cheaper than: Enter the price to search for (example: 120)');
            getCheaperFlights(costWanted);
            break;
        case 'expensive':
            costWanted = prompt('Expensive than: Enter the price to search for (example: 120)');
            getExpensiveFlights(costWanted);
            break;
        case 'equal':
            costWanted = prompt('Enter the price to search for (example: 120)');
            getFlightsByCost(costWanted);
            break;
        case 'exit':
            break;
        default:
            userFunctions();
            break;
    }
    console.log('------');
    let repeatAction = prompt('Do you want to repeat an action? (yes/no)');
    switch (repeatAction) {
        case 'yes':
            userFunctions();
            break;
        case 'no':
            console.log('Bye!');
            break;
    }
}

/**
 * Functions for pro exercise
 */
function proFunctions() {
    let role = prompt('Are you an admin or a user? (admin/user/exit)');
    switch (role) {
        case 'admin':
            adminFunctions();
            break;
        case 'user':
            userFunctions();
            break;
        case 'exit':
            console.log('Bye!');
            break;
        default:
            proFunctions();
            break;
    }
}

/**
 * Main function
 */
function airlinesPro() {
    let userName = prompt(`What's your username?`);
    console.log('Welcome ' + userName + '!');
    console.log('------');
    console.log('Available flights:');
    for (let i = 0; i < flights.length; i++) {
        printInfo(flights[i]);
    }
    console.log('------');
    console.log('The average cost of flights is : ' + averageCost(flights) + '€');
    console.log('------');
    console.log('The following flights make stopovers: ');
    for (let i = 0; i < flights.length; i++) {
        if (flights[i].scale === true) {
            console.log('-Flight id:' + flights[i].id + ' from ' + flights[i].from + ' to ' + flights[i].to);
        }
    }
    console.log('------');
    console.log('Last flights are:');
    let contador = 0;

    for (let i = flights.length - 1; contador < 5; i--) {
        console.log('-Flight id:' + flights[i].id + ' from ' + flights[i].from + ' to ' + flights[i].to);
        contador++;
    }
    console.log('------');
    proFunctions();
}

airlinesPro();