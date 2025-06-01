import { init } from '@emailjs/browser';

// Initialize EmailJS with your public key
export const initEmailJS = () => {
  init({
    publicKey: 'rfvOvo36rN7dcTIzj',
    // Enable debug logs
    debug: true,
    origin: 'https://api.emailjs.com',
  });
}; 