// Variables to hold counter element values
const valueProfit = document.getElementById('valueProfit');
const valueBankroll = document.getElementById('valueBankroll');
const valueBet = document.getElementById('valueBet');
const valuePayout = document.getElementById('valuePayout');
const valueSpins = document.getElementById('valueSpins');

// Set global variables for bet elements
const buttonPlus = document.getElementById('buttonPlus');
const buttonMinus = document.getElementById('buttonMinus');

// Do something to add or subtract from bet value
buttonPlus.addEventListener('click', () => {
    const currentBet = Number(valueBet.innerText);
    const currentBankroll = Number(valueBankroll.innerText);
    if (currentBankroll >= currentBet + 5) {
        valueBet.innerText = currentBet + 5;
        calculatePayout(Number(valueBet.innerText));
    }
});

buttonMinus.addEventListener('click', () => {
    const currentBet = Number(valueBet.innerText);
    if (currentBet >= 5) {
        valueBet.innerText = currentBet - 5;
        calculatePayout(Number(valueBet.innerText));
    }
});

// Calculate payout value
function calculatePayout(valueBet) {
    const oddsSelected = Number(document.querySelector('.handSelected').querySelector('.oddsValue').firstElementChild.innerText.split(',').join(''));
    const currentPayout = Math.floor(valueBet * oddsSelected)
    valuePayout.innerText = currentPayout + valueBet;
}

// Variables to hold probability card elements
const handRoyalStraightFlush = document.getElementById('handRoyalStraightFlush');
const handStraightFlush = document.getElementById('handStraightFlush');
const handFourOfKind = document.getElementById('handFourOfKind');
const handFullHouse = document.getElementById('handFullHouse');
const handFlush = document.getElementById('handFlush');
const handStraight = document.getElementById('handStraight');
const handThreeOfKind = document.getElementById('handThreeOfKind');
const handTwoPair = document.getElementById('handTwoPair');
const handOnePair = document.getElementById('handOnePair');
const handHighCard = document.getElementById('handHighCard');

// Variable to hold selected hand
let handSelected = document.querySelector('.handSelected');

// Do something when selecting a hand
handRoyalStraightFlush.addEventListener('click', () => {
    changeHandSelected(handRoyalStraightFlush);
});
handStraightFlush.addEventListener('click', () => {
    changeHandSelected(handStraightFlush);
});
handFourOfKind.addEventListener('click', () => {
    changeHandSelected(handFourOfKind);
});
handFullHouse.addEventListener('click', () => {
    changeHandSelected(handFullHouse);
});
handFlush.addEventListener('click', () => {
    changeHandSelected(handFlush);
});
handStraight.addEventListener('click', () => {
    changeHandSelected(handStraight);
});
handThreeOfKind.addEventListener('click', () => {
    changeHandSelected(handThreeOfKind);
});
handTwoPair.addEventListener('click', () => {
    changeHandSelected(handTwoPair);
});
handOnePair.addEventListener('click', () => {
    changeHandSelected(handOnePair);
});
handHighCard.addEventListener('click', () => {
    changeHandSelected(handHighCard);
});

// Change selected hand
function changeHandSelected(hand) {
    handSelected.classList.remove('handSelected');
    hand.classList.add('handSelected');
    handSelected = hand;
    calculatePayout(Number(valueBet.innerText));
}

// Set global variable for play element
const buttonSpin = document.getElementById('buttonSpin');
// Do something to play
buttonSpin.addEventListener('click', () => {
    addSpin(Number(valueSpins.innerText));
    gameOn();
});

// Change spin count
function addSpin(spins) {
    spins += 1;
    valueSpins.innerText = spins;
}

// Variables to hold message elements
const displayWin = document.getElementById('displayWin');
const displayHand = document.getElementById('displayHand');

// Play the game
function gameOn() {
    const handCurrent = getHand([]);
    let handWinner = [];
    handWinner.push(checkStraightFlush(handCurrent));
    handWinner.push(checkMatches(handCurrent));
    handWinner.push(checkFlush(handCurrent));
    handWinner.push(checkStraight(handCurrent));
    if (Number(valueBet.innerText) < 1) {
        displayWin.innerText = 'You Win!';
        return logWin();
    }
    else {
        if (handSelected.id === 'handHighCard') {
            const randomNumer = Math.random();
            console.log(randomNumer);
            if (randomNumer * 100 > Number(document.getElementById('handHighCard').querySelector('.probabilityPercent').innerText.split('%').join(''))) {
                displayWin.innerText = 'You Win!';
                return logWin();
            }
        }
        else {
            for (let i = 0; i < handWinner.length; i++) {
                console.log(handSelected.id);
                console.log(handWinner[i]);
                if (handWinner[i] === handSelected.id) {
                    displayWin.innerText = 'You Win!';
                    return logWin();
                }
            }
        }
    }

    displayWin.innerText = 'You Lose!';
    return logLoss();
}

// Get your hand
function getHand(hand) {
    for (let i = 0; i < 5; i++) {
        const card = validCard(hand);
        hand.push(card);
        showCard(i, card);
    }
    return hand;
}

// Make sure each card is unique
function validCard(hand) {
    let card = drawCard();
    for (let i = 0; i < hand.length; i++) {
        if (card[0] === hand[i][0] && card[1] === hand[i][1]) {
            return validCard(hand);
        }
    }
    return card;
}

