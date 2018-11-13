const mongoose = require('mongoose');
Schema = mongoose.Schema;

const usersSchema = new Schema({
    tlgid: Number,
    first_name: String,
    last_name: String,
});

module.exports = mongoose.model('Users', usersSchema);