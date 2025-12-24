// FFmpeg is used via fluent-ffmpeg with default config
// This file can be used for custom presets if needed
// module.exports = {};

const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const ffprobePath = require('ffprobe-static');

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath.path);

console.log('✅ FFmpeg configured:', ffmpegPath);
