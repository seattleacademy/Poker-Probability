var rank = [
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"10",
	"J",
	"Q",
	"K",
	"A"
];
	
var suit = [
	"D",
	"H",
	"S",
	"C"
];

function generateRank(){
  alert( Math.floor(Math.random()*rank.length));
}

function generateSuit(){
  alert( Math.floor(Math.random()*suit.length));
}