const { request, response } = require('express');
const express = require('express');
const category = require('../model/category');

const router = express.Router();

router.get('/getAll', (req, resp) => {
    category.find((err, category) => {
        if(err) {
            return err;
        }

        console.log('[Categories]: ', category);
        return resp.json({ data: category })
    }) 
});

module.exports = router;