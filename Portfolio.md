Pages - Folder

Portfolio - file

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Terminal, 
  Code, 
  Database, 
  Server, 
  Cloud,
  GitBranch,
  Coffee,
  Zap,
  Monitor,
  Smartphone,
  Globe,
  ArrowRight,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Download
} from "lucide-react";

import TerminalHero from "../components/portfolio/TerminalHero";
import TechStack from "../components/portfolio/TechStack";
import ProjectsShowcase from "../components/portfolio/ProjectsShowcase";
import ExperienceTimeline from "../components/portfolio/ExperienceTimeline";
import ContactTerminal from "../components/portfolio/ContactTerminal";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('hero');
  const sectionRefs = useRef({});

  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '-100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-400">
      {/* Hero Section */}
      <section 
        id="hero" 
        ref={el => sectionRefs.current.hero = el}
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        <TerminalHero />
      </section>

      {/* About Section */}
      <section 
        id="about" 
        ref={el => sectionRefs.current.about = el}
        className="py-20 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 glow-text">
              $ cat about_me.txt
            </h2>
            <div className="code-block rounded-xl p-8 max-w-4xl mx-auto text-left">
              <pre className="text-lg leading-relaxed">
{`/**
 * Senior Full-Stack Java Developer
 * Specializing in Enterprise Architecture & Cloud Solutions
 * 
 * @author        Alex "CodeNinja" Thompson  
 * @experience   8+ years building scalable systems
 * @expertise     Spring Boot, Microservices, AWS, React
 * @passion       Clean code, performance optimization, DevOps
 * @coffee_cups   ∞ (Stack overflow exception in coffee counter)
 */

public class Developer {
    private final String name = "Alex Thompson";
    private final List<String> specialties = Arrays.asList(
        "Backend Architecture", "API Design", "Cloud Infrastructure",
        "Database Optimization", "CI/CD Pipelines", "Frontend Integration"
    );
    
    public void solve(Problem problem) {
        while (!problem.isSolved()) {
            this.drinkCoffee();
            this.writeCode();
            this.refactor();
        }
    }
}`}
              </pre>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section 
        id="skills" 
        ref={el => sectionRefs.current.skills = el}
        className="py-20 px-6 bg-gradient-to-b from-black via-gray-900 to-black"
      >
        <TechStack />
      </section>

      {/* Projects Section */}
      <section 
        id="projects" 
        ref={el => sectionRefs.current.projects = el}
        className="py-20 px-6"
      >
        <ProjectsShowcase />
      </section>

      {/* Experience Section */}
      <section 
        id="experience" 
        ref={el => sectionRefs.current.experience = el}
        className="py-20 px-6 bg-gradient-to-b from-black via-gray-900 to-black"
      >
        <ExperienceTimeline />
      </section>

      {/* Contact Section */}
      <section 
        id="contact" 
        ref={el => sectionRefs.current.contact = el}
        className="py-20 px-6"
      >
        <ContactTerminal />
      </section>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button className="w-12 h-12 rounded-full bg-green-600 hover:bg-green-500 glow-border">
            <Github className="w-5 h-5" />
          </Button>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-500 glow-border">
            <Linkedin className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>

      {/* Progress Indicator */}
      <div className="fixed left-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4">
        {['hero', 'about', 'skills', 'projects', 'experience', 'contact'].map((section) => (
          <div
            key={section}
            className={`w-2 h-8 rounded-full transition-all duration-300 ${
              activeSection === section 
                ? 'bg-green-400 glow-border' 
                : 'bg-gray-600 hover:bg-gray-500'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

Componenets - Folder
Portfolio - Folder

TerminalHero - File


import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Terminal, 
  Download, 
  Mail,
  Database,
  Server,
  Coffee,
  Zap,
  Code
} from "lucide-react";

const codeLines = [
  "public class FullStackDeveloper {",
  "    private String name = \"Alex Thompson\";",
  "    private List<String> expertise = Arrays.asList(",
  "        \"Spring Boot\", \"Microservices\", \"React\",",
  "        \"AWS\", \"Docker\", \"Kubernetes\"",
  "    );",
  "    ",
  "    @Override",
  "    public void buildAmazingApps() {",
  "        while (true) {",
  "            this.writeCleanCode();",
  "            this.optimizePerformance();",
  "            this.deployToCloud();",
  "        }",
  "    }",
  "}"
];

export default function TerminalHero() {
  const [displayedCode, setDisplayedCode] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (!isTyping || currentLine >= codeLines.length) return;

    const timer = setTimeout(() => {
      const line = codeLines[currentLine];
      
      if (currentChar < line.length) {
        setDisplayedCode(prev => {
          const newCode = [...prev];
          newCode[currentLine] = line.substring(0, currentChar + 1);
          return newCode;
        });
        setCurrentChar(prev => prev + 1);
      } else {
        setCurrentChar(0);
        setCurrentLine(prev => prev + 1);
        setDisplayedCode(prev => [...prev, ""]);
      }
    }, Math.random() * 50 + 30);

    return () => clearTimeout(timer);
  }, [currentChar, currentLine, isTyping]);

  return (
    <div className="relative w-full max-w-7xl mx-auto px-6 py-20">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-blue-400 text-xl"
            >
              $ echo "Hello World"
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold">
              <span className="text-white">Alex</span>
              <br />
              <span className="text-green-400 glow-text">Thompson</span>
            </h1>
            
            <div className="text-xl md:text-2xl text-gray-300 space-y-2">
              <div className="terminal-cursor">Senior Full-Stack Java Developer</div>
              <div className="text-purple-400">
                // Crafting enterprise-grade applications
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button className="bg-green-600 hover:bg-green-500 text-black font-bold glow-border group">
              <Download className="w-4 h-4 mr-2 group-hover:animate-bounce" />
              Download Resume.pdf
            </Button>
            <Button variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black glow-border">
              <Mail className="w-4 h-4 mr-2" />
              Get In Touch
            </Button>
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              Available for new opportunities
            </div>
            <div>
              📍 San Francisco, CA
            </div>
          </div>
        </motion.div>

        {/* Right Side - Terminal Window */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative"
        >
          <div className="code-block rounded-lg p-6 glow-border floating-element">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-700">
              <Terminal className="w-5 h-5 text-green-400" />
              <span className="text-gray-300 text-sm">Developer.java</span>
              <div className="ml-auto flex gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
            
            {/* Code Content */}
            <div className="text-sm font-mono space-y-1">
              {displayedCode.map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex"
                >
                  <span className="text-gray-600 w-8 text-right mr-4">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-green-300">
                    {line}
                    {index === currentLine && isTyping && (
                      <span className="bg-green-400 text-black ml-1 animate-pulse">█</span>
                    )}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Floating Tech Icons */}
          <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center opacity-20 floating-element">
            <Database className="w-8 h-8" />
          </div>
          <div className="absolute -bottom-10 -left-10 w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center opacity-20 floating-element" style={{animationDelay: '2s'}}>
            <Server className="w-6 h-6" />
          </div>
        </motion.div>
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
      >
        {[
          { label: "Years Experience", value: "8+", icon: Coffee },
          { label: "Projects Deployed", value: "50+", icon: Zap },
          { label: "Lines of Code", value: "1M+", icon: Code },
          { label: "Coffee Consumed", value: "∞", icon: Terminal }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            whileHover={{ scale: 1.05 }}
            className="text-center p-6 rounded-lg border border-green-400/20 bg-black/50 glow-border"
          >
            <stat.icon className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-3xl font-bold text-white">{stat.value}</div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}


TechStack - File

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const techCategories = {
  "Backend": {
    color: "text-red-400",
    icon: "🔧",
    technologies: [
      { name: "Java", level: 95, description: "Enterprise applications, Spring ecosystem" },
      { name: "Spring Boot", level: 90, description: "RESTful APIs, microservices architecture" },
      { name: "Spring Security", level: 85, description: "OAuth2, JWT, authentication systems" },
      { name: "Hibernate/JPA", level: 88, description: "ORM mapping, database optimization" },
      { name: "Maven/Gradle", level: 82, description: "Dependency management, build automation" }
    ]
  },
  "Database": {
    color: "text-blue-400", 
    icon: "🗄️",
    technologies: [
      { name: "PostgreSQL", level: 90, description: "Complex queries, performance tuning" },
      { name: "MySQL", level: 85, description: "CRUD operations, stored procedures" },
      { name: "MongoDB", level: 78, description: "NoSQL, document-based storage" },
      { name: "Redis", level: 80, description: "Caching, session management" },
      { name: "Elasticsearch", level: 70, description: "Search engines, log analysis" }
    ]
  },
  "Cloud & DevOps": {
    color: "text-purple-400",
    icon: "☁️",
    technologies: [
      { name: "AWS", level: 88, description: "EC2, S3, Lambda, RDS, CloudFormation" },
      { name: "Docker", level: 85, description: "Containerization, microservices deployment" },
      { name: "Kubernetes", level: 75, description: "Orchestration, scaling, service mesh" },
      { name: "Jenkins", level: 80, description: "CI/CD pipelines, automated testing" },
      { name: "Terraform", level: 72, description: "Infrastructure as Code, resource management" }
    ]
  },
  "Frontend": {
    color: "text-yellow-400",
    icon: "🎨", 
    technologies: [
      { name: "React", level: 85, description: "Component architecture, state management" },
      { name: "TypeScript", level: 80, description: "Type safety, enterprise applications" },
      { name: "Angular", level: 75, description: "Enterprise frontends, RxJS" },
      { name: "JavaScript", level: 88, description: "ES6+, async programming, DOM manipulation" },
      { name: "Tailwind CSS", level: 82, description: "Responsive design, utility-first CSS" }
    ]
  }
};

export default function TechStack() {
  const [selectedCategory, setSelectedCategory] = useState("Backend");
  const [hoveredTech, setHoveredTech] = useState(null);

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-6 glow-text">
          $ ls -la /skills/
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Comprehensive technology stack mastered through years of enterprise development
        </p>
      </motion.div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {Object.entries(techCategories).map(([category, data]) => (
          <motion.button
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-3 rounded-lg border transition-all duration-300 ${
              selectedCategory === category
                ? 'border-green-400 bg-green-400/10 text-green-400 glow-border'
                : 'border-gray-600 text-gray-400 hover:border-gray-500'
            }`}
          >
            <span className="mr-2">{data.icon}</span>
            {category}
          </motion.button>
        ))}
      </div>

      {/* Tech Grid */}
      <motion.div
        key={selectedCategory}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {techCategories[selectedCategory].technologies.map((tech, index) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            onHoverStart={() => setHoveredTech(tech)}
            onHoverEnd={() => setHoveredTech(null)}
          >
            <Card className="bg-black/60 border-gray-700 hover:border-green-400/50 transition-all duration-300 project-card">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-white">{tech.name}</h3>
                  <Badge variant="outline" className={`${techCategories[selectedCategory].color} border-current`}>
                    {tech.level}%
                  </Badge>
                </div>
                
                <Progress 
                  value={tech.level} 
                  className="mb-4 h-2 bg-gray-800"
                />
                
                <p className="text-gray-400 text-sm">
                  {tech.description}
                </p>
                
                {/* Proficiency Indicator */}
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-xs text-gray-500">Proficiency:</span>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          i < Math.floor(tech.level / 20) 
                            ? 'bg-green-400' 
                            : 'bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Selected Tech Detail */}
      {hoveredTech && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-6 rounded-lg bg-gradient-to-r from-green-400/10 to-blue-400/10 border border-green-400/30"
        >
          <h4 className="text-2xl font-bold text-green-400 mb-2">{hoveredTech.name}</h4>
          <p className="text-gray-300 text-lg">{hoveredTech.description}</p>
        </motion.div>
      )}

      {/* Terminal Command */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-16 text-center"
      >
        <div className="code-block rounded-lg p-4 inline-block glow-border">
          <span className="text-gray-500">alex@portfolio:~$ </span>
          <span className="text-green-400">grep -r "passionate developer" ./</span>
          <div className="text-yellow-400 mt-2">
            → Match found: Building scalable solutions with clean, maintainable code 🚀
          </div>
        </div>
      </motion.div>
    </div>
  );
}

