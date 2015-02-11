$(function () {
	var valueArray = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];
	var suitArray = ["♦","♥","♠","♣"];
  var cardBack = "images/card-back-sm";
  var deckOfCards = []
		, usedCards = []
		, communityArray = [];
	var cardsInDeck = 52;
	var communityCount = 0;
	var yourHand = []
		, oppt1Hand = []
		, oppt2Hand = []
		, oppt3Hand = []
		, oppt4Hand = []
		, oppt5Hand = [];

	//fills deck array with random cards and appends images
	function init(){
		for(var j = 0; j <= suitArray.length-1; j++) {
			for (var i = 0; i <= valueArray.length-1; i++) {
				deckOfCards.push({
					value: valueArray[i],
					suit: suitArray[j]
				});
				$("#deck").append("<img src=" + cardBack + ".jpg>");
			}
		}
		shuffle(deckOfCards);
		//rules();
	} //init() end

	//shuffles the deck
	function shuffle(deck){
		for(var j, x, i = deck.length;
			i; j = Math.floor(Math.random() * i),
			x = deck[--i], deck[i] = deck[j], deck[j] = x);
		return deck;
	};

		//resets the game
		function reset(){

		}

	/*
	function placeValue(){
		var count = 0;

		if(usedCards[count].suit === "♠" || usedCards[count].suit === "♣"){
		  $(".cardSuit").css('color', 'black');
		  $(".cardValue").css('color', 'black');
		}
		else {
		  $(".cardSuit").css('color', '#cc0033');
		  $(".cardValue").css('color', '#cc0033');
		}
		$('.cardValue').text(usedCards[count].value);
		$('.cardSuit').text(usedCards[count].suit);
		count++;
	}*/

	function placeCard(hand){
		var i;

		if(hand.length == 1)
			i = 0;
		else
			i = 1;

		var suit = hand[i].suit;
		var value = hand[i].value;

		switch(hand[i].suit){
			case "♠":
				$('.yourCardOne').html("<img src='images/classic-cards/1.png' alt='card'/>");
				break;
			case "♣":
				break;
			case "♥":
				break;
			case "♦":
				break;
			}
		}

		function initialDraw(){
			if(oppt1Hand.length == oppt2Hand.length){
				oppt1Hand.push({
					suit:deckOfCards[0].suit,
					value:deckOfCards[0].value
				})
				placeCard(oppt1Hand);
			}
		}

	//draw a card
	function dealCard(){
		var nextCard = deckOfCards[0];
		if(cardsInDeck === 0){
			alert("The deck is empty!");
			return;
		}
		cardsInDeck -= 1; //52 start
		$("#cardCount").text(cardsInDeck); //changes text of number of cards left

		if(yourHand.length != 2)
			initialDraw();

		//if community is not full and everyone has 2 cards, flop
		else if(yourHand.length == 2 && communityCount <= 3){
			for(var i = 0; i > 3; i++){
				communityArray.push({
					suit:deckOfCards[0].suit,
					value:deckOfCards[0].value
				});
				deckOfCards.shift();
				cardsInDeck -= 1;
			}
			//console.log("CA:" + communityArray[communityCount].value + communityArray[communityCount].suit); //alerts community cards
			communityCount++;
		}
	  $("#deck img:first-child").remove(); //removes card image
		usedCards.push(nextCard);
	  console.log(deckOfCards.shift()); //removes card from array and logs removed card
	}

	function rules(){
	  var rules = "Texas Hold'em Poker\n" +
								"Glossary:<br>" +
								"Community Cards - cards in the middle<br>" +
								"Hole Cards - cards for each player<br>" +
								"Pre-Flop - <br>" +
								"The Flop - Reveals 3 community cards<br>" +
								"The Turn - Reveal 4th community card<br>" +
								"The River - Reveal the 5th and final community card<br>" +
								"The Showdown - The final betting round."
								;
		alert(rules);
	}
	function about(){
	  alert("The goal of this website is to just calculate the probability of winning with each draw of a card. I created this as a side project for fun.");
	}

	init();
	$("#rules").on('click', rules);
	$("#about").on('click', about);
	$("#shuffle").on('click', shuffle);
	$("#deal").on('click', dealCard);

});
