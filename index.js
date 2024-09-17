// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date", function (req, res) {
  // your logic here
  const dateParam = req.params.date;
  
  // If no date parameter is provided, use current date
  let date;
  if (!dateParam) {
    date = new Date();
  } else {
    // Check if date is a number (in case of timestamp)
    const timestamp = /^\d+$/.test(dateParam) ? parseInt(dateParam) : dateParam;
    date = new Date(timestamp);
  }

  // Check if the date is valid
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Return the Unix timestamp in milliseconds and UTC string
  res.json({
    unix: date.getTime(), // Unix timestamp in milliseconds
    utc: date.toUTCString() // UTC string format
  });
});

app.get("/api", function (req,res){
  const date = new Date()
  res.send({
    unix: date.getTime(),
    utc: date.toUTCString()
  })
})


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
