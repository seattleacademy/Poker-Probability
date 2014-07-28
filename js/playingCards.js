$(function () {
	var valueArray = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];
	var suitArray = ["♦","♥","♠","♣"];
    var cardBack = "images/card-back-sm";
    var deckOfCards = [];
    var i, j;
	var suit;
	
	for(j = 0; j <= 3; j++) {
		suit = suitArray[j];
		for (i = 0; i <= valueArray.length-1; i++) {
			deckOfCards.push({
				value:valueArray[i],
				suit:suit
			});
			$("#deck").append("<img src=" + cardBack + ".jpg>");
		}
	}
    
    var theLength = deckOfCards.length - 1;
    var toSwap;
    var tempCard;

    function shuffle() {
        //console.log(deckOfCards);
        for (i = theLength; i > 0; i--) {
            toSwap = Math.floor(Math.random() * i);
            tempCard = deckOfCards[i];
            deckOfCards[i] = deckOfCards[toSwap];
            deckOfCards[toSwap] = tempCard;
        }
    }
	
	shuffle();
	
	function drawCard(){
	  var cardsInDeck = 52;
	  
	  /*$.each(deckOfCards, function(){
	    console.log("Value: " + this.value);
		console.log("Suit: " + this.suit);*/
		
		if(deckOfCards[0].suit === "♠" || deckOfCards[0].suit === "♣"){
		  $(".cardSuit").css('color', 'black');
		  $(".cardValue").css('color', 'black');
		}
		else {
		  $(".cardSuit").css('color', '#cc0033');
		  $(".cardValue").css('color', '#cc0033');
		}
	    $('[class=cardValue]').text(deckOfCards[0].value);
	    $('[class=cardSuit]').text(deckOfCards[0].suit);
	  //});
	  var shifted = deckOfCards.shift();
	  console.log(shifted);
	  cardsInDeck - 1;
	}
	
	$("#shuffle").on('click', shuffle);
	$("#draw").on('click', drawCard);
});