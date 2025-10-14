import { motion } from 'framer-motion';
import { Code, Smartphone, Zap, Users, Award, Coffee } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const AboutPage = () => {
  const { currentTheme } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  const stats = [
    { number: "50+", label: "Apps Developed", icon: Smartphone },
    { number: "3+", label: "Years Experience", icon: Award },
    { number: "100%", label: "Client Satisfaction", icon: Users },
    { number: "∞", label: "Cups of Coffee", icon: Coffee }
  ];

  const skills = [
    { name: "React Native", level: 95, color: "#61dafb" },
    { name: "JavaScript", level: 90, color: "#f7df1e" },
    { name: "TypeScript", level: 85, color: "#3178c6" },
    { name: "Node.js", level: 80, color: "#339933" },
    { name: "Firebase", level: 85, color: "#ffca28" },
    { name: "Redux", level: 75, color: "#764abc" },
    { name: "React", level: 90, color: "#61dafb" },
    { name: "Expo", level: 88, color: "#000020" }
  ];

  const experiences = [
    {
      title: "Senior React Native Developer",
      company: "Tech Innovations Inc.",
      period: "2022 - Present",
      description: "Leading mobile app development for cross-platform solutions, mentoring junior developers, and implementing best practices for scalable mobile applications.",
      achievements: ["Increased app performance by 40%", "Reduced crash rate by 60%", "Led team of 5 developers"]
    },
    {
      title: "React Native Developer",
      company: "Digital Solutions Ltd.",
      period: "2021 - 2022",
      description: "Developed and maintained multiple React Native applications, integrated third-party APIs, and collaborated with design teams to create intuitive user interfaces.",
      achievements: ["Delivered 15+ mobile apps", "Improved user engagement by 35%", "Implemented CI/CD pipeline"]
    },
    {
      title: "Frontend Developer",
      company: "StartupXYZ",
      period: "2020 - 2021",
      description: "Started as a frontend developer, quickly transitioned to mobile development, and became the go-to person for React Native projects.",
      achievements: ["Built first mobile app from scratch", "Learned React Native in 3 months", "Contributed to open source projects"]
    }
  ];

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
            About <span className="text-gradient">Me</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Passionate about creating mobile experiences that make a difference
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 rounded-xl bg-gray-800 hover:bg-gray-700 transition-all duration-300"
            >
              <stat.icon className="w-8 h-8 mx-auto mb-4" style={{ color: currentTheme.accent }} />
              <div className="text-3xl font-bold mb-2" style={{ color: currentTheme.accent }}>
                {stat.number}
              </div>
              <div className="text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 mb-16">
          {/* Story */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="text-3xl font-bold mb-6">My Story</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              I'm a passionate React Native developer with over 3 years of experience creating 
              beautiful, performant mobile applications. My journey began with web development, 
              but I quickly fell in love with mobile development and the unique challenges it presents.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              I specialize in building cross-platform mobile apps that deliver native performance 
              while maintaining code reusability. I'm passionate about clean code, modern design 
              patterns, and creating user experiences that truly make a difference.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              When I'm not coding, you'll find me exploring new technologies, contributing to 
              open-source projects, or sharing my knowledge with the developer community.
            </p>
          </motion.div>

          {/* Skills */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="text-3xl font-bold mb-6">Technical Skills</h2>
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-sm text-gray-400">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      className="h-2 rounded-full"
                      style={{ backgroundColor: skill.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Experience Timeline */}
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Professional Experience</h2>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="relative p-6 rounded-xl bg-gray-800 hover:bg-gray-700 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{exp.title}</h3>
                    <p className="text-lg" style={{ color: currentTheme.accent }}>{exp.company}</p>
                  </div>
                  <span className="text-sm text-gray-400 mt-2 md:mt-0">{exp.period}</span>
                </div>
                <p className="text-gray-300 mb-4">{exp.description}</p>
                <ul className="space-y-2">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-center text-gray-400">
                      <Zap className="w-4 h-4 mr-2" style={{ color: currentTheme.accent }} />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          variants={itemVariants}
          className="text-center p-8 rounded-xl bg-gradient-to-r from-gray-800 to-gray-700"
        >
          <h2 className="text-2xl font-bold mb-4">Let's Work Together</h2>
          <p className="text-gray-300 mb-6">
            I'm always interested in new opportunities and exciting projects.
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary"
          >
            Get In Touch
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AboutPage;
