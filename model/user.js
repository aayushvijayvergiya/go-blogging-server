const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const userModel = new Schema({
    firstName: String,
    lastName: String,
    mobileNo: String,
    emailAddress: String,
    penName: String,
    bookmarks: {
        blogId: String, 
        title: String
    },
    password: String
});

userModel.plugin(AutoIncrement, { inc_field: 'userId', start_seq: 1000 });

const userObj = mongoose.model('user', userModel);



module.exports = userObj;

