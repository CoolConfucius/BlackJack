// Cade: There shouldn't be a toggle in Black Jack. Aces are eleven by default and their value goes to one when the total points is over 21. Think of omething so that the points subtract by 10 if total is over 21. 

// var _ = require('lodash');
// var _ = require('jQuery');
$(document).ready(init);


// var _ = require('lodash');

var suits = ['\u2663', '\u2662', '\u2660', '\u2661'];
var ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
var deck = []; 
suits.forEach(function(suit){
	ranks.forEach(function(rank){
		var card = {};
		card.rank = rank;
		card.suit = suit; 
		deck.push(rank + suit);
	});
});

function shuffle(deck) {
  var currentIndex = deck.length;
  var temp; 
  var randomIndex;
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temp = deck[currentIndex];
    deck[currentIndex] = deck[randomIndex];
    deck[randomIndex] = temp;
  }
  return deck;
}

var aceDeck = ['J\u2663', 'J\u2663', 'J\u2663', 'J\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663'];  
var bjTieStart = ['A\u2663', 'J\u2663', 'A\u2663', 'J\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663'];
var bjWinStart = ['A\u2663', 'J\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663'];
var bjLoseStart = ['A\u2663', 'A\u2663', 'A\u2663', 'J\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663'];
var bjTie = ['5\u2663', '6\u2663', '5\u2663', '6\u2663', 'J\u2663', 'J\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663'];
var bjWin = ['5\u2663', '6\u2663', '5\u2663', '6\u2663', 'J\u2663', '3\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663'];
var bjLose = ['5\u2663', '6\u2663', '5\u2663', '6\u2663', '3\u2663', 'J\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663']
var bustTie = ['8\u2663', '8\u2663', '8\u2663', '8\u2663', '9\u2663', '9\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663']
var bustLose = ['8\u2663', '8\u2663', '8\u2663', '8\u2663', '9\u2663', '2\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663']




//deck = controlledShuffle(deck); 
deck = shuffle(deck); 
// deck = _.shuffle(deck);
// deck = aceDeck; 
// deck = bjTieStart; 
// deck = bjWinStart; 
deck = bjLose; 

var hit = false; 
var hand1 = [];
var hand2 = []; 
var stand = false; 
var gameOver = false; 
var started = false; 


function init() {
	$('#start').click(startClick); 
	$('#hit').click(hitClick); 
	$('#stand').click(standClick); 
	$('#restart').click(restartClick); 
};

function startClick(event){
	console.log(deck); 
	if (!started) {
	started = true; 
	var $hand1 = $('#hand1');
	var $hand2 = $('#hand2');
	var $points = $('#points');
	var $points2 = $('#points2');
	var $win = $('#win');
	starter(hand1, deck);
	starter(hand2, deck);
	var points = softHard(hand1); 
	var points2 = softHard(hand2); 
	var message = '';
	if (points === 21 && points2 === 21) {
		message = "You both got Black Jacks at the start!";
	} else if (points === 21) {
		message = "You got a Black Jack at the start! You win!";
	} else if (points2 === 21){
		message = "Player 2 got a Black Jack at the start! You lose!";
	}
	

	$hand1.text(hand1.toString());
	$hand2.text(hand2.toString());
	$points.text(points.toString());
	$points2.text(points2.toString());
	$win.text(message); 
	};
};

function comparePoints(points, points2){
	console.log("Yes?");
	return points > points2 ? "You have more points! You win!" : "Player 2 has more points than you! You lose!";
}; 

function standResult(points2){
	console.log("Stand results!")
	if (points2 === 21) {
		return 'Player 2 has a Black Jack! You lose!';
	} else {
		if (points2 > 21) {
			return 'Player 2 got busted! You win!';
		} else {
			var points = softHard(hand1); 
			return comparePoints(points, points2, message); 
		}	
	}
	console.log("Player 2:", points2, message)
};

