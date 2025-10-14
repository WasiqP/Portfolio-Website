import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, MessageCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ContactPage = () => {
  const { currentTheme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "wasiq@example.com",
      link: "mailto:wasiq@example.com",
      description: "Send me an email anytime"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+1 (555) 123-4567",
      link: "tel:+15551234567",
      description: "Call me for urgent matters"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "San Francisco, CA",
      link: "https://maps.google.com/?q=San+Francisco+CA",
      description: "Available for remote work"
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      name: "GitHub",
      url: "https://github.com/wasiqpatel",
      color: "#333",
      description: "Check out my code"
    },
    {
      icon: Linkedin,
      name: "LinkedIn",
      url: "https://linkedin.com/in/wasiqpatel",
      color: "#0077b5",
      description: "Connect professionally"
    },
    {
      icon: Twitter,
      name: "Twitter",
      url: "https://twitter.com/wasiqpatel",
      color: "#1da1f2",
      description: "Follow for updates"
    },
    {
      icon: MessageCircle,
      name: "Discord",
      url: "https://discord.gg/wasiqpatel",
      color: "#5865f2",
      description: "Chat with me"
    }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setIsSubmitting(false);
    
    // Show success message (you can implement a toast notification here)
    alert('Message sent successfully! I\'ll get back to you soon.');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen py-24"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">
            Get In <span className="text-gradient">Touch</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Have a project in mind? Let's discuss how we can work together to bring your ideas to life
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-6">Let's Connect</h2>
              <p className="text-lg text-gray-300 mb-8">
                I'm always excited to work on new projects and collaborate with amazing people. 
                Whether you have a mobile app idea, need consultation, or just want to chat about 
                technology, I'd love to hear from you!
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.title}
                  href={info.link}
                  target={info.link.startsWith('http') ? '_blank' : '_self'}
                  rel={info.link.startsWith('http') ? 'noopener noreferrer' : ''}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="flex items-center p-6 rounded-xl bg-gray-800 hover:bg-gray-700 transition-all duration-300 group"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div 
                    className="p-3 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: `${currentTheme.accent}20` }}
                  >
                    <info.icon 
                      className="w-6 h-6" 
                      style={{ color: currentTheme.accent }}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{info.title}</h3>
                    <p className="text-gray-300 mb-1">{info.value}</p>
                    <p className="text-sm text-gray-400">{info.description}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-xl font-bold mb-4">Follow Me</h3>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all duration-300 group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <social.icon 
                      className="w-5 h-5" 
                      style={{ color: social.color }}
                    />
                    <span className="text-sm font-medium">{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants} className="bg-gray-800 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Tell me about your project or idea..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Send className="w-5 h-5" />
                    Send Message
                  </div>
                )}
              </motion.button>
            </form>

            <div className="mt-6 p-4 rounded-lg bg-gray-700">
              <p className="text-sm text-gray-300">
                <strong>Response Time:</strong> I typically respond within 24 hours. 
                For urgent matters, feel free to call me directly.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div 
          variants={itemVariants}
          className="text-center mt-16 p-8 rounded-xl bg-gradient-to-r from-gray-800 to-gray-700"
        >
          <h2 className="text-2xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Let's discuss your mobile app idea and turn it into a reality. 
            I'm here to help you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="mailto:wasiq@example.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary"
            >
              <Mail className="w-5 h-5" />
              Send Email
            </motion.a>
            <motion.a
              href="tel:+15551234567"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-secondary"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactPage;
