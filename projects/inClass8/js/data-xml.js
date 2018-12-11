// NOTE: If you run this file locally
// You will not get a server status and the example will fail
// Comment out lines 9 and 35 if you are working locally

var xhr = new XMLHttpRequest();        // Create XMLHttpRequest object

xhr.onload = function() {              // Run function when response has loaded
 // The following conditional check will not work locally - only on a server
if (xhr.status === 200) {             // Run if status returns ok

  // THIS PART IS DIFFERENT BECAUSE IT IS PROCESSING XML NOT HTML
  var response = xhr.responseXML;                      // Get XML response
  var events = response.getElementsByTagName('event'); // returns a NodeList of all elements with a tag named event

  for (var i = 0; i < events.length; i++) {            // Run through entire NodeList
    var container, image, location, city, newline;      // create varables
    container = document.createElement('div');          // create div html element
    container.className = 'event';                      // set classname to event

    image = document.createElement('img');              // create img html element
    image.setAttribute('src', getNodeValue(events[i], 'map'));
    image.setAttribute('alt', getNodeValue(events[i], 'location'));
    container.appendChild(image);

    location = document.createElement('p');             // create p html element
    city = document.createElement('b');
    newline = document.createElement('br');
    city.appendChild(document.createTextNode(getNodeValue(events[i], 'location')));
    location.appendChild(newline);
    location.insertBefore(city, newline);
    location.appendChild(document.createTextNode(getNodeValue(events[i], 'date')));
    container.appendChild(location);

    document.getElementById('content').appendChild(container);
  }
}

  function getNodeValue(obj, tag) {                   // return the value of a node
    return obj.getElementsByTagName(tag)[0].firstChild.nodeValue;
  }

 // THE FINAL PART IS THE SAME AS THE HTML EXAMPLE BUT IT REQUESTS AN XML FILE
};

xhr.open('GET', 'data/data.xml', true);             // Initializes a new request
xhr.send(null);                                     // Send request to the server
