function calcTable() {
  var cStart = Number(document.getElementById('cStart').value);
  var cEnd = Number(document.getElementById('cEnd').value);
  var rStart = Number(document.getElementById('rStart').value);
  var rEnd = Number(document.getElementById('rEnd').value);

  if (cStart > cEnd) {
    var tmp_num = cStart;
    cStart = cEnd;
    cEnd = tmp_num;
  }

  if (rStart > rEnd) {
    var tmp_num = rStart;
    rStart = rEnd;
    rEnd = tmp_num;
  }

  if (cStart < -1000 || cEnd > 1000 || rStart < -1000 || rEnd > 1000) {
    alert("Please enter a number between -1000 and 1000.");
    return;
  }

  var matrix = {};
  var col = Math.abs(cEnd - cStart);
  var row = Math.abs(rEnd - rStart);
  var horz = cStart;
  var vert = rStart;

  for (var x = 0; x <= row; x++) {
    var tmp_arr = [];

    for (var y = 0; y <= col; y++) {
      var calc = horz * vert;
      tmp_arr[y] = calc;
      horz++;
    }

    matrix["row" + x] = tmp_arr;
    horz = cStart;
    vert++;
  }

  fillTable(matrix);
  return false;
}

function fillTable(matrix) {
  var cStart = Number(document.getElementById('cStart').value);
  var cEnd = Number(document.getElementById('cEnd').value);
  var rStart = Number(document.getElementById('rStart').value);
  var rEnd = Number(document.getElementById('rEnd').value);

  if (cStart > cEnd) {
    var tmp_num = cStart;
    cStart = cEnd;
    cEnd = tmp_num;
  }

  if (rStart > rEnd) {
    var tmp_num = rStart;
    rStart = rEnd;
    rEnd = tmp_num;
  }

  var col = Math.abs(cEnd - cStart);
  var row = Math.abs(rEnd - rStart);

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

    for (var y = 0; y <= col; y++) {
      content += "<td>" + matrix["row" + x][y] + "</td>";
    }

    vert++;
    content += "</tr>";
  }

  content += "</table>";

  $("#multTable").html(content);
}
