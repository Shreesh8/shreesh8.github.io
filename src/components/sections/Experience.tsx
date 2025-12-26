import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Briefcase, Award, Calendar } from 'lucide-react';

interface TimelineItem {
  type: 'education' | 'work' | 'achievement';
  title: string;
  organization: string;
  period: string;
  description: string;
  highlights?: string[];
}

const timelineData: TimelineItem[] = [
  {
    type: 'education',
    title: 'B.Tech in Computer Science Engineering',
    organization: 'VIT Bhopal University',
    period: '2022 – 2026',
    description: 'Final-year Computer Science student with a strong focus on Full-Stack Development (MERN) and Data Science / AI. Actively building real-world projects and applying engineering principles to solve practical problems.',
    highlights: ['Final Year', 'MERN Stack', 'Data Science & AI'],
  },
  {
    type: 'work',
    title: 'Data Science Intern',
    organization: 'Quant AI',
    period: 'May 2025 – Aug 2025',
    description: 'Contributing to AI-driven and data-focused solutions for real-world use cases. Worked on data extraction, processing, and analysis pipelines. Collaborated with cross-functional teams to support web-based and AI-integrated systems.',
    highlights: ['Data Analysis', 'Python', 'SQL', 'AI Solutions', 'Web Integration'],
  },
  {
    type: 'work',
    title: 'Full-Stack Developer Intern',
    organization: 'Client-Based Work',
    period: 'Mar 2024 – Jun 2024',
    description: 'Developed and enhanced full-stack web applications using the MERN stack. Implemented authentication, APIs, and database-driven features. Focused on clean architecture, scalability, and maintainable code.',
    highlights: ['React', 'Node.js', 'Express', 'MongoDB', 'REST APIs'],
  },
  {
    type: 'achievement',
    title: 'Open Source Contributor',
    organization: 'GitHub',
    period: '2025 – Present',
    description: 'Contributed to open-source projects focused on web development and tooling. Worked on bug fixes, feature enhancements, and documentation improvements. Actively used Git, GitHub workflows, and collaborative development practices.',
    highlights: ['Open Source', 'Git', 'React', 'Documentation', 'Bug Fixes'],
  },
];

const getIcon = (type: TimelineItem['type']) => {
  switch (type) {
    case 'education':
      return GraduationCap;
    case 'work':
      return Briefcase;
    case 'achievement':
      return Award;
  }
};

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="py-24 md:py-32 relative">
      {/* Background decorations */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-0 w-64 h-64 bg-primary/3 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading mb-4">Experience & Education</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full neon-border" />
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
            My journey in tech - from education to real-world experience and achievements.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto relative">
          {/* Timeline Line */}
          <div className="timeline-line" />

          {timelineData.map((item, index) => {
            const Icon = getIcon(item.type);
            
            return (
              <motion.div
                key={`${item.title}-${index}`}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative pl-16 pb-12 last:pb-0"
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 top-0 -translate-x-1/2">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: index * 0.15 + 0.2 }}
                    className="w-12 h-12 rounded-full bg-muted flex items-center justify-center border-2 border-primary/50"
                    style={{
                      boxShadow: '0 0 15px hsl(var(--neon-cyan) / 0.3)',
                    }}
                  >
                    <Icon className="w-5 h-5 text-primary" />
                  </motion.div>
                </div>

                {/* Content Card */}
                <motion.div
                  whileHover={{ x: 10 }}
                  className="glass-card p-6"
                >
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">
                        {item.title}
                      </h3>
                      <p className="text-primary font-medium">
                        {item.organization}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar size={14} />
                      {item.period}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground mb-4">
                    {item.description}
                  </p>

                  {/* Highlights */}
                  {item.highlights && (
                    <div className="flex flex-wrap gap-2">
                      {item.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
