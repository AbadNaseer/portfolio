import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
export const initEmailJS = () => {
  try {
    emailjs.init({
      publicKey: 'rfvOvo36rN7dcTIzj',
      blockHeadless: false, // Important for Vercel deployment
      limitRate: {
        // Rate limiting to prevent abuse
        throttle: 5000, // 5 seconds between emails
      },
    });
    console.log('EmailJS initialized successfully');
  } catch (error) {
    console.error('Failed to initialize EmailJS:', error);
  }
}; 