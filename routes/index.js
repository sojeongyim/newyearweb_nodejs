var express = require('express');
var router = express.Router();

/* Main Pages */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
