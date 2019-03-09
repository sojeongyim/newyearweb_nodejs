
var DirName = '/root/web/paintly_newyear/public/images/Origin/60lvSHXTnUn0Kc9qQf0Eofo6.mp4'
var DirThumbs = '/root/web/paintly_newyear/public/images/thumbs/'


//var frameExtractor = require('frame-extractor');
//frameExtractor.extractFrame(sourceFilePath, numOfFrames, frameNumber, outputPath);
//frameExtractor.extractFrame(DirName, 1,1, DirThumbs+'frame%04d.jpg');

//var frameExtractor = require('../index');
//frameExtractor.extractFrame('https://interactive-examples.mdn.mozilla.net/media/examples/flower.webm', 5 , 1, 'frame%04d.jpg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

const extractFrames = require('ffmpeg-extract-frames')

extractFrames({
    input: DirName,
    output: './screenshot-%i.jpg',
    offsets: [
          0
        ]
})
 
