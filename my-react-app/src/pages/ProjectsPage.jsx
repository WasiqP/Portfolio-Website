import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Smartphone, Globe, Star, Calendar } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ProjectsPage = () => {
  const { currentTheme } = useTheme();
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: "E-Commerce Mobile App",
      description: "A full-featured e-commerce mobile application built with React Native, featuring real-time inventory management, secure payments, and push notifications.",
      image: "/api/placeholder/400/300",
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
      image: "/api/placeholder/400/300",
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
      image: "/api/placeholder/400/300",
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
      image: "/api/placeholder/400/300",
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
      image: "/api/placeholder/400/300",
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
      image: "/api/placeholder/400/300",
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
      className="min-h-screen py-24"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">
            My <span className="text-gradient">Projects</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A collection of mobile and web applications I've built, showcasing my skills and passion for development
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                filter === category.id
                  ? 'text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
              style={{
                background: filter === category.id 
                  ? `linear-gradient(135deg, ${currentTheme.accent}, #8b5cf6)`
                  : 'transparent'
              }}
            >
              {category.name} ({category.count})
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                layout
                whileHover={{ scale: 1.05, y: -10 }}
                className="group relative bg-gray-800 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-500 text-black text-sm font-bold">
                      <Star className="w-4 h-4 fill-current" />
                      Featured
                    </div>
                  </div>
                )}

                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <div 
                    className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${currentTheme.accent}, #8b5cf6)` }}
                  >
                    <Smartphone className="w-16 h-16 text-white opacity-80" />
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-300"
                    >
                      <Github className="w-6 h-6 text-white" />
                    </motion.a>
                    <motion.a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-300"
                    >
                      <ExternalLink className="w-6 h-6 text-white" />
                    </motion.a>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold group-hover:text-white transition-colors duration-300">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-1">
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

                  <p className="text-gray-400 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-gray-700 text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-700 text-gray-300">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {project.date}
                    </div>
                    <div className="flex items-center gap-4">
                      {project.stats.downloads && (
                        <span>{project.stats.downloads} downloads</span>
                      )}
                      {project.stats.views && (
                        <span>{project.stats.views} views</span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 btn btn-secondary text-center justify-center"
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </motion.a>
                    <motion.a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 btn btn-primary text-center justify-center"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live
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
          className="text-center mt-16 p-8 rounded-xl bg-gradient-to-r from-gray-800 to-gray-700"
        >
          <h2 className="text-2xl font-bold mb-4">Interested in Working Together?</h2>
          <p className="text-gray-300 mb-6">
            I'm always excited to take on new challenges and create amazing mobile experiences.
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary"
          >
            Start a Project
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProjectsPage;
