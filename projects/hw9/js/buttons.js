function submit_word() {
  find_word();

  var word = $("#word").html();

  if (word == "____") {
    $("#messages").html("<br><div class='highlight_centered_error'> \
    Play a tile before checking the word.</div>");
    return -1;
  }

  word = word.toLowerCase();

  if (dict[ word ]) {
    $("#messages").html("<br><div class='highlight_centered_success'> \
    Nice job! \"" + word + "\" is a word in the game's dictionary!<br><br> \
    <button class='smaller_button' onclick='confirm_save_word();'>Save Word & Play Again.</button><br><br></div>");
    return 1;
  }
  else {
    $("#messages").html("<br><div class='highlight_centered_error'> \
    Sorry. \"" + word + "\" is not a word in the game's dictionary. \
    Try a different word.</div>");
    return -1;
  }
}

function confirm_save_word() {
  swal({
    title: "Are you sure?",
    text: "This will save the current word to the game board.\n\
    You will not be able to modify the word afterwards.\n \
    Are you sure you want to keep this word and play another one?",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes.",
    closeOnConfirm: true
    },

    function(isConfirm) {
      if (isConfirm) {
        save_word();
        return false;
      }
      else {
        $("#messages").html("<br><div class='highlight_centered_error'> \
        SUBMIT WORD CANCELED.</div>");
        return false;
      }
  });
}

function save_word() {
  var game_board_length = game_board.length;
  var word;
  var index = 0;

  $("#messages").html("<br><div class='highlight_centered_success'> \
  SAVING WORD.</div>");

  word = [];

  for(var i = 0; i < game_board_length; i++) {
    var obj = {};
    obj["id"] = game_board[i].id;
    obj["letter"] = find_letter(game_board[i].tile);
    var tile_ID = game_board[i].tile;

    word.push(obj);

    $("#" + obj["id"]).droppable('disable');

    try {
      $("#" + tile_ID).draggable('disable');
      $("#" + tile_ID).attr("id", "disabled" + (i + complete_words.length) );

      var new_letter = get_random_tile();

      for(var x = 0; x < 7; x++) {
        if(game_tiles[x].id == tile_ID) {
          index = x;
          game_tiles[x].letter = new_letter;
        }
      }

      var base_URL = "img/scrabble/Scrabble_Tile_";
      var new_piece = "<img class='pieces' id='piece" + index + "' src='" + base_URL + new_letter + ".jpg" + "'></img>";
      $("#rack").append(new_piece);

      $("#piece" + index).draggable({
        appendTo: scrabble_board,
        revert: "invalid",
        start: function(ev, ui) {
          startPos = ui.helper.position();
        },
        stop: function() {
          $(this).draggable('option','revert','invalid');
        }
      });
    }
    catch(e) {}
  }

  word_score = parseInt($("#score").html());
  complete_words.push(word);
  game_board = [];

  reset_tiles();
  find_word();
  update_remaining_table();

  return;
}

function reset_tiles() {
  $("#messages").html("<br><div class='highlight_centered_success'> \
  MOVING ALL TILES BACK TO THE RACK.</div>");

  for(var i = 0; i < 7; i++) {
    var piece_ID = "#piece" + i;
    var pos = $("#the_rack").position();

    var img_left = pos.left + 30 + (50 * i);
    var img_top = pos.top + 30;

    $(piece_ID).css("left", img_left).css("top", img_top).css("position", "absolute");
    $('#rack').append($(piece_ID));
  }

  game_board = [];
  used_letters = 0;

  find_word();

  return;
}

function confirm_reset() {
  swal({
    title: "Are you sure?",
    text: "This will clear the ENTIRE game board, reset your tiles and destroy \
    any words that were placed.\n Are you really sure you want to do this?",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes.",
    closeOnConfirm: true
    },
    function(isConfirm) {
      if (isConfirm) {
        reset_game_board();
        return false;
      }
      else {
        $("#messages").html("<br><div class='highlight_centered_success'> \
        RESET BOARD CANCELED.</div>");
        return false;
      }
  });
}

function reset_game_board() {
  var word_count = complete_words.length;
  game_board = [];

  load_pieces_array();

  word_score = 0;
  used_letters = 0;

  for(var i = 0; i < 7; i++) {
    var tileID = '#' + game_tiles[i].id;
    $(tileID).draggable("destroy");
    $(tileID).remove();
  }

  for(var i = 0; i < word_count; i++) {
    for(var x = 0; x < complete_words[i].length; x++) {
      var space = complete_words[i][x].id;

      $("#" + space).droppable("enable");
      $("#disabled" + (i + x)).remove();
    }
  }

  complete_words = [];

  load_scrabble_pieces();
  find_word();
  update_remaining_table();

  $("#messages").html("<br><div class='highlight_centered_success'> \
  BOARD AND TILES RESET.<br>CHECK THE RACK FOR NEW TILES.</div>");
  
  return;
}
