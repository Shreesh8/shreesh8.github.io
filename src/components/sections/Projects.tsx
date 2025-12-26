import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, Folder } from 'lucide-react';

type ProjectCategory = 'all' | 'web' | 'data';

interface Project {
  title: string;
  description: string;
  tech: string[];
  category: 'web' | 'data';
  github?: string;
  live?: string;
  featured: boolean;
}

const projects: Project[] = [
  {
    title: 'CivicSpot',
    description: 'A full-stack web application that allows users to report societal issues by uploading images and videos, mapped geographically to raise awareness across regions with real-time updates.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Supabase', 'Google Maps API'],
    category: 'web',
    github: 'https://github.com/Shreesh8',
    featured: true,
  },
  {
    title: 'AI Sentiment Analyzer',
    description: 'A machine learning application that analyzes user reviews and social media text to determine sentiment and generate actionable insights.',
    tech: ['Python', 'TensorFlow', 'NLP', 'Flask', 'React'],
    category: 'data',
    github: 'https://github.com/Shreesh8',
    featured: true,
  },
  {
    title: 'Video Object Detection System',
    description: 'A computer vision project that detects and tracks objects in video streams, optimized for performance and real-world use cases.',
    tech: ['Python', 'OpenCV', 'Deep Learning', 'YOLO'],
    category: 'data',
    github: 'https://github.com/Shreesh8',
    featured: true,
  },
  {
    title: 'Data Extractor & Automation Tool',
    description: 'A data extraction system designed to collect, clean, and structure data from multiple sources, enabling efficient analysis and downstream processing.',
    tech: ['Python', 'Pandas', 'Web Scraping', 'APIs', 'Automation'],
    category: 'data',
    github: 'https://github.com/Shreesh8',
    featured: false,
  },
];

const filters: { label: string; value: ProjectCategory }[] = [
  { label: 'All Projects', value: 'all' },
  { label: 'Web Development', value: 'web' },
  { label: 'Data Science', value: 'data' },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('all');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const filteredProjects = projects.filter(
    (project) => activeFilter === 'all' || project.category === activeFilter
  );

  return (
    <section id="projects" className="py-24 md:py-32 relative">
      {/* Background decorations */}
      <div className="absolute top-1/3 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-heading mb-4">Featured Projects</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full neon-border" />
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
            A selection of projects showcasing my expertise in web development and data science.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filters.map((filter) => (
            <motion.button
              key={filter.value}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(filter.value)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter.value
                  ? 'bg-primary text-primary-foreground neon-border'
                  : 'glass-card text-muted-foreground hover:text-primary'
              }`}
            >
              {filter.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass-card p-6 flex flex-col h-full group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Folder className="w-6 h-6 text-primary" />
                </div>
                <div className="flex gap-3">
                  {project.github && (
                    <motion.a
                      href={project.github}
                      whileHover={{ scale: 1.2, y: -2 }}
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label="View on GitHub"
                    >
                      <Github size={20} />
                    </motion.a>
                  )}
                  {project.live && (
                    <motion.a
                      href={project.live}
                      whileHover={{ scale: 1.2, y: -2 }}
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label="View live demo"
                    >
                      <ExternalLink size={20} />
                    </motion.a>
                  )}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-1 rounded bg-muted/50 text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute top-4 right-4">
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary border border-primary/30">
                    Featured
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* More Projects Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://github.com/Shreesh8"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            View More on GitHub
            <ExternalLink size={16} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
