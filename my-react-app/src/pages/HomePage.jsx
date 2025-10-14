import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, Download } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import ThemedButton from '../components/ThemedButton';

const HomePage = () => {
  const { currentTheme, changeAccentColor, theme } = useTheme();
  const containerRef = useRef(null);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  const accentColors = [
    '#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', 
    '#10b981', '#ef4444', '#06b6d4', '#84cc16'
  ];
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax transforms
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  // Spring animations
  const springY = useSpring(y, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Dynamic theme rotation every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColorIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % accentColors.length;
        changeAccentColor(accentColors[nextIndex]);
        return nextIndex;
      });
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, [changeAccentColor]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20"
          style={{
            background: `linear-gradient(135deg, ${currentTheme.accent}, #8b5cf6)`,
            y: springY
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-10"
          style={{
            background: `linear-gradient(135deg, #ec4899, ${currentTheme.accent})`,
            y: springY
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 min-h-[calc(100vh-100px)] flex items-center"
        style={{ y: springY, opacity, scale }}
      >
        <div className="container mx-auto px-6 text-left max-w-6xl ml-8">
          {/* Hero Section */}
          <motion.div variants={itemVariants} className="mb-8">
            <motion.h1 variants={itemVariants} className="mb-4 text-3xl md:text-4xl">
              Hi, I'm <span className="text-gradient">Wasiq Patel</span>
            </motion.h1>

            <motion.h2 
              variants={itemVariants} 
              className="text-2xl md:text-3xl font-bold mb-4"
              style={{ color: currentTheme.accent }}
            >
              React Native Mobile App Developer
            </motion.h2>

            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl mb-8 max-w-3xl leading-relaxed"
            >
              I create beautiful, performant mobile applications that users love. 
              Passionate about clean code, modern design, and delivering exceptional user experiences.
            </motion.p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-start items-start mb-12"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary text-lg px-6 py-3"
            >
              View My Work
              <ArrowDown className="w-5 h-5" />
            </motion.a>
            
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-secondary text-lg px-6 py-3"
            >
              Get In Touch
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            variants={itemVariants}
            className="flex justify-start space-x-3"
          >
            {[
              { icon: Github, href: "https://github.com/wasiqpatel", label: "GitHub" },
              { icon: Linkedin, href: "https://linkedin.com/in/wasiqpatel", label: "LinkedIn" },
              { icon: Mail, href: "mailto:wasiq@example.com", label: "Email" },
              { icon: Download, href: "/resume.pdf", label: "Resume" }
            ].map(({ icon: Icon, href, label }, index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
              >
                <ThemedButton
                  href={href}
                  target={href.startsWith('http') ? '_blank' : '_self'}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : ''}
                  size="medium"
                >
                  <Icon className="w-6 h-6" />
                </ThemedButton>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown className="w-6 h-6 text-gray-400" />
      </motion.div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full opacity-30"
            style={{
              background: currentTheme.accent,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
