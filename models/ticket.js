const mongoose = require('mongoose');
Schema = mongoose.Schema;

const ticketSchema = new Schema({
    user: [{ type: Object, ref: 'Users' }],
    hash: String,
    numbers: String
});

module.exports = mongoose.model('Ticket', ticketSchema);