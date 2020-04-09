
/*
 * All Variable Declerations
 */

let deckIcons = [
    'diamond',
    'paper-plane-o',
    'anchor',
    'bolt',
    'cube',
    'leaf',
    'bicycle',
    'bomb',
    'diamond',
    'paper-plane-o',
    'anchor',
    'bolt',
    'cube',
    'leaf',
    'bicycle',
    'bomb',
];

let openedCards = [];
let matchedCards = [];
const restartBtn = document.querySelector('.restart');
const winMessage = document.querySelector('.win-message');
let moves = 0;
const movesSpan = document.querySelector('.moves');
const deckUl = document.querySelector('.deck');
const ratingStars = document.querySelector('.stars');
let seconds = 0,
    minutes = 0,
    hours = 0;
let clearTimer;
const restartGame = document.querySelector('.restart-game');
/*
 * All Function Definitons 
 */


// Shuffle function from http://stackoverflow.com/a/2450976

const shuffle = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Animate Css Function

const animateCSS = (element, animationName, callback) => {
    element.classList.add('animated', animationName);

    const handleAnimationEnd = () => {
        element.classList.remove('animated', animationName);
        element.removeEventListener('animationend', handleAnimationEnd);

        if (typeof callback === 'function') callback();
    }

    element.addEventListener('animationend', handleAnimationEnd);
}

// open Card Function

const openCard = (card) => {
    card.classList.add('open', 'show');
}

// Close Card Function

const closeCard = (card) => {
    card.classList.remove('open', 'show');
}

// Add Card To Opened Cards Array

const addToOpened = (card) => {
    openedCards.push(card);
}

// Remove Card From Opened Cards Array

const removeFromOpened = (card) => {
    openedCards.pop(card);
}

// Disable A card (Ignore Mouse Events)

const disableCard = (card) => {
    card.classList.add('disable');
}

// Disable All Cards

const disableAllCards = (allCards) => {
    allCards.forEach((card) => {
        disableCard(card);
    })
}

// Enable a Card

const enableCard = (card) => {
    card.classList.remove('disable');
}

// Enable All Cards

const enableAllCards = (allCards) => {
    allCards.forEach((card) => {
        enableCard(card);
    })
}

// Add all opened cards to matched cards array

const addToMatched = () => {
    openedCards.forEach((openedCard) => {
        openedCard.classList.add('match');
        matchedCards.push(openedCard);
    });
}

// Printe Moves into screen (DOM)

const printMoves = () => {
    movesSpan.textContent = moves;
}

// Increment Moves Counter

const incMoves = () => {
    moves++;
    printMoves();
}

// Reset Moves Function

const resetMoves = () => {
    moves = 0;
    printMoves();
}

// Clear All Cardss

const clearCards = () => {
    deckUl.innerHTML = '';
}

// Reset Rating Stars

const restStars = () => {
    const allStars = ratingStars.querySelectorAll('.stars li');
    allStars.forEach((star) => {
        star.className = 'active';
    });
}

// Remove one star

const removeStar = () => {
    const ratingStars = document.querySelectorAll('.stars li.active');
    const removeingIndex = ratingStars.length - 1;
    ratingStars[removeingIndex].classList.remove('active');
}

// Display seconds in DOM

const displaySeconds = (seconds) => {
    const secElem = document.querySelector('li.seconds');
    seconds = (seconds <= 9) ? `0${seconds}` : `${seconds}`;
    secElem.textContent = seconds;
}

// Display minutes in DOM

const displayMinutes = (minutes) => {
    const minElem = document.querySelector('li.minutes');
    minutes = (minutes <= 9) ? `0${minutes}` : `${minutes}`;

    minElem.textContent = minutes;
}

// Display hours in DOM

const displayHours = (hours) => {
    const hoursElem = document.querySelector('li.hours');
    hours = (hours <= 9) ? `0${hours}` : `${hours}`;

    hoursElem.textContent = hours;
}

