/*
 * Create a list that holds all of your cards
 */
let cardTypes = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb']
cardTypes = cardTypes.concat(cardTypes);
const totalMatches = 8;
let playerMatches = 0;
let deck = $('.deck');
let restartBtn = $('.restart');
let restartModel = $('.restartbtn');
let closeModel = $('.closebtn');
let star = $('.start');
let modal = $('#modal');
let overLay = $('#overlay');
let openCards = [];
let moves = 0;
let clock;

overLay.hide();
modal.hide();
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
		newCard = $(`<li class="card"><i class="fa ${shuffledCards[cards]}"></i></li>`);
		deck.append(newCard.clone());
	}
}
makeCardHTML();

/*
 *  set up the event listener for a card. If a card is clicked:
 *  add the card to a *list* of "open" cards
 */
function clickCards() {
	$('.card').click(function() {
		displayCard(this);
		addCard(this);
		doesCardMatch(openCards);
		openCards[0].css('pointer-events','none');
		if (openCards.length === 2) {
			openCards[0].css('pointer-events','auto');
		}
	});
}
clickCards();

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
			openCards[0].css('pointer-events','none');
			openCards[1].css('pointer-events','none');
			openCards = [];
			playerMatches++;
			 // if all cards have matched, display a modal with the final score
			if (playerMatches === totalMatches) {
				gameEnd();
				console.log('Game Finish');
			}
		} else { 
			openCards[0].addClass('animated shake wrong');
			openCards[1].addClass('animated shake wrong');
			setTimeout(function() 
				{ openCards[0].removeClass('open show wrong animated shake'); 
				  openCards[1].removeClass('open show wrong animated shake');
				  openCards = [];}, 700);
		}
		displayMoves();
	}
}
/*
 * increment the move counter and display it on the page and call on removeStar function
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
	if (moves === 20 || moves === 40) {
		removeStar();
	}
}

// appends 3 stars to both the modal and the game
function initStars() {
	for (let i = 0; i < 3; i++) {
		$('#stars1').append('<li><i class="fa fa-star" id="star1"></i></li>');
		$('#stars2').append('<li><i class="fa fa-star" id="star2"></i></li>');
	}
}

// removes star from modal and game
function removeStar() {
	$('#star1').last().remove();
	$('#star2').last().remove();
	$('#stars1').append('<li><i class="fa fa-star-o" id="star1"></i></li>');
	$('#stars2').append('<li><i class="fa fa-star-o" id="star2"></i></li>');

}

// timer going up function https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript
function startTimer() {
	let sec = 0;
    function pad ( val ) { return val > 9 ? val : "0" + val; }
    clock = setInterval( function(){
        $(".seconds").html(pad(++sec%60));
        $(".minutes").html(pad(parseInt(sec/60,10)));
    }, 1000);
}

// this function will stop the clock when called on
function stopTimer() {
	clearInterval(clock);
}

// will restart the game when restart button is clicked
restartBtn.click(function() {
	restart();
})

// does same thing but with the modal restart button and hides the modal
restartModel.click(function() {
	overLay.hide();
	modal.hide();	
	restart();
})

// simply hides the modal
closeModel.click(function() {
	overLay.hide();
	modal.hide();
})

// opens modal and displays final score, total moves and time
function gameEnd() {
	moves += 1;
	stopTimer();
	overLay.show();
	modal.show();
	$('.final-moves').html(moves);
}
/*
 * function that is called on to restart the game, removes any open cards sets moves and amount of matches to 0
 * and reinstates the stars. Also calls on the stopTimer and displayMoves functions. 
 */
function restart() {
	$('.card').removeClass('open show');
	$('.card').removeClass('match animated bounce');
	$('.card').remove();
	$('#stars1').html('');
	$('#stars2').html('');
	initStars();
	makeCardHTML();
	moves = -1;
	playerMatches = 0;
	stopTimer();
	$(".seconds").html('00');
	$(".minutes").html('00');
	clickCards();
	displayMoves();
	openCards = [];
}
initStars();

// https://img.devrant.com/devrant/rant/r_448785_RYEUg.jpg