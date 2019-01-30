var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('main', { title: 'Express'});
});

router.get('/:filename', function(req, res, next) {
  var filename = req.params.filename;
  res.render('result', { title: 'Express',filename:filename});
});


router.get('/final/:filename',function(req,res,next){
  var filename = req.params.filename;
  res.render('final',{title: 'Express',filename:filename});
});

module.exports = router;
