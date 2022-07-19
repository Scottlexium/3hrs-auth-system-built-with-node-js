var express = require('express');
var router = express.Router();
const getController = require('../controllers/getController');
const {authChecker} = require('../middlewares/authMiddleware');

/* GET users listing. */
router.get('/', authChecker,getController.home_get);
module.exports = router;
