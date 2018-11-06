var today = new Date();
var hourNow = today.getHours();

if(hourNow > 18) {
  document.write('<h3>' + "Good Evening!" + '</h3>');
}

else if(hourNow > 12) {
  document.write('<h3>' + "Good Afternoon!" + '</h3>');
}

else if(hourNow > 0) {
  document.write('<h3>' + "Good Morning!" + '</h3>');
}

else {
  document.write('<h3>' + "Welcome!" + '</h3>');
}
