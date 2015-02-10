$(function () {
	var valueArray = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];
	var suitArray = ["♦","♥","♠","♣"];
  var cardBack = "images/card-back-sm";
  var deckOfCards = [];
  var i, j;
	var cardsInDeck = 52;
	var communityArray = [];
	var communityCount = 0;

	//fills deck array with random cards and appends images
	function init(){
		for(j = 0; j <= suitArray.length-1; j++) {
			for (i = 0; i <= valueArray.length-1; i++) {
				deckOfCards.push({
					value: valueArray[i],
					suit: suitArray[j]
				});
				$("#deck").append("<img src=" + cardBack + ".jpg>");
			}
		}
		shuffle(deckOfCards);
	} //init() end

	//shuffles the deck
	function shuffle(deck){
		for(var j, x, i = deck.length;
			i; j = Math.floor(Math.random() * i),
			x = deck[--i], deck[i] = deck[j], deck[j] = x);
		return deck;
	};

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

	function setCard(){

	}

	function drawCard(){
		if(cardsInDeck === 0){
			Apprise("The deck is empty!");
			return;
		}
		cardsInDeck -= 1; //52 start
		console.log(cardsInDeck);
		$("#cardCount").text(cardsInDeck); //changes text of number of cards left

		if(communityCount != 5){  //if community is not full
			communityArray.push({
				suit:deckOfCards[0].suit,
				value:deckOfCards[0].value
			});
			//alert(communityArray[communityCount].value + communityArray[communityCount].suit); //alerts community cards
			communityCount++;
		}
	  $("#deck img:first-child").remove(); //removes card image
	  console.log(deckOfCards.shift()); //removes card from array and logs removed card


	}

	function rules(){
	  Apprise();
	}
	function about(){
	  Apprise("The goal of this website is to just calculate the probability of winning with each draw of a card. I created this as a side project for fun.");
	}

	init();
	$("#rules").on('click', rules);
	$("#about").on('click', about);
	$("#shuffle").on('click', shuffle);
	$("#draw").on('click', drawCard);

});
