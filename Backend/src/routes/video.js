// const express = require('express');
// const { mergeVideos, concatenateVideos } = require('../controllers/videoController');
// const { authenticate } = require('../middleware/auth');

// const router = express.Router();

// // These are internal endpoints
// // main flow uses orchestration
// //jaan buj ke dala hai fallback ke liye
// router.post('/merge', authenticate, mergeVideos);
// router.post('/concatenate', authenticate, concatenateVideos);

// module.exports = router;









const express = require('express');
const videoController = require('../controllers/videoController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.post('/start', authenticate, videoController.startVideoGeneration);
router.get('/status/:jobId', authenticate, videoController.getVideoStatus);

router.post('/merge', authenticate, videoController.mergeVideos);
router.post('/concatenate', authenticate, videoController.concatenateVideos);

module.exports = router;


















// const express = require('express');
// const {
//   startVideoGeneration,
//   getVideoStatus,
//   mergeVideos,
//   concatenateVideos,
// } = require('../controllers/videoController');
// const { authenticate } = require('../middleware/auth');

// const router = express.Router();

// // 🔥 MAIN FLOW (USED BY FRONTEND)
// router.post('/start', authenticate, startVideoGeneration);
// router.get('/status/:jobId', authenticate, getVideoStatus);

// // 🧯 INTERNAL / FALLBACK
// router.post('/merge', authenticate, mergeVideos);
// router.post('/concatenate', authenticate, concatenateVideos);

// module.exports = router;
