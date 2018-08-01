/*
 * Create a list that holds all of your cards
 */
const cardTypes = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb',
'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'];
const totalMatches = 8;
let playerMatches = 0;
let deck = $('.deck');
let restartBtn = $('.restart');
let openCards = [];
let moves = 0;
let clock;

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
			openCards[0].addClass('match animated bounce');
			openCards[1].addClass('match animated bounce');
			openCards = [];
			playerMatches++;
			 // if all cards have matched, display a message with the final score
			if (playerMatches === totalMatches) {
				// opens modal that shows final score, time, etc.
			}
		} else { 
			openCards[0].addClass('animated shake');
			openCards[1].addClass('animated shake');
			setTimeout(function() 
				{ openCards[0].removeClass('open show'); 
				  openCards[1].removeClass('open show');
				  openCards[0].removeClass('animated shake');
				  openCards[1].removeClass('animated shake');
				  openCards = [];}, 500);
		}
		displayMoves();
	}
}
/*
 * increment the move counter and display it on the page and call on the countStars function
 * also calls on the timer function when first move is made.
 */
function displayMoves() {
	moves += 1;
	$('.moves').text(moves);
	if (moves === 1) {
		$('.mov').text('Move');
		startTimer();
	} else {
		$('.mov').text('Moves');
	}
	countStars();
}

// count the score as game is being played
function countStars() {
	let star = $('.fa-star');
	for (num in star) {
		if (moves === 17 || 
			moves === 34 || 
			moves === 51 || 
			moves === 68) {
			star.last().remove();
	}
}
}

// timer going up function https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript
function startTimer() {
	let sec = 0;
    function pad ( val ) { return val > 9 ? val : "0" + val; }
    clock = setInterval( function(){
        $("#seconds").html(pad(++sec%60));
        $('.colon').html(':')
        $("#minutes").html(pad(parseInt(sec/60,10)));
    }, 1000);
}

// this function will stop the clock when called on
function stopTimer() {
	clearInterval(clock);
}

// will restart the game when restart button is clicked
restartBtn.click(function() {
	$('.card').removeClass('open show');
	$('.card').removeClass('match animated bounce');
	moves = -1;
	stopTimer();
	displayMoves();
	openCards = [];
})