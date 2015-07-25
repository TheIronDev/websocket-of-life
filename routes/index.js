var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/simple', function(req, res) {
	res.render('simple');
});

module.exports = router;
