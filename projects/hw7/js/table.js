$(document).ready(function() {
    validate();
});

function validate() {
  $("#mult_form").validate({
    rules: {
      cStart: {
        number: true,
        min: -10,
        max: 10,
        required: true
      },
      cEnd: {
        number: true,
        min: -10,
        max: 10,
        required: true
      },
      rStart: {
        number: true,
        min: -10,
        max: 10,
        required: true
      },
      rEnd: {
        number: true,
        min: -10,
        max: 10,
        required: true
      }
    },

    messages: {
      cStart: {
        number: "ERROR: enter a valid number between -10 and 10.",
        min: "ERROR: enter a number greater than or equal to -10.",
        max: "ERROR: enter a number less than or equal to 10.",
        required: "ERROR: enter a number."
      },
      cEnd: {
        number: "ERROR: enter a valid number between -10 and 10.",
        min: "ERROR: enter a number greater than or equal to -10.",
        max: "ERROR: enter a number less than or equal to 10.",
        required: "ERROR: enter a number."
      },
      rStart: {
        number: "ERROR: enter a valid number between -10 and 10.",
        min: "ERROR: enter a number greater than or equal to -10.",
        max: "ERROR: enter a number less than or equal to 10.",
        required: "ERROR: enter a number."
      },
      rEnd: {
        number: "ERROR: enter a valid number between -10 and 10.",
        min: "ERROR: enter a number greater than or equal to -10.",
        max: "ERROR: enter a number less than or equal to 10.",
        required: "ERROR: enter a number."
      }
    },

    submitHandler: function() {
      calcTable();
      return false;
    },

    invalidHandler: function() {
      $("#warning").empty();
      $("#multTable").empty();
    },

    errorElement: "div",
    errorPlacement: function(error, element) {
      error.insertAfter(element);
    }
  });
}

function calcTable() {
  var cStart = Number(document.getElementById('cStart').value);
  var cEnd = Number(document.getElementById('cEnd').value);
  var rStart = Number(document.getElementById('rStart').value);
  var rEnd = Number(document.getElementById('rEnd').value);

  $("#warning").empty();

  if (cStart > cEnd) {
    $("#warning").append("<p class='warning_class'>Swapping the column start and end.</p>");
    var tmp_num = cStart;
    cStart = cEnd;
    cEnd = tmp_num;
  }

  if (rStart > rEnd) {
    $("#warning").append("<p class='warning_class'>Swapping the row start and end.</p>");
    var tmp_num = rStart;
    rStart = rEnd;
    rEnd = tmp_num;
  }

  var matrix = {};
  var column = Math.abs(cEnd - cStart);
  var row = Math.abs(rEnd - rStart);
  var horz = cStart;
  var vert = rStart;

  for (var x = 0; x <= row; x++) {
    var tmp_arr = [];

    for (var y = 0; y <= column; y++) {
      var calc = horz * vert;
      tmp_arr[y] = calc;
      horz++;
    }

    matrix["row" + x] = tmp_arr;
    horz = cStart;
    vert++;
  }

  var content = "";
  content += "<table>";
  content += "<tr><td></td>";

  for (var a = cStart; a <= cEnd; a++) {
    content += "<td>" + a + "</td>";
  }

  content += "</tr>";
  var vert = rStart;

  for (var x = 0; x <= row; x++) {
    content += "<tr><td>" + vert + "</td>";

    for (var y = 0; y <= column; y++) {
      content += "<td>" + matrix["row" + x][y] + "</td>";
    }

    vert++;
    content += "</tr>";
  }

  content += "</table>";

  $("#multTable").html(content);

  return false;
}
