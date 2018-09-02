var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todoList');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we\'re connected!')
});

var todoSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  }
});

var Todo = mongoose.model('Todo', todoSchema);
var save = (data, callback) => {
  new Todo({
    name: data
  }).save((err) => {
    if (err) {
      console.log('err in save db')
      callback(err, null)
    } else {
      console.log(data)
      callback(null, 'data')
    }
  });
}

let find = callback => {
  Todo.find({}, (err, data) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, data)
    }
  })
}

let remove = (data, callback) => {
  Todo.deleteOne({
    name: data
  }, (err, data) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, data)
    }
  })
}

module.exports.save = save;
module.exports.find = find;
module.exports.remove = remove;