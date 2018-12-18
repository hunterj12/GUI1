function find_word(read_left) {
  var word = "";
  var current_score = 0;
  var saved_score = word_score;
  var board_length = game_board.length;
  var word_count = complete_words.length;

  $("#word").html("____");
  $("#score").html(saved_score);

  for(var i = 0; i < board_length; i++) {
    word += find_letter(game_board[i].tile);
    current_score += find_score(game_board[i].tile);
  }

  current_score += (current_score * should_double_triple_word());
  saved_score += current_score;
  $("#score").html(saved_score);

  if(word != "") {
    $("#word").html(word);
    return;
  }

  $("#word").html("____");
}

function should_double_triple_word() {
  var gameboard_length = game_board.length;

  for (var i = 0; i < gameboard_length; i++) {
    var space_ID = "#" + game_board[i].id

    if ( $(space_ID).hasClass('double_word') == true ) {
      return 1;
    }
    else if ( $(space_ID).hasClass('triple_word') == true ) {
      return 2;
    }
  }

  return 0;
}

function find_score(given_id) {
  var letter = find_letter(given_id);
  var score = 0;

  for(var i = 0; i < 27; i++) {
    var obj = pieces[i];

    if(obj.letter == letter) {
      score = obj.value;

      var extra = score * should_double_triple_letter(given_id);
      score = score + extra;

      return score;
    }
  }

  return -1;
}

function should_double_triple_letter(given_id) {
  var space;

  for(var i = 0; i < game_board.length; i++) {
    if(game_board[i].tile == given_id){
      space = "#" + game_board[i].id;
    }
  }

  if ( $(space).hasClass("double_letter") == true ) {
    return 1;
  }
  else if ( $(space).hasClass("triple_letter") == true ) {
    return 2;
  }
  
  return 0;
}
