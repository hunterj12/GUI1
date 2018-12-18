var pieces = [];
var game_board = [];
var complete_words = [];

var game_tiles = [
  {"id": "piece0", "letter": "A"},
  {"id": "piece1", "letter": "B"},
  {"id": "piece2", "letter": "C"},
  {"id": "piece3", "letter": "D"},
  {"id": "piece4", "letter": "E"},
  {"id": "piece5", "letter": "F"},
  {"id": "piece6", "letter": "G"}
];

var left_right = false;
var number_of_words = 0;
var startPos;
var dict = {};

$.get("files/dictionary.txt", function(txt) {
    var words = txt.split( "\n" );

    for (var i = 0; i < words.length; i++) {
        dict[words[i]] = true;
    }
});

var word_score = 0;
var first_letter = "";
var used_letters = 0;
