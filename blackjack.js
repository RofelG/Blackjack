function deck() {
    var deck = [];

    const suits = ['Hearts', 'Diamonds', 'Spades', 'Clubs'];
    const values = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];

    for (let suit in suits) {
        for (let value in values) {
            deck.push(values[value] + ' of ' + suits[suit]);
        }
    }

    return deck;
}

function shuffle(array) {
    var curIndex = array.length;
    var arr = [];
    var i;

    while (curIndex) {
        i = Math.floor(Math.random() * curIndex--);

        arr.push(array[i]);
    }

    return arr;
}

var newDeck = deck();
var dealerHand = [];
var playerHand = [];
var playerCalc, dealerCalc;
var playAce = false;
var dealAce = false;

// console.log(newDeck);

newDeck = shuffle(newDeck);
// console.log(newDeck);

document.getElementById('stand').style.display = 'none';
document.getElementById('hit').style.display = 'none';

function deal() {
    var newDeck = deck();
    newDeck = shuffle(newDeck);

    dealerHand = [];
    playerHand = [];

    playerCalc = 0;
    dealerCalc = 0;

    playAce = false;
    dealAce = false;

    for (var i = 0; i < 2; i++) {
        dealerHand.push(newDeck.shift());
        playerHand.push(newDeck.shift());
    }

    // console.log('Deal');
    // console.log(dealerHand);
    // console.log(playerHand);

    document.getElementById('victor').innerHTML = '';
    document.getElementById('dealerCalc').innerHTML = '';

    hideDeal();

    calc();

}

function stand() {
    while (dealerCalc < 16) {
        dealerHand.push(newDeck.shift());
        calc();
    }

    if (dealerHand.length == 2 && dealerCalc == 21) {
        // console.log('Dealer Blackjack');
        document.getElementById('victor').innerHTML = 'Dealer Blackjack!';
    }
    else if (dealerCalc > playerCalc && dealerCalc <= 21) {
        // console.log('Dealer Wins');
        document.getElementById('victor').innerHTML = 'Dealer Wins!';
    } else if (dealerCalc < playerCalc && playerCalc <= 21) {
        // console.log('Player Wins');
        document.getElementById('victor').innerHTML = 'Player Wins!';
    } else if (playerCalc == 21) {
        // console.log('Player Wins');
        document.getElementById('victor').innerHTML = 'Player Wins!';
    } else if (playerCalc > 21) {
        // console.log('Dealer Wins');
        document.getElementById('victor').innerHTML = 'Dealer Wins!';
    } else if (dealerCalc > 21) {
        // console.log('Player Wins');
        document.getElementById('victor').innerHTML = 'Player Wins!';
    } else if (playerCalc == dealerCalc) {
        // console.log('Player Push');
        document.getElementById('victor').innerHTML = 'Player Push!';
    }

    // console.log(dealerHand + ' vs. ' + playerHand);
    // console.log(dealerCalc + ' vs. ' + playerCalc);
    document.getElementById('dealerHand').innerHTML = dealerHand;
    document.getElementById('dealerCalc').innerHTML = dealerCalc;

    showDeal();
}

function hit() {
    playerHand.push(newDeck.shift());
    calc();

    if (playerCalc > 21) {
        // console.log('Player Loses');
        document.getElementById('victor').innerHTML = 'Player Loses!';
        showDeal();
    }
}

function calc() {
    playerCalc = 0;
    dealerCalc = 0;

    for (var i = 0; i < playerHand.length; i++) {
        var elem = playerHand[i].substr(0, playerHand[i].indexOf(' '));
        
        if (elem == 'Ace') {
            playAce = true;
        }

        var num = checkElem(elem);
        playerCalc += num;
    }

    // console.log('Player hand count ' + playerHand.length);

    for (var i = 0; i < dealerHand.length; i++) {
        var elem = dealerHand[i].substr(0, dealerHand[i].indexOf(' '));
        
        if (elem == 'Ace') {
            dealAce = true;
        }

        var num = checkElem(elem);
        dealerCalc += num;
        
    }

    if (playerCalc > 21 && playAce) {
        playerCalc = playerCalc - 10;
    }

    if (dealerCalc > 21 && dealAce) {
        dealerCalc = dealerCalc - 10;
    }

    if (playerHand.length == 2 && playerCalc == 21) {
        // console.log('Player Blackjack');
        document.getElementById('victor').innerHTML = 'Player Blackjack!';
        showDeal();
    }

    if (playerHand > 21) {
        // console.log('Player Bust');
        document.getElementById('victor').innerHTML = 'Player Bust!';
        showDeal();
    }

    // console.log('playerCalc = ' + playerCalc);
    // console.log('dealerCalc = ' + dealerCalc);

    document.getElementById('playerHand').innerHTML = playerHand;
    document.getElementById('dealerHand').innerHTML = dealerHand[0];
    document.getElementById('calc').innerHTML = playerCalc;
}

function checkElem(k) {
    switch(k) {
        case 'Ace':
            return 11;
        case 'Jack':
            return 10;
        case 'Queen':
            return 10;
        case 'King':
            return 10;
        default :
            return parseInt(k);
    }
}

function showDeal() {
    document.getElementById('deal').style.display = 'block';
    document.getElementById('stand').style.display = 'none';
    document.getElementById('hit').style.display = 'none';
}

function hideDeal() {
    document.getElementById('deal').style.display = 'none';
    document.getElementById('stand').style.display = 'inline-block';
    document.getElementById('hit').style.display = 'inline-block';
}