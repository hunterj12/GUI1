function load_scrabble_pieces() {
  var base_url = "img/scrabble/Scrabble_Tile_";
  var random_letter = "";
  var piece = "";
  var piece_ID = "";
  var pos;
  var img_left;
  var img_top;

  for(var i = 0; i < 7; i++) {
    random_letter = get_random_tile();
    piece = "<img class='pieces' id='piece" + i + "' src='" + base_url + random_letter + ".jpg" + "'></img>";
    piece_ID = "#piece" + i;
    game_tiles[i].letter = random_letter;

    pos = $("#the_rack").position();

    img_left = pos.left + 30 + (50 * i);
    img_top = pos.top + 30;

    $("#rack").append(piece);
    $(piece_ID).css("left", img_left).css("top", img_top).css("position", "absolute");

    $(piece_ID).draggable({
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
}
