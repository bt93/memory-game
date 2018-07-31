/*
 * Create a list that holds all of your cards
 */
const cardTypes = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb',
'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'];
let deck = $('.deck');
let openCards = [];
let moves = 0;

// Display the cards on the page

/* 
* shuffle the list of cards 
* shuffle function from http://stackoverflow.com/a/2450976
*/
function shuffle(array) {
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

/* 
 * loop through each card and create its HTML
 * add each card's HTML to the page
*/
function makeCardHTML() {
	let shuffledCards = shuffle(cardTypes);
	let newCard;
	for (cards in shuffledCards) {
		newCard = $('<li class="card"><i class="fa '+ shuffledCards[cards] + '"></i></li>');
		deck.append(newCard.clone());
	}
}
makeCardHTML();

/*
 *  set up the event listener for a card. If a card is clicked:
 *  add the card to a *list* of "open" cards
 */
	
$('.card').click(function() {
	displayCard(this);
	addCard(this);
	doesCardMatch(openCards);
});

// display the card's symbol
function displayCard(card) {
	return $(card).toggleClass('open show');
}
// pushes the selected card onto the openCard list.
function addCard(card) {
	return openCards.push($(card));
}

/*
 * if the list already has another card, check to see if the two cards match
 * if the cards do match, lock the cards in the open position
 * if the cards do not match, remove the cards from the list and hide the card's symbol
 */
function doesCardMatch(card) {
	if (card.length === 2) {
		if (openCards[0][0].firstChild.className === openCards[1][0].firstChild.className) {
			openCards[0].addClass('match');
			openCards[1].addClass('match');
			openCards = [];
		} else { 
			setTimeout(function() 
				{ openCards[0].toggleClass('open show'); 
				  openCards[1].toggleClass('open show');
				  openCards = [];}, 1000);
		}
	displayMoves();
	}
}

 // increment the move counter and display it on the page 
function displayMoves() {
	moves += 1;
	$('.moves').text(moves);
	if (moves === 1) {
		$('.mov').text('Move');
	} else {
		$('.mov').text('Moves');
	}
}

 // if all cards have matched, display a message with the final score
 // function finalScore() {
 // }