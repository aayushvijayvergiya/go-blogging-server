const { response } = require('express');
const mongoose = require('mongoose');
const user = require('./user');

const Schema = mongoose.Schema;

const blogModel = new Schema({
    title: String,
    tags: Array,
    body: String,
    appreciations: [{
        userId: String,
        name: String
    }],
    user: new Schema({
        username: String,
        mobileNo: String,
        emailAddress: String,
        penName: String,
        bookmarks: {
            blogId: String,
            title: String
        }
    }),
    date: String,
    edited: Boolean,
    lastEditedAt: String
});

module.exports = mongoose.model('blog', blogModel);