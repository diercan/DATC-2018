
const express = require('express');
const app = express()

app.use(express.static('public'));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index');
})
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

app.use(express.static('public'));

app.post('/', function (req, res) {
    res.render('index');
  })

