function fillDeck(){
		for(j = 0; j <= 3; j++) {
			suit = suitArray[j];
			for (i = 0; i <= valueArray.length-1; i++) {
				deckOfCards.push({
					value:valueArray[i],
					suit:suit
				});
			}
		}
	}
	fillDeck();
	
	function drawdeckOfCards(){
      $("#deck").empty();
        for (i = 0; i < deckOfCards.length; i++) {
			$("#deck").append("<img src=" + cardBack + ".jpg>");
		}
    }
    drawdeckOfCards();
	
	$("#shuffle").on('click', shuffle);

    var theLength = deckOfCards.length - 1;
    var toSwap;
    var tempCard;

    function shuffle() {
        console.log("deckOfCards before shuffle: " + deckOfCards);
        for (i = theLength; i > 0; i--) {
            toSwap = Math.floor(Math.random() * i);
            tempCard = deckOfCards[i];
            deckOfCards[i] = deckOfCards[toSwap];
            deckOfCards[toSwap] = tempCard;
        }
        console.log("deckOfCards after shuffle: "+deckOfCards);
        drawdeckOfCards();
    }