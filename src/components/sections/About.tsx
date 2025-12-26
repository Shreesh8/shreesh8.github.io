import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Database, Lightbulb, Rocket } from 'lucide-react';

const highlights = [
  { icon: Code2, label: 'University', value: 'VIT Bhopal' },
  { icon: Database, label: 'Projects', value: '10+' },
  { icon: Lightbulb, label: 'Technologies', value: '15+' },
  { icon: Rocket, label: 'Batch', value: '2026' },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-24 md:py-32 relative">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-primary/3 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading mb-4">About Me</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full neon-border" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass-card p-8 space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm <span className="text-primary font-semibold">Shreesh Dwivedi</span>, a final-year Computer Science 
                undergraduate at <span className="text-primary font-semibold">VIT Bhopal University</span>.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I have hands-on experience in <span className="text-primary font-semibold">full-stack web development</span>, 
                data analysis, and <span className="text-primary font-semibold">AI-based applications</span>. I enjoy 
                building scalable, real-world products using modern technologies.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I continuously work on improving my problem-solving and engineering skills through 
                JavaScript, Python, and the MERN stack ecosystem.
              </p>
            </div>

            {/* Quick Facts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              {['JavaScript', 'Python', 'React', 'Node.js', 'MongoDB', 'MERN Stack', 'AI/ML', 'Data Analysis'].map((tech, index) => (
                <span
                  key={tech}
                  className="skill-badge"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 gap-6"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-card p-6 text-center group"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary mb-1 neon-glow-sm">
                  {item.value}
                </div>
                <div className="text-sm text-muted-foreground">{item.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
