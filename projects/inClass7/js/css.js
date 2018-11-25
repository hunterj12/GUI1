$(function() {
  var backgroundColor = $('#one').css("background-color");
  $('ul').append("<p>Color was " + backgroundColor + "</p>");
  $('li').css({
    'background-color': '#c5a996',
    'border-style': 'solid',
    'border-width': '1px',
    'border-color': 'white',
    'color': 'black',
    'text-shadow': 'none',
    'font-family': 'Georgia'
  });
});