ProjectSowcase -File

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Database, Server, Globe, Smartphone } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "E-Commerce Microservices Platform",
    category: "Enterprise Architecture",
    description: "Scalable microservices architecture handling 100K+ daily transactions",
    tech: ["Spring Boot", "Docker", "Kubernetes", "PostgreSQL", "Redis", "AWS"],
    details: {
      challenge: "Legacy monolith causing performance bottlenecks",
      solution: "Decomposed into 12 microservices with event-driven architecture",
      impact: "99.9% uptime, 60% faster response times, 40% cost reduction"
    },
    metrics: {
      "Response Time": "< 200ms",
      "Throughput": "10K RPS",
      "Availability": "99.9%",
      "Cost Reduction": "40%"
    },
    codeSnippet: `@RestController
@RequestMapping("/api/orders")
public class OrderController {
    
    @Autowired
    private OrderService orderService;
    
    @PostMapping
    @Async("taskExecutor")
    public ResponseEntity<OrderDTO> createOrder(
            @RequestBody OrderRequest request) {
        
        OrderDTO order = orderService
            .processOrderAsync(request);
        
        return ResponseEntity.ok(order);
    }
}`,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600"
  },
  {
    id: 2,
    title: "Real-time Analytics Dashboard",
    category: "Data Engineering",
    description: "High-performance analytics processing 1M+ events per minute",
    tech: ["Spring WebFlux", "Apache Kafka", "InfluxDB", "React", "D3.js"],
    details: {
      challenge: "Real-time processing of massive data streams",
      solution: "Event-driven architecture with reactive streams",
      impact: "Sub-second analytics, 95% reduction in data latency"
    },
    metrics: {
      "Events/Min": "1M+",
      "Latency": "< 100ms",
      "Data Points": "50B+",
      "Users": "10K+"
    },
    codeSnippet: `@Component
public class EventProcessor {
    
    @KafkaListener(topics = "user-events")
    public Mono<Void> processEvent(
            @Payload UserEvent event) {
        
        return analyticsService
            .processEvent(event)
            .then(metricsService::updateMetrics)
            .doOnError(this::handleError);
    }
}`,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600"
  },
  {
    id: 3,
    title: "AI-Powered Recommendation Engine",
    category: "Machine Learning",
    description: "ML-driven product recommendations increasing conversion by 35%",
    tech: ["Spring AI", "Python", "TensorFlow", "Apache Spark", "Elasticsearch"],
    details: {
      challenge: "Improve user engagement and conversion rates",
      solution: "Hybrid collaborative + content-based filtering with deep learning",
      impact: "35% increase in conversion, 60% better user engagement"
    },
    metrics: {
      "Conversion Lift": "+35%",
      "Accuracy": "94%",
      "Response Time": "< 50ms",
      "A/B Test": "Winner"
    },
    codeSnippet: `@Service
public class RecommendationEngine {
    
    @Cacheable("recommendations")
    public List<Product> getRecommendations(
            Long userId, int limit) {
        
        UserProfile profile = getUserProfile(userId);
        Matrix similarities = computeSimilarities(profile);
        
        return mlService
            .predict(similarities, limit)
            .stream()
            .map(this::toProduct)
            .collect(toList());
    }
}`,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600"
  }
];

