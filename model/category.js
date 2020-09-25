const { request } = require("express");

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoryModel = new Schema({
    categoryName: String
});

module.exports = mongoose.model('category', categoryModel);