var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('valentine', { title: 'Paintly'});
});

module.exports = router;
