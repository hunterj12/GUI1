function load_droppable_targets() {
  $("#get_new_tile").droppable( {
    accept: ".ui-draggable",
    appendTo: "body",
    drop: function(event, ui) {
      var draggableID = ui.draggable.attr("id");
      var droppableID = $(this).attr("id");

      $("#messages").html("<br><div class='highlight_centered_success'> \
      Swapping old tile with a new one.</div>");

      var new_letter = get_random_tile();
      var old_letter = find_letter(draggableID);

      for(var i = 0; i < 26; i++) {
        if(pieces[i].letter == old_letter) {
          pieces[i].remaining++;
        }
      }

      for(var i = 0; i < 7; i++) {
        if(game_tiles[i].id == draggableID) {
          game_tiles[i].letter = new_letter;
        }
      }

      $("#" + draggableID).attr("src", "img/scrabble/Scrabble_Tile_" + new_letter + ".jpg");

      var posX = startPos.left;
      var posY = startPos.top;

      ui.draggable.css("left", posX);
      ui.draggable.css("top", posY);
      ui.draggable.css("position", "absolute");

      update_remaining_table();
      find_word();
    }
  });

  $("#the_rack").droppable( {
    accept: ".ui-draggable",
    appendTo: "body",
    drop: function(event, ui) {
      var draggableID = ui.draggable.attr("id");
      var droppableID = $(this).attr("id");

      var gameboard_length = game_board.length;
      var number_of_words = complete_words.length;

      for(var i = 0; i < gameboard_length; i++) {
        if (game_board[i].tile == draggableID) {
          var spot_id = "#" + game_board[i].id;
          $(spot_id).droppable("enable");

          game_board.splice(i, 1);

          find_word();

          var currentPos = ui.helper.position();
          var posX = parseInt(currentPos.left);
          var posY = parseInt(currentPos.top);

          ui.draggable.css("left", posX);
          ui.draggable.css("top", posY);
          ui.draggable.css("position", "absolute");

          $('#rack').append($(ui.draggable));

          if(number_of_words > 0) {
            if(gameboard_length - 1 <= used_letters) {
              game_board.splice(0, gameboard_length);
              used_letters = 0;
            }
          }

          find_word();
          return;
        }
      }
    }
  });

  $("#scrabble_board td").droppable({
    accept: ".ui-draggable",
    appendTo: "body",
    drop: function(event, ui) {
      var draggableID = ui.draggable.attr("id");
      var droppableID = $(this).attr("id");
      var duplicate = false;
      var dup_index = 0;
      var insert_beg = false;
      var star_spot = "row7_col7";
      var gameboard_length = 0;
      var number_of_words = 0;
      var valid = 0;
      var prev_spaceID = "";

      $("#messages").html("");

      gameboard_length = game_board.length;
      number_of_words = complete_words.length;

      for (var i = 0; i < gameboard_length; i++) {
        if (game_board[i].tile == draggableID) {
          duplicate = true;
          dup_index = i;
        }
      }

      if (duplicate == true) {
          $("#messages").html("<br><div class='highlight_centered_error'> \
          Tiles that are already on the board cannot be moved. \
          You need to return the tile to the rack to move it. \
          You can swap two tiles by dropping a new tile on top of a \
          currently played tile.</div>");

          ui.draggable.draggable('option', 'revert', true);

          return;
      }

      if($(this).find(".ui-draggable").length == 1 ) {
        var original_tile = $("#" + droppableID).find("img")[0].id;

        var posX = startPos.left;
        var posY = startPos.top;

        $("#" + original_tile).css("left", posX);
        $("#" + original_tile).css("top", posY);
        $("#" + original_tile).css("position", "absolute");

        $('#rack').append($("#" + original_tile));

        ui.draggable.css("top", $(this).css("top"));
        ui.draggable.css("left", $(this).css("left"));
        ui.draggable.css("position", "relative");

        $(this).append($(ui.draggable));

        for(var i = 0; i < gameboard_length; i++) {
          if(game_board[i].tile == original_tile) {
            game_board[i].tile = draggableID;
          }
        }

        find_word();

        return;
      }

      if(number_of_words == 0) {
        if (gameboard_length == 0) {
          if (droppableID != star_spot) {
            $("#messages").html("<br><div class='highlight_centered_error'> \
            Please start in the middle of the board.</div>");

            ui.draggable.draggable('option', 'revert', true);

            return;
          }
          else {
            $("#messages").html("");
          }
        }

        if (gameboard_length == 1 || (gameboard_length == 2 && duplicate == true) ) {
          var past_pos = find_table_position(game_board[0].id);
          var cur_pos = find_table_position(droppableID);

          allowed_arrays = [
            [parseInt(past_pos[0]) - 1, past_pos[1]],
            [parseInt(past_pos[0]) + 1, past_pos[1]],
            [past_pos[0], parseInt(past_pos[1]) - 1],
            [past_pos[0], parseInt(past_pos[1]) + 1]
          ];

          var test = cur_pos.toString();

          if (test == allowed_arrays[0].toString() || test == allowed_arrays[1].toString()) {
            left_right = false;

            if (test == allowed_arrays[0].toString()) {
              insert_beg = true;
            }
          }
          else if (test == allowed_arrays[2].toString() || test == allowed_arrays[3].toString()) {
            left_right = true;

            if (test == allowed_arrays[2].toString()) {
              insert_beg = true;
            }
          }
          else {
            $("#messages").html("<br><div class='highlight_centered_error'> \
            Diagonals are not allowed if at least one tile has been placed.</div>");

            ui.draggable.draggable('option', 'revert', true);

            return;
          }
        }

        if (gameboard_length >= 2) {
          if (left_right == true) {
            var valid_left = find_table_position(game_board[0].id);
            var valid_right = find_table_position(game_board[gameboard_length - 1].id);
            var cur_pos = find_table_position(droppableID);

            valid_left[1] = parseInt(valid_left[1]) - 1;
            valid_right[1] = parseInt(valid_right[1]) + 1;

            var test = cur_pos.toString();

            if (test == valid_left.toString() || test == valid_right.toString()) {
              if(test == valid_left.toString()) {
                insert_beg = true;
              }
            }
            else {
              $("#messages").html("<br><div class='highlight_centered_error'> \
              Only left and right placements are allowed when 2 or more tiles are played.</div>");

              ui.draggable.draggable('option', 'revert', true);

              return;
            }
          }
          else {
            var valid_top = find_table_position(game_board[0].id);
            var valid_bottom = find_table_position(game_board[gameboard_length - 1].id);
            var cur_pos = find_table_position(droppableID);

            valid_top[0] = parseInt(valid_top[0]) - 1;
            valid_bottom[0] = parseInt(valid_bottom[0]) + 1;

            var test = cur_pos.toString();

            if (test == valid_top.toString() || test == valid_bottom.toString()) {
              if (test == valid_top.toString()) {
                insert_beg = true;
              }
            }
            else {
              $("#messages").html("<br><div class='highlight_centered_error'> \
              Only up and down positions are allowed when 2 or more tiles are played.</div>");

              ui.draggable.draggable('option', 'revert', true);

              return;
            }
          }
        }
      }
      else {
        var possible_moves = [];

        for(var i = 0; i < number_of_words; i++) {
          var num_tiles = complete_words[i].length;

          for(var x = 0; x < num_tiles; x++) {
            var cur_letterID = complete_words[i][x].id;
            var coordinates = find_table_position(cur_letterID);

            if(gameboard_length < 1) {
              valid = [
                "row" + (parseInt(coordinates[0]) - 1) + "_col" + coordinates[1],
                "row" + (parseInt(coordinates[0]) + 1) + "_col" + coordinates[1],
                "row" + (coordinates[0]) + "_col" + (parseInt(coordinates[1]) - 1),
                "row" + (coordinates[0]) + "_col" + (parseInt(coordinates[1]) + 1)
              ];
            }
            else if(gameboard_length >= 1 && left_right == true) {
              valid = [
                "row" + (coordinates[0]) + "_col" + (parseInt(coordinates[1]) - 1),
                "row" + (coordinates[0]) + "_col" + (parseInt(coordinates[1]) + 1)
              ];

              var test_spaceID = game_board[0];
              var test_coord = find_table_position(test_spaceID);

              if (test_coord[0] != valid[0]) {
                valid = [];
              }
            }
            else if(gameboard_length >= 1 && left_right == false) {
              valid = [
                "row" + (parseInt(coordinates[0]) - 1) + "_col" + coordinates[1],
                "row" + (parseInt(coordinates[0]) + 1) + "_col" + coordinates[1]
              ];

              var test_spaceID = game_board[0];
              var test_coord = find_table_position(test_spaceID);

              if (test_coord[1] != valid[1]) {
                valid = [];
              }
            }

            if(gameboard_length == 0) {
              for(y = 0; y < 4; y++) {
                if(String(valid[y]) == String(droppableID)) {
                  prev_spaceID = cur_letterID;
                }

                possible_moves.push(String(valid[y]));
              }
            }
            else {
              for(y = 0; y < 2; y++) {
                if(String(valid[y]) == String(droppableID)) {
                  prev_spaceID = cur_letterID;
                }

                possible_moves.push(String(valid[y]));
              }
            }
          }
        }

        for(var i = 0; i < gameboard_length; i++) {
          var cur_letterID = game_board[i].id;
          var coordinates = find_table_position(cur_letterID);

          if(gameboard_length < 1) {
            valid = [
              "row" + (parseInt(coordinates[0]) - 1) + "_col" + coordinates[1],
              "row" + (parseInt(coordinates[0]) + 1) + "_col" + coordinates[1],
              "row" + (coordinates[0]) + "_col" + (parseInt(coordinates[1]) - 1),
              "row" + (coordinates[0]) + "_col" + (parseInt(coordinates[1]) + 1)
            ];
          }
          else if(gameboard_length >= 1 && left_right == true) {
            valid = [
              "row" + (coordinates[0]) + "_col" + (parseInt(coordinates[1]) - 1),
              "row" + (coordinates[0]) + "_col" + (parseInt(coordinates[1]) + 1)
            ];
          }
          else if(gameboard_length >= 1 && left_right == false) {
            valid = [
              "row" + (parseInt(coordinates[0]) - 1) + "_col" + coordinates[1],
              "row" + (parseInt(coordinates[0]) + 1) + "_col" + coordinates[1]
            ];
          }

          if(gameboard_length == 0) {
            for(y = 0; y < 4; y++) {
              if(String(valid[y]) == droppableID) {
                prev_spaceID = cur_letterID;
              }

              possible_moves.push(String(valid[y]));
            }
          }
          else {
            for(y = 0; y < 2; y++) {
              if(String(valid[y]) == droppableID) {
                prev_spaceID = cur_letterID;
              }

              possible_moves.push(String(valid[y]));
            }
          }
        }

        var is_valid = possible_moves.indexOf(droppableID);

        if(is_valid != -1) {
          $("#messages").html("");

          var past_row;
          var past_col;
          var new_row
          var new_col;

          var tmp_pos = find_table_position(droppableID);
          new_row = parseInt(tmp_pos[0]);
          new_col = parseInt(tmp_pos[1]);

          tmp_pos = find_table_position(prev_spaceID);
          past_row = parseInt(tmp_pos[0]);
          past_col = parseInt(tmp_pos[1]);

          if(gameboard_length == 0) {
            if(past_row == new_row) {
              left_right = true;
            }
            else {
              left_right = false;
            }
          }

          if(left_right == true) {
            if(new_col <= past_col) {
              insert_beg = true;
            }
            else if (new_col < past_col) {
              insert_beg = false;
            }
          }
          else if (left_right == false) {
            if(new_row <= past_row) {
              insert_beg = true;
            }
            else if (new_row > past_row) {
              insert_beg = false;
            }
          }

          if(gameboard_length == 0) {
            if(left_right == true) {
              var test_word = true;
              var col_index = parseInt(new_col);

              if(insert_beg != true) {
                col_index = new_col - 1;
              }
              else {
                col_index = new_col + 1;
              }

              while(test_word == true) {
                var row_pos = new_row;
                var col_pos = col_index;
                var test_cord = "row" + row_pos + "_col" + col_pos;

                if(find_letter(test_cord) != -1 && test_word == true) {
                  var tmp_obj = {};
                  tmp_obj['id'] = test_cord;
                  tmp_obj['tile'] = test_cord;

                  if(insert_beg != true) {
                    game_board.unshift(tmp_obj);
                    col_index--;
                  }
                  else {
                    game_board.push(tmp_obj);
                    col_index++;
                  }

                  used_letters++;
                }
                else {
                  test_word = false;
                }
              }
            }
            else {
              var test_word = true;
              var row_index = parseInt(new_row);

              if(insert_beg != true) {
                row_index = new_row - 1;
              }
              else {
                row_index = new_row + 1;
              }

              while(test_word == true) {
                var row_pos = row_index;
                var col_pos = new_col;

                var test_cord = "row" + row_pos + "_col" + col_pos;

                if(find_letter(test_cord) != -1 && test_word == true) {
                  var tmp_obj = {};
                  tmp_obj['id'] = test_cord;
                  tmp_obj['tile'] = test_cord;

                  if(insert_beg != true) {
                    game_board.unshift(tmp_obj);
                    row_index--;
                  }
                  else {
                    game_board.push(tmp_obj);
                    row_index++;
                  }

                  used_letters++;
                }
                else {
                  test_word = false;
                }
              }
            }
          }
        }

        else {
          $("#messages").html("<br><div class='highlight_centered_error'> \
          Not a valid move, diagonals are not allowed.</div>");

          if(gameboard_length > 0) {
            if(left_right == true) {
              $("#messages").html("<br><div class='highlight_centered_error'> \
              Not a valid move. Tiles must be placed on the same row (left / right) after one tile has been placed on a row.</div>");
            }
            else {
              $("#messages").html("<br><div class='highlight_centered_error'> \
              Not a valid move. Tiles must be placed on the same column (top / down) after one tile has been placed on a column.</div>");
            }
          }

          ui.draggable.draggable('option', 'revert', true);

          return;
        }
      }

      var obj = {};
      obj['id'] = droppableID;
      obj['tile'] = draggableID;

      if (duplicate == false) {
        if (insert_beg == false) {
          game_board.push(obj);
        }
        else {
          game_board.unshift(obj);
        }
      }

      $(this).append($(ui.draggable));
      ui.draggable.css("top", $(this).css("top"));
      ui.draggable.css("left", $(this).css("left"));
      ui.draggable.css("position", "relative");
      
      find_word();
    },
    zIndex: -1
  });
}
