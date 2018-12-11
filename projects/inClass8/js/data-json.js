// NOTE: If you run this file locally
// You will not get a server status
// You can comment out lines 9 and 26 to make it work locally

var xhr = new XMLHttpRequest();                 // Create XMLHttpRequest object

xhr.onload = function() {                       // Run function when response has loaded
  // The following conditional check will not work locally - only on a server
  if(xhr.status === 200) {                      // Run if status returns ok
    responseObject = JSON.parse(xhr.responseText); // Get response text and parse it into a JSON object

    // Create a new object for the final output
    var newContent = '';
    for (var i = 0; i < responseObject.events.length; i++) { // Run through entire JSON object and convert into html
      newContent += '<div class="event">';
      newContent += '<img src="' + responseObject.events[i].map + '" ';
      newContent += 'alt="' + responseObject.events[i].location + '" />';
      newContent += '<p><b>' + responseObject.events[i].location + '</b><br>';
      newContent += responseObject.events[i].date + '</p>';
      newContent += '</div>';
    }

    // Set content element equal to newContent
    document.getElementById('content').innerHTML = newContent;

  }
};

xhr.open('GET', 'data/data.json', true);        // Initializes a new request
xhr.send(null);                                 // Send request to the server

// When working locally in Firefox, you may see an error saying that the JSON is not well-formed.
// This is because Firefox is not reading the correct MIME type (and it can safely be ignored).

// If you get it on a server, you may need to se the MIME type for JSON on the server (application/JSON).
