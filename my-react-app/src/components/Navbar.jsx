import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import ThemedButton from './ThemedButton';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme, currentTheme } = useTheme();
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Skills', path: '/skills' },
    { name: 'Contact', path: '/contact' },
  ];

  // Social items for mobile menu
  const socialItems = [
    { label: 'GitHub', link: 'https://github.com/wasiqpatel' },
    { label: 'LinkedIn', link: 'https://linkedin.com/in/wasiqpatel' },
    { label: 'Email', link: 'mailto:wasiq@example.com' },
    { label: 'Resume', link: '/resume.pdf' }
  ];

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.3 }
    })
  };

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
      style={{ width: 'calc(100% - 2rem)', maxWidth: '1180px', marginLeft: '40px', marginRight: '40px' }}
    >
      <div 
        className="w-full flex items-center justify-between h-16 px-10 rounded-full backdrop-blur-xl border shadow-xl"
        style={{
          background: theme === 'dark' 
            ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)' 
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)',
          boxShadow: theme === 'dark' 
            ? '0 12px 40px rgba(0, 0, 0, 0.4), 0 4px 12px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
            : '0 12px 40px rgba(0, 0, 0, 0.15), 0 4px 12px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
        }}
      >
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0"
          >
            <Link 
              to="/" 
              className="text-xl font-bold text-gradient hover:scale-105 transition-transform duration-200"
              style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              WP
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                variants={linkVariants}
                custom={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to={item.path}
                  className={`relative px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium whitespace-nowrap ${
                    location.pathname === item.path
                      ? 'text-white font-semibold'
                      : theme === 'dark' 
                        ? 'text-gray-300 hover:text-white hover:bg-white/5' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                  }`}
                  style={{
                    color: location.pathname === item.path ? 'white' : undefined,
                    textShadow: location.pathname === item.path ? '0 2px 4px rgba(0, 0, 0, 0.5)' : undefined,
                    fontWeight: location.pathname === item.path ? '600' : undefined,
                    zIndex: location.pathname === item.path ? 10 : 'auto',
                    position: 'relative'
                  }}
                >
                  {item.name}
                  {location.pathname === item.path && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `linear-gradient(135deg, ${currentTheme.accent}, #8b5cf6)`,
                        boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4), 0 2px 6px rgba(0, 0, 0, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        zIndex: -1
                      }}
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Theme Toggle and Mobile Menu */}
          <div className="flex items-center space-x-3">
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full transition-all duration-200 hover:bg-white/10"
              style={{
                background: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)'
              }}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-yellow-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </motion.button>

            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-2 rounded-full transition-all duration-200 hover:bg-white/10"
              style={{
                background: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)'
              }}
            >
              {isOpen ? (
                <X className="w-4 h-4 text-gray-400" />
              ) : (
                <Menu className="w-4 h-4 text-gray-400" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation with StaggeredNav styling */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-6 rounded-xl overflow-hidden w-full"
              style={{ 
                background: theme === 'dark' ? 'var(--surface)' : 'rgba(255, 255, 255, 0.9)',
                border: `1px solid ${theme === 'dark' ? 'var(--border)' : 'rgba(0, 0, 0, 0.1)'}`,
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)'
              }}
            >
              <div className="px-6 py-4 space-y-3">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`block px-6 py-4 rounded-lg transition-all duration-300 text-lg font-medium relative ${
                        location.pathname === item.path
                          ? 'text-white font-semibold'
                          : theme === 'dark' 
                            ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                      style={{
                        color: location.pathname === item.path ? 'white' : undefined,
                        background: location.pathname === item.path 
                          ? `linear-gradient(135deg, ${currentTheme.accent}, #8b5cf6)` 
                          : 'transparent',
                        textShadow: location.pathname === item.path ? '0 2px 4px rgba(0, 0, 0, 0.5)' : undefined,
                        boxShadow: location.pathname === item.path ? '0 2px 8px rgba(0, 0, 0, 0.2)' : undefined,
                        zIndex: location.pathname === item.path ? 10 : 'auto'
                      }}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                
                {/* Social Links */}
                <div className="px-6 py-4 border-t border-gray-700" style={{ borderColor: 'var(--border)' }}>
                  <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--text)' }}>Socials</h3>
                  <div className="flex flex-wrap gap-3">
                    {socialItems.map((social, index) => (
                      <motion.a
                        key={social.label}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium"
                        style={{ 
                          color: 'var(--text-secondary)',
                          background: 'var(--tertiary)',
                          border: '1px solid var(--border)'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.color = currentTheme.accent;
                          e.target.style.borderColor = currentTheme.accent;
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.color = 'var(--text-secondary)';
                          e.target.style.borderColor = 'var(--border)';
                        }}
                      >
                        {social.label}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
