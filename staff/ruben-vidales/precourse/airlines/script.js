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

function roundNumber(number) {
    return Math.round(number * 100) / 100;
}

function printInfo(flightObject) {
    let stringScale = (flightObject.scale) ? 'realiza escala' : 'no realiza ninguna escala';
    console.log('El vuelo con origen: ' + flightObject.from + ', y destino: ' + flightObject.to + ' tiene un coste de ' +
        flightObject.cost + '€ y ' + stringScale);
}

function averageCost(flightsArray) {
    let costsSum = 0;
    for (let i = 0; i < flightsArray.length; i++) {
        costsSum += flightsArray[i].cost;
    }
    return roundNumber(costsSum / flightsArray.length);
}

function airlines() {
    let userName = prompt(`What's your username?`);
    console.log('Welcome ' + userName + '!');
    console.log('------');
    console.log('Vuelos disponibles:');
    for (let i = 0; i < flights.length; i++) {
        printInfo(flights[i]);
    }
    console.log('------');
    console.log('El coste medio de los vuelos es: ' + averageCost(flights) + '€');
    console.log('------');
    console.log('Los siguientes vuelos realizan escala: ');
    for (let i = 0; i < flights.length; i++) {
        if (flights[i].scale === true) {
            console.log('-Vuelo ' + flights[i].id + ' de ' + flights[i].from + ' a ' + flights[i].to);
        }
    }
    console.log('------');
    console.log('Los últimos 5 vuelos son: ');
    let contador = 0;
    
    for (let i = flights.length - 1; contador < 5; i--) {
        console.log('-Vuelo ' + flights[i].id + ' de ' + flights[i].from + ' a ' + flights[i].to);
        contador++;
    }
    
}

airlines();