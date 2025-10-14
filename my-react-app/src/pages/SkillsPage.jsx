import { motion } from 'framer-motion';
import { Code, Smartphone, Database, Cloud, Palette, TestTube, GitBranch, Zap } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const SkillsPage = () => {
  const { currentTheme } = useTheme();

  const skillCategories = [
    {
      title: "Mobile Development",
      icon: Smartphone,
      skills: [
        { name: "React Native", level: 95, years: "3+ years", projects: "20+" },
        { name: "Expo", level: 90, years: "2+ years", projects: "15+" },
        { name: "iOS Development", level: 75, years: "1+ year", projects: "8+" },
        { name: "Android Development", level: 80, years: "2+ years", projects: "12+" },
        { name: "Flutter", level: 60, years: "6 months", projects: "3+" }
      ]
    },
    {
      title: "Frontend Development",
      icon: Code,
      skills: [
        { name: "JavaScript", level: 90, years: "4+ years", projects: "30+" },
        { name: "TypeScript", level: 85, years: "2+ years", projects: "15+" },
        { name: "React", level: 88, years: "3+ years", projects: "25+" },
        { name: "Next.js", level: 75, years: "1+ year", projects: "8+" },
        { name: "Vue.js", level: 70, years: "1+ year", projects: "5+" }
      ]
    },
    {
      title: "Backend Development",
      icon: Database,
      skills: [
        { name: "Node.js", level: 80, years: "2+ years", projects: "12+" },
        { name: "Express.js", level: 85, years: "2+ years", projects: "15+" },
        { name: "MongoDB", level: 75, years: "2+ years", projects: "10+" },
        { name: "PostgreSQL", level: 70, years: "1+ year", projects: "6+" },
        { name: "GraphQL", level: 65, years: "1+ year", projects: "4+" }
      ]
    },
    {
      title: "Cloud & DevOps",
      icon: Cloud,
      skills: [
        { name: "Firebase", level: 90, years: "3+ years", projects: "20+" },
        { name: "AWS", level: 70, years: "1+ year", projects: "5+" },
        { name: "Docker", level: 65, years: "1+ year", projects: "4+" },
        { name: "CI/CD", level: 70, years: "1+ year", projects: "6+" },
        { name: "Vercel", level: 80, years: "1+ year", projects: "8+" }
      ]
    },
    {
      title: "Design & UI/UX",
      icon: Palette,
      skills: [
        { name: "Figma", level: 85, years: "2+ years", projects: "15+" },
        { name: "Adobe XD", level: 75, years: "1+ year", projects: "8+" },
        { name: "UI/UX Design", level: 80, years: "2+ years", projects: "20+" },
        { name: "Prototyping", level: 75, years: "2+ years", projects: "12+" },
        { name: "Design Systems", level: 70, years: "1+ year", projects: "5+" }
      ]
    },
    {
      title: "Testing & Quality",
      icon: TestTube,
      skills: [
        { name: "Jest", level: 80, years: "2+ years", projects: "15+" },
        { name: "React Testing Library", level: 75, years: "1+ year", projects: "8+" },
        { name: "Cypress", level: 70, years: "1+ year", projects: "5+" },
        { name: "Unit Testing", level: 85, years: "2+ years", projects: "20+" },
        { name: "E2E Testing", level: 70, years: "1+ year", projects: "6+" }
      ]
    }
  ];

  const tools = [
    { name: "Git", icon: GitBranch, proficiency: 90 },
    { name: "VS Code", icon: Code, proficiency: 95 },
    { name: "Postman", icon: Cloud, proficiency: 80 },
    { name: "Chrome DevTools", icon: Code, proficiency: 85 },
    { name: "Figma", icon: Palette, proficiency: 85 },
    { name: "Terminal", icon: Code, proficiency: 80 },
    { name: "npm/yarn", icon: Code, proficiency: 90 },
    { name: "Metro", icon: Smartphone, proficiency: 85 }
  ];

  const achievements = [
    {
      title: "React Native Expert",
      description: "Certified React Native developer with advanced knowledge in performance optimization",
      icon: Smartphone,
      color: "#61dafb"
    },
    {
      title: "Mobile App Performance",
      description: "Specialized in creating high-performance mobile applications with smooth animations",
      icon: Zap,
      color: "#f59e0b"
    },
    {
      title: "Cross-Platform Development",
      description: "Expert in building apps that work seamlessly across iOS and Android platforms",
      icon: Smartphone,
      color: "#10b981"
    },
    {
      title: "User Experience Focus",
      description: "Passionate about creating intuitive and delightful user experiences",
      icon: Palette,
      color: "#8b5cf6"
    }
  ];

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
            My <span className="text-gradient">Skills</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A comprehensive overview of my technical skills, tools, and expertise in mobile and web development
          </p>
        </motion.div>

        {/* Skills Categories */}
        <div className="space-y-16 mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              className="bg-gray-800 rounded-xl p-8"
            >
              <div className="flex items-center gap-4 mb-8">
                <div 
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: `${currentTheme.accent}20` }}
                >
                  <category.icon 
                    className="w-8 h-8" 
                    style={{ color: currentTheme.accent }}
                  />
                </div>
                <h2 className="text-2xl font-bold">{category.title}</h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-all duration-300"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-semibold">{skill.name}</h3>
                      <span className="text-sm text-gray-400">{skill.level}%</span>
                    </div>
                    
                    <div className="w-full bg-gray-600 rounded-full h-2 mb-3">
                      <motion.div
                        className="h-2 rounded-full"
                        style={{ backgroundColor: currentTheme.accent }}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                      />
                    </div>

                    <div className="flex justify-between text-sm text-gray-400">
                      <span>{skill.years}</span>
                      <span>{skill.projects} projects</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tools & Technologies */}
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Tools & Technologies</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.name}
                whileHover={{ scale: 1.1, y: -5 }}
                className="text-center group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="p-4 rounded-xl bg-gray-800 group-hover:bg-gray-700 transition-all duration-300 mb-3">
                  <tool.icon 
                    className="w-8 h-8 mx-auto mb-2" 
                    style={{ color: currentTheme.accent }}
                  />
                  <div className="text-xs font-medium">{tool.name}</div>
                </div>
                <div className="text-xs text-gray-400">{tool.proficiency}%</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Key Achievements</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-6 rounded-xl bg-gray-800 hover:bg-gray-700 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div 
                  className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${achievement.color}20` }}
                >
                  <achievement.icon 
                    className="w-8 h-8" 
                    style={{ color: achievement.color }}
                  />
                </div>
                <h3 className="text-lg font-bold mb-2">{achievement.title}</h3>
                <p className="text-sm text-gray-400">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Learning Path */}
        <motion.div variants={itemVariants} className="text-center p-8 rounded-xl bg-gradient-to-r from-gray-800 to-gray-700">
          <h2 className="text-2xl font-bold mb-4">Always Learning</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            I'm constantly exploring new technologies and improving my skills. Currently learning about 
            advanced React Native performance optimization, machine learning integration in mobile apps, 
            and exploring Flutter for cross-platform development.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {['Swift', 'Kotlin', 'Machine Learning', 'Blockchain', 'AR/VR'].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-full bg-gray-600 text-gray-300 text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SkillsPage;
