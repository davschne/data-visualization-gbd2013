var express = require('express');
var port = process.env.PORT || 8080;
var app = express();

// serve static assets
app.use(express.static(__dirname + '/public'));

app.listen(port);
console.log("server started on port " + port);
