const mongoose = require('mongoose');
Schema = mongoose.Schema;

const usersSchema = new Schema({
    tlgid: Number,
    first_name: String,
    last_name: String,
});

let User = mongoose.model('Users', usersSchema);

User.save = function () {
    let user = this.findOne('tlgid = ' . tlgid).exec();
    if (user) {
        return user;
    }
    return this.prototype.save();
}

module.exports = User;