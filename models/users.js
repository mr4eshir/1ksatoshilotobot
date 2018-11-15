const mongoose = require('mongoose');
Schema = mongoose.Schema;

const usersSchema = new Schema({
    tlgid: Number,
    first_name: String,
    last_name: String,
});

let Users = mongoose.model('Users', usersSchema);

module.exports = Users;