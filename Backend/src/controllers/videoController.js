// const { mergeImageAndAudio } = require('../services/videoMergingService');

// const mergeVideos = async (req, res) => {
//   try {
//     const { imageUrl, audioUrl, pointId, chatId } = req.body;
//     const videoUrl = await mergeImageAndAudio(imageUrl, audioUrl, pointId, chatId);
//     res.json({ videoUrl });
//   } catch (error) {
//     console.error('Video merge error:', error);
//     res.status(500).json({ error: 'Failed to merge video' });
//   }
// };

// const concatenateVideos = async (req, res) => {
//   try {
//     const { videoUrls, chatId } = req.body;
//     const finalUrl = await mergeAllVideos(videoUrls, chatId);
//     res.json({ finalVideoUrl: finalUrl });
//   } catch (error) {
//     console.error('Video concatenation error:', error);
//     res.status(500).json({ error: 'Failed to concatenate videos' });
//   }
// };





const crypto = require('crypto');
const {
  mergeImageAndAudio,
  mergeAllVideos,
} = require('../services/videoMergingService');

// In-memory job store
const videoJobs = {};

// 🔥 START VIDEO GENERATION (USED BY FRONTEND)
const startVideoGeneration = async (req, res) => {
  const { imageUrl, audioUrl, pointId, chatId } = req.body;
  const jobId = crypto.randomUUID();

  videoJobs[jobId] = {
    progress: 0,
    status: 'processing',
    videoUrl: null,
  };

  // Respond immediately
  res.status(202).json({ jobId });

  // Async processing
  try {
    videoJobs[jobId].progress = 20;

    const videoUrl = await mergeImageAndAudio(
      imageUrl,
      audioUrl,
      pointId,
      chatId
    );

    videoJobs[jobId].progress = 100;
    videoJobs[jobId].status = 'completed';
    videoJobs[jobId].videoUrl = videoUrl;
  } catch (err) {
    console.error('Video generation failed:', err);
    videoJobs[jobId].status = 'failed';
  }
};

// 📊 GET VIDEO STATUS (POLLING)
const getVideoStatus = (req, res) => {
  const job = videoJobs[req.params.jobId];

  res.set('Cache-Control', 'no-store');

  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }

  res.json(job);
};

// 🧯 FALLBACK / INTERNAL (KEEP YOUR OLD ONES)
const mergeVideos = async (req, res) => {
  try {
    const { imageUrl, audioUrl, pointId, chatId } = req.body;
    const videoUrl = await mergeImageAndAudio(
      imageUrl,
      audioUrl,
      pointId,
      chatId
    );
    res.json({ videoUrl });
  } catch (error) {
    console.error('Video merge error:', error);
    res.status(500).json({ error: 'Failed to merge video' });
  }
};

const concatenateVideos = async (req, res) => {
  try {
    const { videoUrls, chatId } = req.body;
    const finalUrl = await mergeAllVideos(videoUrls, chatId);
    res.json({ finalVideoUrl: finalUrl });
  } catch (error) {
    console.error('Video concatenation error:', error);
    res.status(500).json({ error: 'Failed to concatenate videos' });
  }
};

module.exports = {
  startVideoGeneration,
  getVideoStatus,
  mergeVideos,
  concatenateVideos,
};















// const { mergeAllVideos } = require('../services/videoMergingService');

// module.exports = { mergeVideos, concatenateVideos };

// const crypto = require('crypto');
// const {
//   mergeImageAndAudio,
//   mergeAllVideos,
// } = require('../services/videoMergingService');

// // In-memory job store (later you can move to DB/Redis)
// const videoJobs = {};

// // 🔹 MAIN ORCHESTRATION (USED BY FRONTEND)
// exports.startVideoGeneration = async (req, res) => {
//   const jobId = crypto.randomUUID();
//   const { imageUrl, audioUrl, pointId, chatId } = req.body;

//   videoJobs[jobId] = {
//     progress: 0,
//     status: 'processing',
//     videoUrl: null,
//   };

//   // Respond immediately
//   res.status(202).json({ jobId });

//   // Run async pipeline
//   runVideoPipeline(jobId, imageUrl, audioUrl, pointId, chatId);
// };

// // 🔹 Async pipeline
// async function runVideoPipeline(jobId, imageUrl, audioUrl, pointId, chatId) {
//   try {
//     videoJobs[jobId].progress = 10;

//     const videoUrl = await mergeImageAndAudio(
//       imageUrl,
//       audioUrl,
//       pointId,
//       chatId
//     );

//     videoJobs[jobId].progress = 90;
//     videoJobs[jobId].videoUrl = videoUrl;
//     videoJobs[jobId].status = 'completed';
//     videoJobs[jobId].progress = 100;
//   } catch (error) {
//     console.error('🎬 Video generation failed:', error);
//     videoJobs[jobId].status = 'failed';
//   }
// }

// // 🔹 STATUS POLLING (USED BY UI)
// exports.getVideoStatus = (req, res) => {
//   const job = videoJobs[req.params.jobId];

//   // 🚫 VERY IMPORTANT: prevent browser caching (fixes 304)
//   res.set('Cache-Control', 'no-store');

//   if (!job) {
//     return res.status(404).json({ error: 'Job not found' });
//   }

//   res.json(job);
// };

// // 🔹 FALLBACK / INTERNAL (KEEP THESE)
// exports.mergeVideos = async (req, res) => {
//   try {
//     const { imageUrl, audioUrl, pointId, chatId } = req.body;
//     const videoUrl = await mergeImageAndAudio(
//       imageUrl,
//       audioUrl,
//       pointId,
//       chatId
//     );
//     res.json({ videoUrl });
//   } catch (error) {
//     console.error('Video merge error:', error);
//     res.status(500).json({ error: 'Failed to merge video' });
//   }
// };

// exports.concatenateVideos = async (req, res) => {
//   try {
//     const { videoUrls, chatId } = req.body;
//     const finalUrl = await mergeAllVideos(videoUrls, chatId);
//     res.json({ finalVideoUrl: finalUrl });
//   } catch (error) {
//     console.error('Video concatenation error:', error);
//     res.status(500).json({ error: 'Failed to concatenate videos' });
//   }
// };
