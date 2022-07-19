const express = require('express');
const router = express.Router();
const getController = require('../controllers/getController');
const postController = require('../controllers/postController');
router.get('/', getController.home_get);
router.post('/register', postController.register_post);
router.post('/login', postController.login_post);


module.exports = router;
