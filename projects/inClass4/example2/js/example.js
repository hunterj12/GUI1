// Create variables for the welcome message
var greet = "Hi ";
var name = "Hunter ";
var message = "welcome to the store.";
// Concatenate the three variables above to create the welcome message
var welcome =  greet + name + message;

// Create variables to hold details about the sign
var sign = "Welcome Home";
var tiles = sign.length;
var subTotal = sign.length * 5; //$5 for each tile
var shipping = 5;
var grandTotal = subTotal + shipping;

// Get the element that has an id of greeting
// Replace the content of that element with the personalized welcome message
document.getElementById('greeting').textContent = welcome;

// Get the element that has an id of userSign then update its contents
document.getElementById('userSign').textContent = sign;


// Get the element that has an id of tiles then update its contents
document.getElementById('tiles').textContent = tiles;


// Get the element that has an id of subTotal then update its contents
document.getElementById('subTotal').textContent = "$" + subTotal;


// Get the element that has an id of shipping then update its contents
document.getElementById('shipping').textContent = "$" + shipping;


// Get the element that has an id of grandTotal then update its contents
document.getElementById('grandTotal').textContent = "$" + grandTotal;