export default function ProjectsShowcase() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = ["All", ...new Set(projects.map(p => p.category))];

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-6 glow-text">
          $ git log --projects
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Production-ready applications showcasing advanced Java development patterns
        </p>
      </motion.div>

      {/* Project Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeFilter === category ? "default" : "outline"}
            onClick={() => setActiveFilter(category)}
            className={`${
              activeFilter === category 
                ? 'bg-green-600 text-black glow-border' 
                : 'border-gray-600 text-gray-400 hover:border-green-400 hover:text-green-400'
            }`}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Projects Grid */}
      <motion.div layout className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
        <AnimatePresence mode="wait">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <Card 
                className="bg-black/60 border-gray-700 hover:border-green-400/50 transition-all duration-500 project-card cursor-pointer group overflow-hidden"
                onClick={() => setSelectedProject(project)}
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <Badge className="absolute top-4 right-4 bg-green-600 text-black">
                    {project.category}
                  </Badge>
                </div>

                <CardHeader className="p-6 pb-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {project.description}
                  </p>
                </CardHeader>

                <CardContent className="p-6 pt-0">
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 4).map((tech) => (
                      <Badge 
                        key={tech} 
                        variant="outline" 
                        className="text-xs border-gray-600 text-gray-300"
                      >
                        {tech}
                      </Badge>
                    ))}
                    {project.tech.length > 4 && (
                      <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                        +{project.tech.length - 4} more
                      </Badge>
                    )}
                  </div>

                  {/* Quick Metrics */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {Object.entries(project.metrics).slice(0, 2).map(([key, value]) => (
                      <div key={key} className="text-center p-2 rounded bg-gray-800/50">
                        <div className="text-green-400 font-bold">{value}</div>
                        <div className="text-gray-500 text-xs">{key}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-black border border-green-400/50 rounded-xl p-8 max-w-4xl max-h-[90vh] overflow-y-auto glow-border"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {selectedProject.title}
                  </h3>
                  <Badge className="bg-green-600 text-black">
                    {selectedProject.category}
                  </Badge>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedProject(null)}
                  className="border-gray-600 text-gray-400"
                >
                  ✕
                </Button>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Project Details */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-bold text-green-400 mb-3">Technical Challenge</h4>
                    <p className="text-gray-300">{selectedProject.details.challenge}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-bold text-blue-400 mb-3">Solution Architecture</h4>
                    <p className="text-gray-300">{selectedProject.details.solution}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-bold text-purple-400 mb-3">Business Impact</h4>
                    <p className="text-gray-300">{selectedProject.details.impact}</p>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(selectedProject.metrics).map(([key, value]) => (
                      <div key={key} className="text-center p-4 rounded bg-gray-800/50 border border-gray-700">
                        <div className="text-2xl font-bold text-green-400">{value}</div>
                        <div className="text-gray-400 text-sm">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Code Snippet */}
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-yellow-400">Code Implementation</h4>
                  <div className="code-block rounded-lg p-4">
                    <pre className="text-sm text-green-300 overflow-x-auto">
                      {selectedProject.codeSnippet}
                    </pre>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <h4 className="text-lg font-bold text-cyan-400 mb-3">Technology Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((tech) => (
                        <Badge 
                          key={tech} 
                          variant="outline" 
                          className="border-gray-600 text-gray-300"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-4">
                    <Button className="flex-1 bg-green-600 hover:bg-green-500 text-black font-bold">
                      <Github className="w-4 h-4 mr-2" />
                      View Source
                    </Button>
                    <Button variant="outline" className="flex-1 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Terminal Command */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-16 text-center"
      >
        <div className="code-block rounded-lg p-4 inline-block glow-border">
          <span className="text-gray-500">alex@portfolio:~$ </span>
          <span className="text-green-400">find ./projects -name "*.java" | wc -l</span>
          <div className="text-yellow-400 mt-2">
            → 2,847 Java files and counting... 📈
          </div>
        </div>
      </motion.div>
    </div>
  );
}

ExperienceTimeline -File

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, MapPin, Calendar, TrendingUp, Code, Users } from "lucide-react";

const experiences = [
  {
    title: "Senior Java Architect",
    company: "TechCorp Industries",
    location: "San Francisco, CA",
    duration: "2021 - Present",
    type: "Full-time",
    achievements: [
      "Led migration of monolithic system to microservices architecture serving 2M+ users",
      "Implemented DevOps practices reducing deployment time by 80%",
      "Mentored team of 8 developers on Spring Boot best practices",
      "Architected event-driven systems processing 500K+ daily transactions"
    ],
    technologies: ["Java 17", "Spring Boot", "Kubernetes", "AWS", "Apache Kafka", "PostgreSQL"],
    metrics: {
      "System Uptime": "99.9%",
      "Performance Gain": "+65%", 
      "Team Size": "12 devs",
      "Budget Saved": "$2M+"
    }
  },
  {
    title: "Full-Stack Java Developer",
    company: "StartupHub Solutions",
    location: "Austin, TX",
    duration: "2019 - 2021",
    type: "Full-time", 
    achievements: [
      "Built scalable REST APIs handling 50K+ concurrent users",
      "Developed real-time notification system using WebSockets",
      "Optimized database queries improving response time by 70%",
      "Implemented comprehensive testing achieving 95% code coverage"
    ],
    technologies: ["Java 11", "Spring Framework", "React", "Docker", "Jenkins", "MySQL"],
    metrics: {
      "API Endpoints": "150+",
      "Code Coverage": "95%",
      "Response Time": "-70%",
      "Bug Reports": "-85%"
    }
  },
  {
    title: "Java Backend Developer", 
    company: "Enterprise Systems Ltd",
    location: "Seattle, WA",
    duration: "2017 - 2019",
    type: "Full-time",
    achievements: [
      "Developed enterprise inventory management system for Fortune 500 client",
      "Created automated testing framework reducing QA cycle time by 60%",
      "Integrated third-party APIs and payment gateways",
      "Participated in code reviews and knowledge sharing sessions"
    ],
    technologies: ["Java 8", "Spring MVC", "Hibernate", "Oracle DB", "JUnit", "Maven"],
    metrics: {
      "System Users": "10K+",
      "Data Records": "50M+",
      "Test Coverage": "90%",
      "Client Rating": "5/5 ⭐"
    }
  }
];

export default function ExperienceTimeline() {
  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-6 glow-text">
          $ cat career_timeline.log
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Professional journey through enterprise Java development and system architecture
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-400 via-blue-400 to-purple-400"></div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative pl-20"
            >
              {/* Timeline Dot */}
              <motion.div 
                className="absolute left-6 top-8 w-4 h-4 bg-green-400 rounded-full glow-border"
                whileHover={{ scale: 1.5 }}
              />

              <Card className="bg-black/60 border-gray-700 hover:border-green-400/50 transition-all duration-300 project-card">
                <CardHeader className="p-6 pb-4">
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-white">{exp.title}</h3>
                      <div className="flex items-center gap-4 text-gray-400">
                        <div className="flex items-center gap-1">
                          <Building className="w-4 h-4" />
                          {exp.company}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {exp.location}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-blue-600 text-white mb-2">
                        {exp.type}
                      </Badge>
                      <div className="flex items-center gap-1 text-gray-400 text-sm">
                        <Calendar className="w-4 h-4" />
                        {exp.duration}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6 pt-0 space-y-6">
                  {/* Key Achievements */}
                  <div>
                    <h4 className="text-lg font-bold text-green-400 mb-3 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Key Achievements
                    </h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                          <span className="text-green-400 mt-1">▶</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {Object.entries(exp.metrics).map(([key, value]) => (
                      <div key={key} className="text-center p-3 rounded bg-gray-800/50 border border-gray-700">
                        <div className="text-yellow-400 font-bold text-lg">{value}</div>
                        <div className="text-gray-500 text-xs">{key}</div>
                      </div>
                    ))}
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="text-lg font-bold text-blue-400 mb-3 flex items-center gap-2">
                      <Code className="w-5 h-5" />
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <Badge 
                          key={tech} 
                          variant="outline" 
                          className="border-gray-600 text-gray-300 hover:border-blue-400 hover:text-blue-400 transition-colors"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Terminal Command */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-16 text-center"
      >
        <div className="code-block rounded-lg p-4 inline-block glow-border">
          <span className="text-gray-500">alex@portfolio:~$ </span>
          <span className="text-green-400">git log --oneline --author="Alex" | wc -l</span>
          <div className="text-yellow-400 mt-2">
            → 3,247 commits and still pushing code daily 🚀
          </div>
        </div>
      </motion.div>
    </div>
  );
}

ContactTerminal -File


import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Mail, Github, Linkedin, MapPin, Phone, Send, Terminal } from "lucide-react";

const contactCommands = [
  "alex@portfolio:~$ contact --info",
  "> Email: alex.thompson@devmail.com",
  "> Phone: +1 (555) 123-4567", 
  "> Location: San Francisco, CA",
  "> GitHub: github.com/alexthompson",
  "> LinkedIn: linkedin.com/in/alexthompson",
  "",
  "alex@portfolio:~$ availability --status",
  "> Status: Open to new opportunities",
  "> Preferred: Senior/Lead Java positions",
  "> Remote: Available worldwide",
  "> Start Date: 2-4 weeks notice",
  "",
  "alex@portfolio:~$ skills --primary",
  "> Java, Spring Boot, Microservices",
  "> AWS, Docker, Kubernetes, CI/CD",
  "> PostgreSQL, MongoDB, Redis",
  "> React, TypeScript, REST APIs",
  "",
  "alex@portfolio:~$ _"
];

export default function ContactTerminal() {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    if (currentLine < contactCommands.length && isTyping) {
      const timer = setTimeout(() => {
        setDisplayedLines(prev => [...prev, contactCommands[currentLine]]);
        setCurrentLine(prev => prev + 1);
      }, currentLine === 0 ? 1000 : 300);

      return () => clearTimeout(timer);
    }
  }, [currentLine, isTyping]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the form submission
    console.log('Form submitted:', formData);
    alert('Message sent! I\'ll get back to you soon.');
  };

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-6 glow-text">
          $ ./contact_me.sh
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Ready to collaborate on your next enterprise Java project
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Terminal Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="code-block glow-border h-full">
            <CardHeader className="p-6 border-b border-gray-700">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-bold">alex@contact-terminal</span>
                <span className="text-gray-500">~</span>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-1 text-sm">
                {displayedLines.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`${
                      line.startsWith('>')
                        ? 'text-yellow-400 ml-4'
                        : line.startsWith('alex@')
                        ? 'text-green-400'
                        : line === ''
                        ? 'h-2'
                        : 'text-gray-300 ml-4'
                    }`}
                  >
                    {line}
                  </motion.div>
                ))}
                {isTyping && currentLine >= contactCommands.length && (
                  <div className="text-green-400 terminal-cursor">
                    alex@portfolio:~$ echo "Let's build something amazing together!"
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Card className="code-block glow-border">
            <CardHeader className="p-6 border-b border-gray-700">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <Mail className="w-6 h-6 text-blue-400" />
                Send Message
              </h3>
              <p className="text-gray-400">Let's discuss your next project</p>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-green-400 text-sm">$ echo "Your Name"</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="bg-gray-900 border-gray-600 text-white focus:border-green-400"
                    placeholder="John Developer"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-green-400 text-sm">$ echo "Your Email"</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="bg-gray-900 border-gray-600 text-white focus:border-green-400"
                    placeholder="john@company.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-green-400 text-sm">$ cat message.txt</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="bg-gray-900 border-gray-600 text-white focus:border-green-400 h-32"
                    placeholder="Hi Alex, I'd love to discuss a Java development opportunity..."
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-500 text-black font-bold text-lg py-6 glow-border group"
                >
                  <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                  ./send_message.sh
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Links */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            {[
              { icon: Github, label: "GitHub", handle: "@alexthompson", color: "text-gray-300" },
              { icon: Linkedin, label: "LinkedIn", handle: "/alexthompson", color: "text-blue-400" },
              { icon: Mail, label: "Email", handle: "alex@devmail.com", color: "text-green-400" },
              { icon: Phone, label: "Phone", handle: "+1 555 123 4567", color: "text-purple-400" }
            ].map((contact, index) => (
              <motion.div
                key={contact.label}
                whileHover={{ scale: 1.05 }}
                className={`p-4 rounded-lg border border-gray-700 bg-black/40 hover:border-green-400/50 transition-all duration-300 cursor-pointer ${contact.color}`}
              >
                <contact.icon className="w-6 h-6 mb-2" />
                <div className="text-sm font-bold">{contact.label}</div>
                <div className="text-xs text-gray-500">{contact.handle}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Final Terminal Message */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-16 text-center"
      >
        <div className="code-block rounded-lg p-6 inline-block glow-border">
          <div className="text-green-400 text-lg mb-2">
            System.out.println("Thanks for visiting my portfolio!");
          </div>
          <div className="text-gray-400 text-sm">
            // Ready to architect your next big idea? Let's connect! 🚀
          </div>
        </div>
      </motion.div>
    </div>
  );
}


Layout.js

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function Layout({ children, currentPageName }) {
  return (
    <div className="min-h-screen bg-black text-green-400 font-mono overflow-x-hidden">
      {/* Matrix Background Animation */}
      <div className="fixed inset-0 z-0 opacity-10">
        <div className="matrix-bg h-full w-full"></div>
      </div>
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-black/80 border-b border-green-400/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold text-green-400 glow-text">
              &lt;DevPortfolio/&gt;
            </div>
            <div className="hidden md:flex space-x-8">
              {['Portfolio', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-300 hover:text-green-400 transition-all duration-300 hover:glow-text"
                >
                  {item}
                </a>
              ))}
            </div>
            <div className="text-sm text-gray-500">
              $ whoami
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 pt-20">
        {children}
      </main>

      {/* Custom Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap');
        
        body {
          font-family: 'JetBrains Mono', monospace;
        }
        
        .glow-text {
          text-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor;
        }
        
        .glow-border {
          box-shadow: 0 0 10px rgba(34, 197, 94, 0.3), inset 0 0 10px rgba(34, 197, 94, 0.1);
        }
        
        .matrix-bg {
          background: linear-gradient(90deg, transparent 98%, #22c55e 100%), 
                      linear-gradient(180deg, transparent 98%, #22c55e 100%);
          background-size: 50px 50px;
          animation: matrix-move 20s linear infinite;
        }
        
        @keyframes matrix-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(-50px, -50px); }
        }
        
        @keyframes terminal-blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        .terminal-cursor::after {
          content: '█';
          color: #22c55e;
          animation: terminal-blink 1s infinite;
        }
        
        .code-block {
          background: rgba(0, 0, 0, 0.8);
          border: 1px solid rgba(34, 197, 94, 0.3);
          backdrop-filter: blur(10px);
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .floating-element {
          animation: float 6s ease-in-out infinite;
        }
        
        .tech-icon:hover {
          transform: scale(1.1) rotateY(180deg);
          transition: all 0.3s ease;
        }
        
        .project-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(34, 197, 94, 0.2);
        }
      `}</style>
    </div>
  );
}

Resume:

ANUP DAVIN MATHIVANAN

Software Engineer | Devops | Java Full Stack Development | https://www.linkedin.com/in/anup-davin-mathivanan

+65 839 85072 I +91 9500499143| davinanup@gmail.com | Singapore - 323101

Devops and Full Stack Java Development

Dedicated Full Stack Java Devops engineer with 8+ years of experience in Java
Devops with Github, Bitbucket, Bamboo, Jenkins, Nexus, developing high-
performance web applications, specializing in payment processing systems and
enterprise system management projects. Based in Singapore and India,
proficient in core technologies such as Java (Java 8+ (JDK 21), J2EE), Spring
Boot, Spring Security, Hibernate, SQL, Angular, and JavaScript. Strong
background in the overall software development life cycle (SDLC), with hands-
on experience in both front-end and back-end development for multi domain
projects. Solid foundation in Agile and Waterfall methodologies.
Proficient in designing and implementing RESTful Web Services and maintaining
scalable microservices and enterprise-level web architectures. Adept at
understanding business requirements, translating them into technical solutions,
and writing clean, efficient, and maintainable code. Skilled in cloud
infrastructure and ensuring applications are optimized for performance and
scalability.
Key Skills and Expertise:
Full Stack Development: Hands-on experience in developing end-to-end web
applications using Java, Spring Boot, and Angular, React. Proficient in both
frontend and backend development, focusing on creating seamless and
responsive user experiences while maintaining robust and secure backend
services.
Backend Expertise: Developed and maintained backend services using Java,
Spring Boot, and Hibernate, ensuring data consistency, security, and optimal
performance. Experience in integrating applications with databases like MySQL
and Oracle, utilizing JPA for ORM.
Frontend Development: Built interactive and user-friendly interfaces using
Angular, React, JavaScript, HTML, and CSS. Skilled in component-based
architecture and responsive design principles to enhance user engagement.
API Development: Designed, developed, and maintained RESTful APIs for
seamless integration between different system components and third-party
services. Experience with API security, versioning, and documentation.
Microservices Architecture: Worked on developing and maintaining
microservices to support scalable application architectures using Spring Cloud.
Focused on modularity, maintainability, and high availability of services.
Cloud and DevOps: Practical experience with deploying applications on AWS
services like EC2, S3, Lambda, and RDS. Knowledge of using Jenkins and Docker
for setting up CI/CD pipelines to automate deployment and improve
development workflows.
Database Management: Strong skills in SQL and database design, including
writing complex queries, optimizing performance, and ensuring data integrity.
Hands-on experience with relational databases such as MySQL and Oracle.
Team Work: Collaborated with agile, scrum-based teams to analyze business domains and client requirements, driving the architecture, design, and
development of high-quality technical solutions across diverse technologies,
while ensuring alignment with business strategies, IT goals, and organizational
architectural and security standards.
Security Practices: Knowledgeable in implementing security measures such as
authentication, authorization, and encryption to protect sensitive data and
applications.
Refactoring: Designed and optimized a multi-channel client architecture to
deliver differentiated end-user experiences by leveraging containerization and
cloud technologies for seamless scalability, enhanced performance, and
improved cross-platform functionality.
Spring State Machine: Implemented a Spring State Machine to model complex
workflows, enabling efficient state transitions, event handling, and dynamic
actions across multiple system states, resulting in streamlined process
automation.
Established governance and guiding principles for microservices development,
ensuring best practices in API design, scalability, security, and CI/CD automation
across cross-functional teams.

PRIMARY SKILLS
 Java 21, Spring Boot, Linux.
 Spring State Machine.
 JPA, AOP, DI, IOC.
 RESTful APIs, Kafka.
 Cloud foundry, pcf.
 JavaScript, JQuery, Lit.
 React, Angular.
 Html, CSS, Ajax, Bootstrap.
 Tomcat, Weblogic, F5, Big-IP.
 Maven, Gradle.
 SQL-Oracle, PLSQL.
 REST, SOAP.
 CI/CD, Shell scripts.
 JMS, MQ, Kafka.
 Hibernate, JPA, IOC, AOP.
 Junit, Mockito.
 Unix, Windows, MacOS,
Android, iOS, Solaris.
 Bamboo, Jenkins, Agile.
 Bitbucket, Github, SVN.
 Postman, cURL, swagger.
 Eclipse, RAD, VScode, Intellij.
 Agile, Scrum, Kanban.
 SonarQube, Nexus, IQ.
 Microservices architecture.
 Docker, Kubernetes.
 AWS - EC2, S3, RDS, IAM.
 Drools BRMS, Groovy.
COR E STR ENGTHS
 Requirements Gathering &amp;
SDLC.
 Project &amp; Delivery
Management.
 Application Design &amp;
Development.
 System Integration &amp;
Deployment.
 Change &amp; Release
Management.
 Quality Assurance &amp;
Testing.
 Monitoring &amp; Optimization.
 Support &amp; Maintenance.
 Incident &amp; Service
Management.
 Incident Response &amp;
Escalation Management.
 Root Cause Analysis &amp;
Problem Resolution.
 Continuous Improvement &amp;
Automation.
 Disaster Recovery &amp;
Continuity Planning.
 Risk Assessment &amp;
Mitigation.
 Reporting &amp;
Documentation.
 Client Interaction.
 Team Collaboration.
 Cloud Computing.
 DevOps Practices.
 Security Best Practices.
 API Management.
 User Experience (UX)
Design.

NTT Data Singapore, as Full Stack Developer - Client - Great Eastern - Singapore and Malaysia Jan 2022 – till now
Project: EPAY – Multi-channel Integrated Payment Platform for Insurance and Financial Organizations.
Development and Maintenance of Payment Processing Applications:
 Designed and implemented core backend services using Java and Spring Boot, along with RESTful APIs for secure
transaction processing, user authentication, and account management. Developed dynamic and responsive front-
end interfaces using Angular, ensuring a seamless user experience across various devices.
Code Quality, Reviews, and Collaboration:
 Conducted code reviews to enforce best practices, including clean code principles, design patterns, and coding
standards. Collaborated with cross-functional teams, including designers, product managers, and other developers,
to ensure alignment with project requirements and successful delivery.
Testing and Quality Assurance:
 Implemented unit testing using JUnit and Mockito and facilitated integration and end-to-end testing with the QA
team. Automated testing and deployment processes using Jenkins-based CI/CD pipelines to improve efficiency and
reduce errors.
Server and Infrastructure Management:
 Configured and maintained WebLogic servers, focusing on load balancing, session management, and application
security. Monitored server health and performance using tools like Kibana and Dynatrace to detect anomalies and
optimize response times.
Network Security and Compliance:

 Implemented robust security measures, including encryption protocols, to protect sensitive payment data.
Collaborated with security teams to conduct regular security audits, vulnerability assessments, and compliance
checks.
Performance Monitoring and Optimization:
 Utilized monitoring tools to track application performance metrics, identify bottlenecks, and troubleshoot issues.
Optimized application performance to ensure high availability, scalability, and user satisfaction.
Full SDLC Management:
 Involved in the full Software Development Life Cycle (SDLC) process, including requirements gathering, solution
design, coding, testing, deployment, and ongoing support. Documented development processes and architectural
decisions to ensure maintainability and facilitate team collaboration.
Technologies Used:
 Backend: Java 21, Spring Boot, Hibernate, WebLogic, RESTful Services, Microservices, Linux, AWS.
 Frontend: JSP, JavaScript, Typescript, Bootstrap, jQuery, Angular, HTML, CSS.
 Database: SQL (RDBMS) Oracle.
 Testing: JUnit, Mockito.
 Monitoring and Performance: Kibana, Dynatrace.
 Version Control and CI/CD: Bitbucket, Bamboo.
 Collaboration and Documentation: Confluence, JIRA.
ClickShip Technologies, Chennai, India as Software Engineer (Back-end) Jan 2020 – Dec 2021
Project: DropCom – E-commerce Supply Chain Management Platform
Feature Design and Implementation:
 Spearheaded the design and development of new features for the DropCom platform, enhancing the efficiency and
functionality of the e-commerce supply chain management system. Utilized technologies like Java 8, Spring Boot,
and Angular 8 to create scalable, high-performance back-end solutions.
Web Application Development:
 Led the analysis, design, and development of web applications, ensuring they met business objectives and provided
a robust, secure, and scalable architecture. Applied expertise in Spring MVC, REST APIs, and MySQL to deliver
reliable and high-performing applications.
Cross-functional Team Collaboration:
 Collaborated with cross-functional teams, including developers, DevOps engineers, UI designers, and product
managers, to align technical development with business needs. Facilitated clear communication and teamwork,
translating complex requirements into effective technical solutions.
Quality Assurance and Testing:
 Developed and maintained unit tests using JUnit, ensuring code quality and robustness. Monitored continuous
integration (CI) runs, identified gaps in test coverage, and implemented improvements to enhance software
reliability and reduce production issues.
Deployment and Cloud Management:
 Utilized Docker and Kubernetes for containerization and deployment, optimizing application scalability and
consistency across environments. Managed AWS cloud infrastructure to support application deployment, ensuring
high availability and efficient resource utilization.

Technologies Used:
 Backend: Java 8, Spring Boot, Spring MVC.
 Frontend: Angular 8.
 Database: MySQL, Cassandra.
 Testing: JUnit.
 Deployment and Containerization: Docker, Kubernetes.
 Cloud Services: AWS.

SysArc Infomatix Pvt. Ltd, Chennai, India, as Associate Software Developer Apr 2017 – Dec 2019
Project: Loan Automation Systems for Banking
Coding and Implementation:
 Developed and implemented software components based on business requirements, focusing on automating loan
processing workflows to improve efficiency and accuracy. Utilized technologies such as Java, J2EE, and Spring MVC.
Writing Clean and Maintainable Code:
 Wrote clean, efficient, and maintainable code that adhered to industry standards and best practices, ensuring long-
term code quality and readability. Leveraged frameworks like Hibernate, EJB, and Spring to structure code
effectively.
Testing and Debugging:
 Conducted rigorous testing and debugging to verify that the software met both functional and non-functional
requirements. Troubleshot and resolved issues that arose during testing phases to ensure smooth deployment.
Support for Environment Setup and Issue Resolution:
 Provided support for setting up environments and troubleshooting issues found in SIT (System Integration Testing),
UAT (User Acceptance Testing), and PROD (Production) environments. Ensured seamless integration and
deployment across different stages.
Technologies Used:
 Languages and Frameworks: Java, J2EE, Spring MVC, Hibernate, EJB Framework.
 Web Technologies: JSP, Servlets, REST Services.
 Decision Automation: Drools, Groovy.
 Application Servers: JBoss.
Projects
EPAY – Integrated Payment Platform for Insurance and Banking
Developed and enhanced the EPAY platform, an integrated solution for payment processing in the insurance and banking
sectors. Focused on designing scalable features, improving system performance, and ensuring high-quality software
through rigorous testing and deployment practices. Managed containerization and cloud infrastructure to support efficient
and reliable application deployment.
DropCom – E-commerce Supply Chain Management Platform
Led the development of DropCom, an e-commerce supply chain management system. Oversaw the creation and
implementation of new features, ensuring robust application performance and security. Collaborated with cross-functional
teams to deliver solutions aligned with business needs and maintained high software quality through comprehensive
testing and continuous integration practices.
LAPS – Loan Automation Processing System
Implemented and maintained the Loan Automation Processing System, aimed at streamlining loan processing workflows.

Developed clean and efficient code, conducted thorough testing and debugging, and supported multiple environments to
ensure seamless deployment. Focused on maintaining high code quality and providing support for environment setup and
issue resolution.
Additional Projects with the above-mentioned technical standards I have been working with currently
Science Research Project Registration System
Peer Review System
Occupational Health Registry
Visiting committee system
TR AIN IN GS &amp; CE R T I F I C A T I O N S
 Advanced Java with Spring and hibernate with Naresh I technologies, Hyderabad, India.
 Core Java with Naresh I technologies, Hyderabad, India.
 AWS certified cloud practitioner essentials from AWS skill builder platform.
https://explore.skillbuilder.aws/learn/course/134/play/136404/aws-cloud-practitioner-essentials
 AWS Educate Machine Learning Foundations Issued by Amazon web services Training and Certification.
 https://www.credly.com/badges/63355199-a1c6-4426-a6d4-cc363a26cb3d/public_url
AC A D E M I C DE T A I L S
Bachelor’s Degree in electrical and Electronics Engineering from, Anna University, Chennai, India.
PE R S ONAL DE T AI L S
 Date of Birth: 04 December 1993.
 Languages: English.
 +65 8398 5072
 +91 9500499143
 davinanup@gmail.com

(Anup Davin Mathivanan) 