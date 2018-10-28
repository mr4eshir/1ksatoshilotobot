const mongoose = require('mongoose');

const DATABASE_CONECTION = 'mongodb://localhost/bots';

var userSchema = mongoose.Schema({
  tlgid: Number, 
  first_name: String, 
  last_name: String
})

var messageSchema = mongoose.Schema({
  tlgid: Number, 
  user: Object, 
  text: String
})

const User = exports.Bots = mongoose.model('User', userSchema);
const Messages = exports.Bots = mongoose.model('Messages', messageSchema);

exports.initializeMongo = function() {
  mongoose.connect(DATABASE_CONECTION);
  // console.log('Trying to connect to ' + DATABASE_CONECTION);
  var db = mongoose.connection;
  // db.on('error', console.error.bind(console, 'connection error: We might not be as connected as I thought'));
  db.once('open', function() {
    // console.log('We are connected you and I!');
    addRandomMessage();
  });
}

var addRandomMessage = function() {
  var user = new User({
    name: 'user' + Math.random()
  });
  var messages = new Messages({
    name: 'messages' + Math.random()
  });

  user.save(function (err, fluffy) {
    if (err) return console.error(err);
    console.log('user');
  });

  messages.save(function (err, fluffy) {
    if (err) return console.error(err);
    console.log('messages');
  });

}
