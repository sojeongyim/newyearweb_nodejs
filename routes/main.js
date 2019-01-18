var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var filename;
  if(req.session.filename){
    filename=req.session.filename;
  }
  res.render('main', { title: 'Express',uploadfile:filename});
});

module.exports = router;
