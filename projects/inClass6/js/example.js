var list = document.getElementsByTagName("ul")[0];

// ADD NEW ITEM TO END OF LIST
var lastNode = document.createElement("LI");
lastNode.appendChild(document.createTextNode("cream"));
list.appendChild(lastNode);

// ADD NEW ITEM START OF LIST
var firstNode = document.createElement("LI");
firstNode.appendChild(document.createTextNode("kale"));
list.insertBefore(firstNode, list.childNodes[0]);

// ADD A CLASS OF COOL TO ALL LIST ITEMS
var x = document.getElementsByTagName("li").length;

for (i = 0; i < x; i++) {
  document.getElementsByTagName("li")[i].classList.add("cool");
}

// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING
var counterNode = document.createElement("h2").appendChild(document.createElement("span"));
counterNode.appendChild(document.createTextNode(x));
document.getElementsByTagName("h2")[0].appendChild(counterNode);
