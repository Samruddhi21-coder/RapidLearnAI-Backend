// import { useState, useEffect } from 'react';
// import { getChatStatus } from '../services/videoAPI';

// const useLearningSession = (chatId) => {
//   const [chatData, setChatData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!chatId) return;
//     let isSubscribed = true;

//     const fetchSession = async () => {
//       try {
//         const data = await getChatStatus(chatId);
//         if (isSubscribed) {
//           setChatData(data);
//           setLoading(false);
//         }
//       } catch (err) {
//         if (isSubscribed) {
//           setError(err.message);
//           setLoading(false);
//         }
//       }
//     };

//     fetchSession();
//     const interval = setInterval(fetchSession, 8000);
//     return () => {
//       isSubscribed = false;
//       clearInterval(interval);
//     };
//   }, [chatId]);

//   return { chatData, loading, error };
// };

// export default useLearningSession;


import { useState, useEffect, useRef } from 'react';
import { getChatStatus } from '../services/videoAPI';

const POLL_DELAY = 10000; // 10 seconds (safe for Render)

const useLearningSession = (chatId) => {
  const [chatData, setChatData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const timeoutRef = useRef(null);
  const stoppedRef = useRef(false);

  useEffect(() => {
    if (!chatId) return;

    stoppedRef.current = false;

    const fetchSession = async () => {
      if (stoppedRef.current) return;

      try {
        const data = await getChatStatus(chatId);

        setChatData(data);
        setLoading(false);

        // 🛑 STOP polling if finished
        if (data?.status === 'completed' || data?.status === 'failed') {
          stoppedRef.current = true;
          return;
        }

        // 🔁 schedule next poll AFTER request completes
        timeoutRef.current = setTimeout(fetchSession, POLL_DELAY);

      } catch (err) {
        console.error('Polling error:', err);
        setError(err.message);
        setLoading(false);

        // ⏳ backoff on error
        timeoutRef.current = setTimeout(fetchSession, 15000);
      }
    };

    fetchSession();

    return () => {
      stoppedRef.current = true;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [chatId]);

  return { chatData, loading, error };
};

export default useLearningSession;
