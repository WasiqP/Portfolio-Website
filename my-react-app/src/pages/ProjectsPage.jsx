import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Code, Smartphone, Globe, Star, Calendar, Play, Eye } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import ThemedButton from '../components/ThemedButton';

const ProjectsPage = () => {
  const { currentTheme } = useTheme();
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: "E-Commerce Mobile App",
      description: "A full-featured e-commerce mobile application built with React Native, featuring real-time inventory management, secure payments, and push notifications.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop&crop=center",
      technologies: ["React Native", "Redux", "Firebase", "Stripe", "Node.js"],
      category: "mobile",
      featured: true,
      github: "https://github.com/wasiqpatel/ecommerce-app",
      live: "https://ecommerce-app.com",
      date: "2024",
      rating: 5,
      stats: { downloads: "10K+", rating: "4.8", users: "5K+" }
    },
    {
      id: 2,
      title: "Fitness Tracking App",
      description: "Comprehensive fitness tracking application with workout plans, progress tracking, and social features for motivation.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center",
      technologies: ["React Native", "Expo", "MongoDB", "Express", "JWT"],
      category: "mobile",
      featured: true,
      github: "https://github.com/wasiqpatel/fitness-app",
      live: "https://fitness-app.com",
      date: "2024",
      rating: 5,
      stats: { downloads: "25K+", rating: "4.9", users: "12K+" }
    },
    {
      id: 3,
      title: "Food Delivery App",
      description: "On-demand food delivery platform with real-time tracking, multiple payment options, and restaurant management system.",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop&crop=center",
      technologies: ["React Native", "Redux Toolkit", "Firebase", "Google Maps", "Razorpay"],
      category: "mobile",
      featured: false,
      github: "https://github.com/wasiqpatel/food-delivery",
      live: "https://food-delivery.com",
      date: "2023",
      rating: 4,
      stats: { downloads: "50K+", rating: "4.7", users: "20K+" }
    },
    {
      id: 4,
      title: "Portfolio Website",
      description: "Modern, responsive portfolio website showcasing projects and skills with smooth animations and dynamic theming.",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop&crop=center",
      technologies: ["React", "Framer Motion", "Tailwind CSS", "Vite"],
      category: "web",
      featured: false,
      github: "https://github.com/wasiqpatel/portfolio",
      live: "https://wasiqpatel.dev",
      date: "2024",
      rating: 5,
      stats: { views: "1K+", rating: "5.0", visitors: "500+" }
    },
    {
      id: 5,
      title: "Task Management App",
      description: "Collaborative task management tool with team features, project tracking, and deadline management.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop&crop=center",
      technologies: ["React Native", "TypeScript", "GraphQL", "PostgreSQL", "Apollo"],
      category: "mobile",
      featured: false,
      github: "https://github.com/wasiqpatel/task-manager",
      live: "https://task-manager.com",
      date: "2023",
      rating: 4,
      stats: { downloads: "8K+", rating: "4.6", users: "3K+" }
    },
    {
      id: 6,
      title: "Weather App",
      description: "Beautiful weather application with location-based forecasts, interactive maps, and weather alerts.",
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=300&fit=crop&crop=center",
      technologies: ["React Native", "Expo", "OpenWeather API", "AsyncStorage"],
      category: "mobile",
      featured: false,
      github: "https://github.com/wasiqpatel/weather-app",
      live: "https://weather-app.com",
      date: "2023",
      rating: 4,
      stats: { downloads: "15K+", rating: "4.5", users: "7K+" }
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects', count: projects.length },
    { id: 'mobile', name: 'Mobile Apps', count: projects.filter(p => p.category === 'mobile').length },
    { id: 'web', name: 'Web Apps', count: projects.filter(p => p.category === 'web').length },
    { id: 'featured', name: 'Featured', count: projects.filter(p => p.featured).length }
  ];

  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return true;
    if (filter === 'featured') return project.featured;
    return project.category === filter;
  });

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
      className="min-h-screen py-20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700/50 mb-6">
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
            <span className="text-sm font-medium text-gray-300">Available for work</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            My <span className="text-gradient">Projects</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
            A curated collection of mobile and web applications showcasing my expertise in modern development practices and user-centered design
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div variants={itemVariants} className="mb-16">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 p-2 bg-gray-800/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setFilter(category.id)}
                className={`relative px-6 py-3 rounded-xl font-medium transition-all duration-300 text-sm sm:text-base ${
                  filter === category.id
                    ? 'text-white'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
                style={{
                  background: filter === category.id 
                    ? `linear-gradient(135deg, ${currentTheme.accent}, #8b5cf6)`
                    : 'transparent'
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {category.name}
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    filter === category.id 
                      ? 'bg-white/20 text-white' 
                      : 'bg-gray-700/50 text-gray-300'
                  }`}>
                    {category.count}
                  </span>
                </span>
                {filter === category.id && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: `linear-gradient(135deg, ${currentTheme.accent}, #8b5cf6)`,
                      boxShadow: `0 4px 20px ${currentTheme.accent}40`
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                layout
                whileHover={{ y: -8 }}
                className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-gray-600/50 transition-all duration-500 hover:shadow-2xl"
                style={{
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
                }}
              >
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 right-4 z-20">
                    <motion.div 
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold shadow-lg"
                    >
                      <Star className="w-3.5 h-3.5 fill-current" />
                      Featured
                    </motion.div>
                  </div>
                )}

                {/* Project Image */}
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  
                  {/* Category icon */}
                  <div className="absolute top-4 left-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                      {project.category === 'mobile' ? (
                        <Smartphone className="w-5 h-5 text-white/90" />
                      ) : (
                        <Globe className="w-5 h-5 text-white/90" />
                      )}
                    </div>
                  </div>
                  
                  {/* Overlay with actions */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-6">
                    <ThemedButton
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="large"
                      className="hover:scale-110 transition-transform duration-300"
                    >
                      <Code className="w-6 h-6" />
                    </ThemedButton>
                    <ThemedButton
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="large"
                      className="hover:scale-110 transition-transform duration-300"
                    >
                      <Play className="w-6 h-6" />
                    </ThemedButton>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6 space-y-4">
                  {/* Header with title and rating */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-xl font-bold text-white group-hover:text-white transition-colors duration-300 leading-tight">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < project.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-700/50 text-gray-300 border border-gray-600/50 hover:border-gray-500/50 transition-colors duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-700/30 text-gray-400 border border-gray-600/30">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Stats and Date */}
                  <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-gray-700/50">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span className="font-medium">{project.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      {project.stats.downloads && (
                        <span className="font-medium">{project.stats.downloads}</span>
                      )}
                      {project.stats.views && (
                        <span className="font-medium">{project.stats.views}</span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-2">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white transition-all duration-200 border border-gray-600/50 hover:border-gray-500/50 text-sm font-medium"
                    >
                      <Code className="w-4 h-4" />
                      Code
                    </motion.a>
                    <motion.a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-white text-sm font-medium transition-all duration-200"
                      style={{
                        background: `linear-gradient(135deg, ${currentTheme.accent}, #8b5cf6)`,
                        boxShadow: `0 4px 15px ${currentTheme.accent}30`
                      }}
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          variants={itemVariants}
          className="text-center mt-20"
        >
          <div className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-500/10 to-cyan-500/10 rounded-full translate-y-12 -translate-x-12"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
                Ready to Build Something Amazing?
              </h2>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                I'm passionate about creating exceptional mobile and web experiences. Let's collaborate and bring your ideas to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-2xl text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                  style={{
                    background: `linear-gradient(135deg, ${currentTheme.accent}, #8b5cf6)`,
                    boxShadow: `0 8px 25px ${currentTheme.accent}40`
                  }}
                >
                  Start a Project
                </motion.a>
                <motion.a
                  href="/about"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-2xl bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white font-semibold transition-all duration-300 border border-gray-600/50 hover:border-gray-500/50"
                >
                  Learn More
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProjectsPage;
