
const PORT = process.env.PORT || 3000;

const express = require('express');
const session = require('express-session');
const fs = require('fs');

// Create an express application
const app = express();

// Define session configuration
var sessionConfig = {
  // Disable httpOnly for this hands-on
  cookie: {httpOnly: false},
  resave: false,
  // Force session creation for this hands-on
  saveUninitialized: true,
  secret: 'mySecret'
}

// Add session middleware in this application
app.use(session(sessionConfig));

// Create a greeting endpoint
app.get('/', (req, res) => {
    
  // Open html file
  fs.readFile(__dirname +'/index.html', 'utf8', (err, html) => {
    
    // Error if html file doesn't exist
    if (err) throw err;
              
    // Customize greeting message
    if(typeof req.query.name != 'undefined'){
      console.log(req.query.name);
      html = html.replace(/world/g, req.query.name);
    }
   
    // Send HTML
    res.set('Content-Type', 'text/html');
    res.send(html);
  });
});

// Start Application
app.listen(PORT, '0.0.0.0', () => console.log('app listening on 3000'));
