function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function find_table_position(droppableID) {
  var test = String(droppableID).split('_');
  var row = String(test[0]).split('row');
  row = row[1];
  var col = String(test[1]).split('col');
  col = col[1];

  var arry = [];
  arry.push(row);
  arry.push(col);

  return arry;
}

function find_letter(given_id) {
  for(var i = 0; i < 7; i++) {
    if(game_tiles[i].id == given_id) {
      return game_tiles[i].letter;
    }
  }

  for(var i = 0; i < complete_words.length; i++) {
    for(var x = 0; x < complete_words[i].length; x++) {
      if(given_id == complete_words[i][x].id) {
        return complete_words[i][x].letter;
      }
    }
  }

  return -1;
}

function get_random_tile() {
  var all_letters = [];
  var total_letters = 0;

  for (var i = 0; i < 26; i++) {
    var current_letter = pieces[i].letter;
    var remaining = pieces[i].remaining;
    total_letters += remaining;

    for (var x = 0; x < remaining; x++) {
      all_letters.push(current_letter);
    }
  }

  var random_num = getRandomInt(0, total_letters - 1);
  var letter = all_letters[random_num];

  for (var i = 0; i < 26; i++) {
    if (pieces[i].letter == letter) {
      pieces[i].remaining--;
      return letter;
    }
  }

  return -1;
}

function update_remaining_table() {
  var x = 0;
  var first = true;

  $('#letters_remain tr').each(function() {
    if (x > 25) {
      return true;
    }

    $(this).find('td').each(function() {
      if (first == true) {
        first = false;
        return false;
      }

      if (x > 25) {
        return false;
      }

      var letter = pieces[x].letter;
      var remaining = pieces[x].remaining;

      $(this).html(letter + ": " + remaining);

      x++;
      return true;
    });
    return true;
  });

  return true;
}

function load_pieces_array() {
  pieces = [
    {"letter":"A", "value":  1,  "amount":  9,  "remaining":  9},
    {"letter":"B", "value":  3,  "amount":  2,  "remaining":  2},
    {"letter":"C", "value":  3,  "amount":  2,  "remaining":  2},
    {"letter":"D", "value":  2,  "amount":  4,  "remaining":  4},
    {"letter":"E", "value":  1,  "amount": 12,  "remaining": 12},
    {"letter":"F", "value":  4,  "amount":  2,  "remaining":  2},
    {"letter":"G", "value":  2,  "amount":  3,  "remaining":  3},
    {"letter":"H", "value":  4,  "amount":  2,  "remaining":  2},
    {"letter":"I", "value":  1,  "amount":  9,  "remaining":  9},
    {"letter":"J", "value":  8,  "amount":  1,  "remaining":  1},
    {"letter":"K", "value":  5,  "amount":  1,  "remaining":  1},
    {"letter":"L", "value":  1,  "amount":  4,  "remaining":  4},
    {"letter":"M", "value":  3,  "amount":  2,  "remaining":  2},
    {"letter":"N", "value":  1,  "amount":  6,  "remaining":  6},
    {"letter":"O", "value":  1,  "amount":  8,  "remaining":  8},
    {"letter":"P", "value":  3,  "amount":  2,  "remaining":  2},
    {"letter":"Q", "value": 10,  "amount":  1,  "remaining":  1},
    {"letter":"R", "value":  1,  "amount":  6,  "remaining":  6},
    {"letter":"S", "value":  1,  "amount":  4,  "remaining":  4},
    {"letter":"T", "value":  1,  "amount":  6,  "remaining":  6},
    {"letter":"U", "value":  1,  "amount":  4,  "remaining":  4},
    {"letter":"V", "value":  4,  "amount":  2,  "remaining":  2},
    {"letter":"W", "value":  4,  "amount":  2,  "remaining":  2},
    {"letter":"X", "value":  8,  "amount":  1,  "remaining":  1},
    {"letter":"Y", "value":  4,  "amount":  2,  "remaining":  2},
    {"letter":"Z", "value": 10,  "amount":  1,  "remaining":  1},
    {"letter":"_", "value":  0,  "amount":  0,  "remaining":  0}
  ];
}

function fill_in_table() {
  var row = 0;
  var col = 0;

  $('#scrabble_board tr').each(function() {
    col = 0;

    $(this).find('td').each(function() {
      $(this).attr('id', 'row' + row + '_' + 'col' + col);
      col++;
    });
    
    row++;
  });
}