// Draw card from deck
function drawCard() {
    const randomNumber = Math.random();
    const card = [0, 0];
    if (randomNumber < (1 / 13)) {
        card[0] = 1;
    }
    else if (randomNumber < (2 / 13)) {
        card[0] = 2;
    }
    else if (randomNumber < (3 / 13)) {
        card[0] = 3;
    }
    else if (randomNumber < (4 / 13)) {
        card[0] = 4;
    }
    else if (randomNumber < (5 / 13)) {
        card[0] = 5;
    }
    else if (randomNumber < (6 / 13)) {
        card[0] = 6;
    }
    else if (randomNumber < (7 / 13)) {
        card[0] = 7;
    }
    else if (randomNumber < (8 / 13)) {
        card[0] = 8;
    }
    else if (randomNumber < (9 / 13)) {
        card[0] = 9;
    }
    else if (randomNumber < (10 / 13)) {
        card[0] = 10;
    }
    else if (randomNumber < (11 / 13)) {
        card[0] = 11;
    }
    else if (randomNumber < (12 / 13)) {
        card[0] = 12;
    }
    else {
        card[0] = 13;
    }

    if (randomNumber < (1 / 4)) {
        card[1] = 1;
    }
    else if (randomNumber < (2 / 4)) {
        card[1] = 2;
    }
    else if (randomNumber < (3 / 4)) {
        card[1] = 3;
    }
    else {
        card[1] = 4;
    }
    return card;
}

// Show the card that was drawn
function showCard(nCard, card) {
    let currentCard;
    if (nCard < 1) {
        currentCard = document.getElementById('cardOne');
    }
    else if (nCard < 2) {
        currentCard = document.getElementById('cardTwo');
    }
    else if (nCard < 3) {
        currentCard = document.getElementById('cardThree');
    }
    else if (nCard < 4) {
        currentCard = document.getElementById('cardFour');
    }
    else if (nCard < 5) {
        currentCard = document.getElementById('cardFive');
    }

    if (card[0] < 10) {
        currentCard.querySelector('.cardValue').innerText = card[0] + 1;
    }
    else if (card[0] < 11) {
        currentCard.querySelector('.cardValue').innerText = 'J'
    }
    else if (card[0] < 12) {
        currentCard.querySelector('.cardValue').innerText = 'Q'
    }
    else if (card[0] < 13) {
        currentCard.querySelector('.cardValue').innerText = 'K'
    }
    else {
        currentCard.querySelector('.cardValue').innerText = 'A'
    }

    if (card[1] < 2) {
        changeCardSuit(currentCard, '&spades;');
    }
    else if (card[1] < 3) {
        changeCardSuit(currentCard, '&hearts;');
    }
    else if (card[1] < 4) {
        changeCardSuit(currentCard, '&diams;');
    }
    else if (card[1] < 5) {
        changeCardSuit(currentCard, '&clubs;');
    }
}

// Change the card suit to match the drawn card
function changeCardSuit(currentCard, cardSuit) {
    const card = currentCard.querySelectorAll('.cardSuit');
    for (let i = 0; i < card.length; i++) {
        card[i].innerHTML = cardSuit;
    }
}

// Check if the hand is a straight
function checkStraight(hand) {
    let valueCards = [];
    for (let i = 0; i < hand.length; i++) {
        valueCards[i] = hand[i][0];
    }
    valueCards.join();
    valueCards.sort();
    valueCards.sort(compareNumber);
    for (let i = 0; i < 4; i++) {
        if (valueCards[i] + 1 !== valueCards[i + 1]) {
            return false;
        }
    }
    return 'handStraight';
}

// Order the cards
function compareNumber(a, b) {
    return a - b;
}
// Check if the hand is a flush
function checkFlush(hand) {
    let suit = hand[0][1];
    for (let i = 0; i < hand.length; i++) {
        if (hand[i][1] !== suit) {
            return false;
        }
    }
    return 'handFlush';
}

// Check if the hand is a royal straight flush or a straight flush
function checkStraightFlush(hand) {
    if (checkStraight(hand) === 'straight' && checkFlush === 'flush') {
        if (hand[0][0] > 9) {
            return 'handRoyalStraightFlush';
        }
        else {
            return 'handStraightFlush';
        }
    }
    else {
        return false;
    }
}

// Check if there are cards that match
function checkMatches(hand) {
    let nMatches;
    for (let i = 0; i < hand.length; i++) {
        for (let j = 0; j < hand.length; j++) {
            if (hand[i][0] === hand[j][0]) {
                nMatches++;
            }
        }
        nMatches--;
    }
    if (nMatches == 2) {
        return 'handOnePair';
    }
    else if (nMatches == 4) {
        return 'handTwoPair';
    }
    else if (nMatches == 6) {
        return 'handThreeOfKind'
    }
    else if (nMatches == 8) {
        return 'handFullHouse'
    }
    else if (nMatches == 12) {
        return 'handFourOfKind'
    }
    else {
        return false;
    }
}

// Do something when you win
function logWin() {
    valueProfit.innerText = Number(valueProfit.innerText) + Number(valuePayout.innerText);
    valueBankroll.innerText = Number(valueBankroll.innerText) + Number(valuePayout.innerText)
}

// Do something when you lose
function logLoss() {

    valueProfit.innerText = Number(valueProfit.innerText) - Number(valueBet.innerText);
    valueBankroll.innerText = Number(valueBankroll.innerText) - Number(valueBet.innerText)

    if (Number(valueBet.innerText) > Number(valueBankroll.innerText)) {
        valueBet.innerText = valueBankroll.innerText;
    }
}