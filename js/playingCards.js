$(function () {
	var valueArray = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];
	var suitArray = ["♦","♥","♠","♣"];
  var cardBack = "images/card-back-sm";
  var deckOfCards = [];
	var cardsInDeck = 52;
	var communityArray = [];
	var communityCount = 0;

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
		//dealCards();
		rules();
	} //init() end

	//shuffles the deck
	function shuffle(deck){
		for(var j, x, i = deck.length;
			i; j = Math.floor(Math.random() * i),
			x = deck[--i], deck[i] = deck[j], deck[j] = x);
		return deck;
	};

		function dealCards(){
			drawCard()
		}

		//resets the game
		function reset(){

		}

	//first draw
	function initialDraw(){
		if(deckOfCards[0].suit === "♠" || deckOfCards[0].suit === "♣"){
		  $(".cardSuit").css('color', 'black');
		  $(".cardValue").css('color', 'black');
		}
		else {
		  $(".cardSuit").css('color', '#cc0033');
		  $(".cardValue").css('color', '#cc0033');
		}
		$('.cardValue').text(deckOfCards[0].value);
		$('.cardSuit').text(deckOfCards[0].suit);
	}

	//draw a card
	function drawCard(){
		if(cardsInDeck === 0){
			alert("The deck is empty!");
			return;
		}
		cardsInDeck -= 1; //52 start
		$("#cardCount").text(cardsInDeck); //changes text of number of cards left

		if(communityCount != 5){  //if community is not full, add to community
			communityArray.push({
				suit:deckOfCards[0].suit,
				value:deckOfCards[0].value
			});
			//console.log("CA:" + communityArray[communityCount].value + communityArray[communityCount].suit); //alerts community cards
			communityCount++;
		}
	  $("#deck img:first-child").remove(); //removes card image
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
	$("#draw").on('click', drawCard);

});
