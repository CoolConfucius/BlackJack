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

var controlledShuffle = function(deck){
	var half1 = deck.splice(0, 26); 
	var half2 = deck; 
	var half11 = half1.splice(0, 13); 
	var half12 = half1; 
	var half21 = half2.splice(0, 13); 
	var half22 = half2; 
	half11.reverse();
	half12.reverse();
	half21.reverse();
	half22.reverse();
	return half22.concat(half11, half21, half12); 
}; 
var aceDeck = ['A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663', 'A\u2663'];  

//deck = controlledShuffle(deck); 
deck = shuffle(deck); 
// deck = _.shuffle(deck);

var soft = false; 
var hit = false; 
var hand1 = [];
var hand2 = []; 
var stand = false; 
var gameOver = false; 



function init() {
	$('#start').click(startClick); 
	$('#hit').click(hitClick); 
	$('#stand').click(standClick); 
	$('#soft').click(softClick); 
	$('#restart').click(restartClick); 
};

function startClick(event){
	console.log(deck); 
	var $hand1 = $('#hand1');
	var $hand2 = $('#hand2');
	var $points = $('#points');
	starter(hand1, deck);
	starter(hand2, deck);
	var points = countHand(hand1, soft); 
	$hand1.text(hand1.toString());
	$hand2.text(hand2.toString());
	$points.text(points.toString());
};

function hitClick(event){
	if (!gameOver) {
	var $hand1 = $('#hand1');
	var $hand2 = $('#hand2');
	var $points = $('#points');
	var $win = $('#win');
	var message = ''; 
	deal(hand1, deck);
	player2AI(hand2, deck, false);
	var points = countHand(hand1, soft); 
	$hand1.text(hand1.toString());
	$hand2.text(hand2.toString());
	$points.text(points.toString());
	
	if (over21(hand1)) { 
		gameOver = true; 
		$win.text('Busted!'); 
	};
	};
};

function standClick(event){
	if (!gameOver) {
	var $hand1 = $('#hand1');
	var $hand2 = $('#hand2');
	var $points = $('#points');
	var $win = $('#win');
	stand = true; 
	player2AI(hand2, deck, true);
	isWin(hand1, hand2, soft);
	var points = countHand(hand1, soft); 
	$hand1.text(hand1.toString());
	$hand2.text(hand2.toString());
	$points.text(points.toString());
	if (isWin(hand1, hand2, soft)) {
		gameOver = true; 
		message = "you win!";
	} else {
		gameOver = true; 
		message = "you lose!";
	};
	$win.text(message);
	};
};

function softClick(event){
	var $hand1 = $('#hand1');
	var $win = $('#win');
	var $soft = $('#soft');
	var $points = $('#points');
	var message = 'Hard to soft'; 
	
	if (soft) {
		message = "Soft to hard"; 
		soft = false;
	} else {
		soft = true;
	};
	var points = countHand(hand1, soft); 
	$hand1.text(hand1.toString());
	$soft.text(message);
	$points.text(points.toString());
};

function restartClick(event){
	var $hand1 = $('#hand1');
	var $hand2 = $('#hand2');
	var $win = $('#win');
	var $soft = $('#soft');
	var $points = $('#points');
	$hand1.text('empty hand');
	$hand2.text('empty hand');
	$soft.text('Hard to soft');
	$points.text('0');
	$win.text('');
	reset(); 
}

function player2AI(hand2, deck, stand){
	if (stand){
		while( countHand(hand2, false) <= 17 ){
			deal(hand2, deck);
		}
	} else {
		if (countHand(hand2, false) <= 17) {
			deal(hand2, deck);	
		};
	};
};


var countHand = function(hand, soft){
	var ace = false;
	var points = hand.reduce(function(sum, element){
		var rank = element.split('')[0]; 
		switch (rank){
			case 'J': 
			case 'Q': 
			case 'K': 
				sum += 10; 
				break; 
			case 'A': //take soft into consideration
				if (!ace) {
					soft ? sum += 11 : sum += 1; 
					ace = true; 	
				} else sum += 1; 	
				break; 
			case '1': //handling 10s. keep in mind that 10 is two digits 
				sum += 10; 
				break; 
			default: 
				sum += parseInt(rank); 
		}
		return sum; 
	}, 0);
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

var over21 = function(hand){
	return countHand(hand, false) > 21 
}; 

var isWin = function(hand1, hand2, soft){
	var points1 = countHand(hand1, soft); 
	var points2 = countHand(hand2, false); 
	if (points1 === 21) { return true };
	if (points2 === 21) { return false };
	if (points1 > 21) { return false};
	if (points2 > 21) { return true};
	if (points1 >= points2 ) {return true};
	if (points2 >= points1 ) {return false};
	return true; 
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
	soft = false; 
  hit = false; 
  hand1 = [];
  hand2 = []; 
  stand = false; 
  gameOver = false; 
}; 

