const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    tlgid: Number,
    first_name: String,
    last_name: String
});

module.exports = mongoose.model('Users', usersSchema);