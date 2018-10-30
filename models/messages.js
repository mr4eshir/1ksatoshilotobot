const mongoose = require('mongoose');

const messagesSchema = mongoose.Schema({
    tlgid: Number,
    user: Object,
    text: String
});

module.exports = mongoose.model('Messages', messagesSchema);