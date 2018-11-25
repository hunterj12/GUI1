$(function() {
  $('li:contains("pine")').text("almonds");
  $('li:contains("figs")').remove();

  $(".hot").html(function(i, old) {
    return '<em>' + old + '</em>';
  });
});
