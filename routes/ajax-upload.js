var express = require('express');
var router = express.Router();
var fs = require('fs');

router.post('/', function(req, res, next) 
	{
		console.log(req.body);
		console.log(req.files);
		var imageFile = req.files.uploadnewphoto;
		if (imageFile) {
			var name = imageFile.name;
			var path = imageFile.path;
			var type = imageFile.mimetype;

			if (type.indexOf('image') != -1) {
				// 이미지 파일의 경우 : 파일 이름을 변경합니다.
				var outputPath = "./" + Date.now() + '_' + name;
				fs.rename(path, outputPath, function (err) {
					if (err) {
						res.send("7777");
						return;
					}
					res.send(CONSTS.getErrData('0000'));

				});
			}
 		}
}); 

module.exports = router; 
