import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
export const initEmailJS = () => {
  emailjs.init({
    publicKey: 'rfvOvo36rN7dcTIzj',
    // Enable debug logs
    debug: true
  });
}; 