const express = require('express')
const path = require('path')
const app = express()

app.use(express.static("pages"));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/pages/index.html'));
});


app.listen(3000, () => console.log('Example app listening on port 3000!'))