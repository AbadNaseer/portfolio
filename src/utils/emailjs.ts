import { init } from '@emailjs/browser';

// Initialize EmailJS with your public key
export const initEmailJS = () => {
  try {
    init({
      publicKey: 'rfvOvo36rN7dcTIzj',
    });
    console.log('EmailJS initialized successfully');
  } catch (error) {
    console.error('Failed to initialize EmailJS:', error);
  }
}; 