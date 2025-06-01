import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import emailjs from '@emailjs/browser';
import SectionTitle from '../ui/SectionTitle';
import { Phone, Mail, MapPin, Github, Linkedin, Send } from 'lucide-react';

const Contact: React.FC = () => {
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
        const result = await emailjs.send(
          'service_7omcoji',
          'template_a7qwtkg',
          {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message,
            to_name: 'Abad Naseer',
          },
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
    <section id="contact" className="section-padding">
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
          >
            <h3 className="text-xl font-bold mb-6 gradient-text">Contact Information</h3>
            
            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start gap-4">
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
            
            <div className="terminal">
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
          >
            <h3 className="text-xl font-bold mb-6 gradient-text">Send a Message</h3>
            
            {formSubmitted ? (
              <div className="card bg-dark-300 border-success-700">
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
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className={`form-input ${formErrors.name ? 'border-error-500' : ''}`}
                      disabled={isSubmitting}
                    />
                    {formErrors.name && <p className="text-error-500 text-sm mt-1">{formErrors.name}</p>}
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email"
                      className={`form-input ${formErrors.email ? 'border-error-500' : ''}`}
                      disabled={isSubmitting}
                    />
                    {formErrors.email && <p className="text-error-500 text-sm mt-1">{formErrors.email}</p>}
                  </div>
                </div>
                <div>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject (Optional)"
                    className="form-input"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    rows={5}
                    className={`form-input ${formErrors.message ? 'border-error-500' : ''}`}
                    disabled={isSubmitting}
                  ></textarea>
                  {formErrors.message && <p className="text-error-500 text-sm mt-1">{formErrors.message}</p>}
                </div>
                <button
                  type="submit"
                  className="btn-primary w-full flex items-center justify-center gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
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