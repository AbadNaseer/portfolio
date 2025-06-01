import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import emailjs from '@emailjs/browser';
import SectionTitle from '../ui/SectionTitle';
import { Phone, Mail, MapPin, Github, Linkedin, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear errors when user types
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors({
        ...formErrors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...formErrors };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      valid = false;
    }

    setFormErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        if (!formRef.current) return;

        const result = await emailjs.sendForm(
          'service_7omcoji',
          'template_a7qwtkg',
          formRef.current,
          'rfvOvo36rN7dcTIzj'
        );

        console.log('Email sent successfully:', result);
        setFormSubmitted(true);
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
        
        // After 5 seconds, reset the submission state
        setTimeout(() => {
          setFormSubmitted(false);
        }, 5000);
      } catch (error) {
        console.error('Failed to send email:', error);
        alert('Failed to send message. Please try again later.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const contactInfo = [
    {
      icon: <Phone size={20} />,
      title: 'Phone',
      value: '(+92) 340-5059429',
      link: 'tel:+923405059429',
    },
    {
      icon: <Mail size={20} />,
      title: 'Email',
      value: 'abad.naseerfast@gmail.com',
      link: 'mailto:abad.naseerfast@gmail.com',
    },
    {
      icon: <Github size={20} />,
      title: 'GitHub',
      value: 'github.com/AbadNaseer',
      link: 'https://github.com/AbadNaseer',
    },
    {
      icon: <Linkedin size={20} />,
      title: 'LinkedIn',
      value: 'linkedin.com/in/abadnaseer',
      link: 'https://linkedin.com/in/abadnaseer',
    },
    {
      icon: <MapPin size={20} />,
      title: 'Location',
      value: 'Islamabad, Pakistan',
    },
  ];

  return (
    <section id="contact" className="section-padding bg-dark-400">
      <div className="container-custom">
        <SectionTitle 
          title="Get In Touch"
          subtitle="Have a project in mind or want to discuss potential opportunities? Let's connect."
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-dark-300 p-8 rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-bold mb-6 gradient-text">Contact Information</h3>
            
            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start gap-4 hover:transform hover:translate-x-2 transition-transform duration-300">
                  <div className="w-10 h-10 bg-primary-900/30 rounded-full flex items-center justify-center text-primary-400">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{info.title}</h4>
                    {info.link ? (
                      <a 
                        href={info.link} 
                        target={info.link.startsWith('http') ? '_blank' : undefined}
                        rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-slate-400 hover:text-primary-400 transition-colors duration-300"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <span className="text-slate-400">{info.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="terminal bg-dark-500 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-error-500"></div>
                <div className="w-3 h-3 rounded-full bg-warning-500"></div>
                <div className="w-3 h-3 rounded-full bg-success-500"></div>
                <span className="text-xs text-slate-500 ml-2">availability.sh</span>
              </div>
              <div className="font-mono text-sm space-y-1">
                <p className="terminal-line">checking availability...</p>
                <p className="terminal-line">location: Islamabad, Pakistan</p>
                <p className="terminal-line">current_status: <span className="text-success-500">Available for new opportunities</span></p>
                <p className="terminal-line">preferred_contact: <span className="text-primary-400">email</span></p>
                <p className="terminal-line">response_time: <span className="text-primary-400">~24 hours</span></p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-dark-300 p-8 rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-bold mb-6 gradient-text">Send a Message</h3>
            
            {formSubmitted ? (
              <div className="bg-success-900/20 border border-success-500/20 rounded-lg p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-success-700/20 flex items-center justify-center text-success-500">
                    <Send size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">Message Sent!</h4>
                    <p className="text-slate-400">
                      Thank you for reaching out. I'll get back to you as soon as possible.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="from_name" className="block text-sm font-medium text-slate-300 mb-2">
                      Name <span className="text-error-500">*</span>
                    </label>
                    <input
                      id="from_name"
                      type="text"
                      name="from_name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className={`w-full px-4 py-3 rounded-lg bg-dark-500 border ${
                        formErrors.name ? 'border-error-500' : 'border-slate-700'
                      } text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all duration-300`}
                      disabled={isSubmitting}
                    />
                    {formErrors.name && <p className="text-error-500 text-sm mt-1">{formErrors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="from_email" className="block text-sm font-medium text-slate-300 mb-2">
                      Email <span className="text-error-500">*</span>
                    </label>
                    <input
                      id="from_email"
                      type="email"
                      name="from_email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email"
                      className={`w-full px-4 py-3 rounded-lg bg-dark-500 border ${
                        formErrors.email ? 'border-error-500' : 'border-slate-700'
                      } text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all duration-300`}
                      disabled={isSubmitting}
                    />
                    {formErrors.email && <p className="text-error-500 text-sm mt-1">{formErrors.email}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this regarding?"
                    className="w-full px-4 py-3 rounded-lg bg-dark-500 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all duration-300"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                    Message <span className="text-error-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message here..."
                    rows={5}
                    className={`w-full px-4 py-3 rounded-lg bg-dark-500 border ${
                      formErrors.message ? 'border-error-500' : 'border-slate-700'
                    } text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all duration-300 resize-none`}
                    disabled={isSubmitting}
                  ></textarea>
                  {formErrors.message && <p className="text-error-500 text-sm mt-1">{formErrors.message}</p>}
                </div>
                <button
                  type="submit"
                  className={`w-full px-6 py-3 rounded-lg bg-primary-500 text-white font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-primary-600 active:bg-primary-700'
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;