function hitClick(event){
	if (!gameOver && started) {
	var $hand1 = $('#hand1');
	var $hand2 = $('#hand2');
	var $points = $('#points');
	var $points2 = $('#points2');
	var $win = $('#win');
	var message = ''; 
	deal(hand1, deck);
	player2AI(hand2, deck, false);
	var points = softHard(hand1); 
	var points2 = softHard(hand2); 
	
	if (points >= 21 || points2 >= 21 ) {
		gameOver = true; 
	}
	console.log(points, points2); 
	if (points === 21 && points2 === 21) {
		console.log("a tie!"); 
		message = "You both got Black Jacks!"; 
	} else if (points === 21) { 
		message = "You got a Black Jack!"; 
	} else if (points2 === 21) {
		message = "Player 2 has a Black Jack! You lose!";
	} else {
			if (points > 21 && points2 > 21) {
				message = "You both got Busted!"; 
			} else if (points > 21) { 
				message = "You got Busted!"; 
			} else if (points2 > 21) {
				message = "Player 2 got Busted! You win!";
			}	else {
				message = comparePoints(points, points2); 
			}
	}
	
	


	$hand1.text(hand1.toString());
	$hand2.text(hand2.toString());
	$points.text(points.toString());
	$points2.text(points2.toString());
	$win.text(message); 
	};
};

function standClick(event){
	if (!gameOver && started) {
	var $hand2 = $('#hand2');
	var $points = $('#points');
	var $points2 = $('#points2');
	var $win = $('#win');
	var message = '';
	stand = true; 
	player2AI(hand2, deck, true);
	var points2 = softHard(hand2); 
	message = standResult(points2); 
	
	$hand2.text(hand2.toString());
	$points2.text(points2.toString());
	$win.text(message);
	};
};

function restartClick(event){
	var $hand1 = $('#hand1');
	var $hand2 = $('#hand2');
	var $win = $('#win');
	var $points = $('#points');
	var $points2 = $('#points2');
	$hand1.text('empty hand');
	$hand2.text('empty hand');
	$points.text('0');
	$points2.text('0');
	$win.text('');
	reset(); 
}

function player2AI(hand2, deck, stand){	
	if (stand){
		while( softHard(hand2) <= 17 ){
			deal(hand2, deck);
		}
	} else {
		if ( softHard(hand2) <= 17) {
			deal(hand2, deck);	
		};
	};
};


var countHand = function(hand){
	var points = hand.reduce(function(sum, element){
		var rank = element.split('')[0]; 
		switch (rank){
			case 'J': 
			case 'Q': 
			case 'K': 
				sum += 10; 
				break; 
			case 'A': 
				sum += 11 
				break; 
			case '1': 
				sum += 10; 
				break; 
			default: 
				sum += parseInt(rank); 
		}
		return sum; 
	}, 0);
	return points; 
}; 

var getAces = function(hand){
	var aces = hand.reduce(function(sum, element){		
		if (element.split('')[0] === 'A') {
			sum += 1; 
		};
		return sum; 
	}, 0);
	return aces; 
};

var softHard = function(hand){
 var points = countHand(hand); 
 	if (points > 21) {
		var aces = getAces(hand); 
		while (points > 21 && aces > 0){
			aces -= 1; 
			points -= 10; 
		}
 	};
 	return points; 
}; 


var deal = function(hand, deck){
	hand.push(deck[0]); 
	deck.shift(); 
}; 

var starter = function(hand, deck){
	deal(hand, deck);
	deal(hand, deck);	
};


var reset = function(){
	deck = []; 
	suits.forEach(function(suit){
		ranks.forEach(function(rank){
			var card = {};
			card.rank = rank;
			card.suit = suit; 
			deck.push(rank + suit);
		});
	});
	deck = shuffle(deck); 
  hit = false; 
  hand1 = [];
  hand2 = []; 
  stand = false; 
  gameOver = false; 
  started = false; 
}; 

