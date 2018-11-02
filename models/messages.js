const mongoose = require('mongoose');
Schema = mongoose.Schema;

const messagesSchema = new Schema({
    tlgid: Number,
    user: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
    text: String
});

module.exports = mongoose.model('Messages', messagesSchema);