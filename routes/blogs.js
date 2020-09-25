const express = require('express');
const router = express.Router();

const blog = require('../model/blogs');

router.get('/getAll', (req, resp) => {
    blog.find((err, blogs) => {
        if(err) {
            return err;
        }

        console.log('[View] Blog: ', blogs);
        return resp.json({ data: blogs });
    })
});

module.exports = router;