// Timer function

const timer = () => {

    if (seconds === 60) {
        minutes++;
        seconds = 0;
        displayMinutes(minutes);
    }

    if (minutes === 60) {
        hours++;
        minutes = 0;
        displayMinutes(minutes);
        displayHours(hours);
    }

    seconds++;

    displaySeconds(seconds);
}

const resetTimer = () => {
    seconds = 0;
    minutes = 0;
    hours = 0;
    displaySeconds(seconds);
    displayMinutes(minutes);
    displayHours(hours);
    clearInterval(clearTimer);

}

// Display Win Message

const dispWinMessage = () => {

    // Show Win Message Div

    animateCSS(winMessage, 'fadeIn');

    winMessage.classList.add('active');


    // Stop The Timer

    clearInterval(clearTimer);
}

// Card Click Listener Function

const cardClickListener = (event) => {
    const allCards = document.querySelectorAll('.card');
    const clickedCard = event.target;

    if (clickedCard.nodeName == 'LI') {

        // open card and disable it 
        openCard(clickedCard);
        addToOpened(clickedCard);
        disableCard(clickedCard);

        if (openedCards.length === 2) {

            disableAllCards(allCards);
            if (openedCards[0].firstElementChild.className === openedCards[1].firstElementChild.className) {

                addToMatched();
                openedCards = [];
                enableAllCards(allCards);

            } else {
                setTimeout(() => {
                    openedCards.forEach((openedCard) => {
                        animateCSS(openedCard, 'shake', () => {
                            closeCard(openedCard);
                        });
                    });
                    openedCards = [];

                    enableAllCards(allCards);
                }, 500);
            }

            // Increment moves counter and print it in screen
            incMoves();
            printMoves();

            switch (moves) {
                case 22: 
                    removeStar();
                    break;
                case 20:
                    removeStar();
                    break;
                case 18:
                    removeStar();
                    break;
                case 16:
                    removeStar();
                    break;
                default:
                    // Do Nothing
            }


        } else {
            // Do Nothing
        }


        if (matchedCards.length === 16) {
            // Display Win Message
            setTimeout(dispWinMessage, 2000);
        }

    } else {
        // Do Nothing
    }
}

// Create All Cards Function

const createDeck = () => {
    let fragment = document.createDocumentFragment();

    // Shuffling the icons array

    //shuffle(deckIcons);

    deckUl.addEventListener('click', cardClickListener);

    // Start Timer when a card is clicked

    deckUl.addEventListener('click', (event) => {
        if (event.target.nodeName === 'LI') clearTimer = setInterval(timer, 1000);
    }, {once: true});

    const cardTemplate = (icon) => {
        // Creating Elements
        const cardLi = document.createElement('li');
        const cardIcon = document.createElement('i');

        // Add Classes
        cardLi.className = `card`;
        cardIcon.className = `fa fa-${icon}`;

        // Appending Elements to virtual DOM (fragment)
        cardLi.appendChild(cardIcon);
        fragment.appendChild(cardLi);
    }

    deckIcons.forEach((icon) => {
        cardTemplate(icon);
    });

    // Appending fragment to ul in active DOM
    deckUl.appendChild(fragment);

}

// Main Function - Start The Whole Game

const startGame = () => {

    // Reset Rating Stars

    restStars();

    // Reset Moves Counter

    resetMoves();

    // Reset Timer

    resetTimer();

    // Empty Opened Cards Array

    openedCards = [];

    // Empty Matched Cards Array

    matchedCards = [];

    // Clear All Cards From the DOM

    clearCards();

    // Create All Cards

    createDeck();

}

restartBtn.addEventListener('click', startGame);

restartGame.addEventListener('click', () => {
    animateCSS(winMessage, 'fadeOut', () => winMessage.classList.remove('active'));
    startGame();
});

// Call Start Game Function  - Start The Game !!!

startGame();

