import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
export const initEmailJS = () => {
  try {
    emailjs.init({
      publicKey: 'rfvOvo36rN7dcTIzj',
      blockHeadless: false, // Allow running in Vercel environment
    });
    
    // Test the initialization
    if (!emailjs.init) {
      throw new Error('EmailJS initialization failed');
    }
    
    console.log('EmailJS initialized successfully');
  } catch (error) {
    console.error('Failed to initialize EmailJS:', error);
    throw error;
  }
}; 