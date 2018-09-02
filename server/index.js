const express = require('express');
const parser = require('body-parser');
const path = require('path');

const db = require('../database/index.js');
const PORT = 3000;

const app = express();

app.use(parser.json());
app.use(parser.urlencoded({
  extended: true
}));

app.use(express.static(path.resolve(__dirname, '../static')));

app.listen(PORT, () => {
  console.log('App is listening on PORT:', PORT)
});

// retrieve data from database
app.get('/todo', (req, res) => {
  console.log('In GET...')
  db.find((err, data) => {
    if (err) {
      res.status(404).send(err)
    } else {
      res.status(200).send(data)
    }
  })
});

// post new todo and save to db
app.post('/todo', (req, res) => {
  console.log('In POST...', req.body)
  let todo = req.body.todo;
  db.save(todo, (err, data) => {
    if (err) {
      console.log('err')
    } else {
      res.status(201).send(data)
    }
  })
});

//delete a todo from db
app.delete('/todo', (req, res) => {
  console.log('In DELETE...')
  db.remove(req.query.todo, (err, data) => {
    if (err) {
      console.log('err')
    } else {
      res.status(202).send(data)
    }
  })
});