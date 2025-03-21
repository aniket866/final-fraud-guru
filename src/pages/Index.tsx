import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  AlertCircle, 
  ArrowRight, 
  BarChart3, 
  FileText, 
  Shield, 
  Sparkles, 
  Zap, 
  Users, 
  CreditCard, 
  Brain, 
  Lock,
  CheckCircle,
  Ban,
  Fingerprint
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/lib/theme";

const AnimatedLogo = () => {
  return (
    <div className="relative w-16 h-16 rounded-lg bg-white/10 flex items-center justify-center group overflow-hidden">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: [0.8, 1.2, 1],
          opacity: [0, 1, 1],
        }}
        transition={{ 
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 2
        }}
        className="absolute inset-0 bg-gradient-to-r from-teal-400 via-teal-300 to-teal-500 opacity-50 rounded-lg"
      />
      
      <motion.div
        initial={{ rotateY: 0 }}
        animate={{ rotateY: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="relative z-10"
      >
        <Shield className="w-8 h-8 text-white" />
      </motion.div>
      
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ 
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 2.5
        }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Fingerprint className="w-8 h-8 text-white/30" />
      </motion.div>
    </div>
  );
};

export default function Index() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / scrollHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  const features = [
    {
      icon: Shield,
      title: "Advanced Fraud Detection",
      description:
        "Analyze transactions in real-time with advanced AI models to identify and prevent fraud before it happens.",
      color: "from-teal-500 to-teal-600",
    },
    {
      icon: BarChart3,
      title: "Comprehensive Analytics",
      description:
        "Gain insights with detailed analytics and visualizations to understand fraud patterns and trends.",
      color: "from-cyan-500 to-cyan-600",
    },
    {
      icon: FileText,
      title: "Fraud Reporting",
      description:
        "Streamlined process for reporting and tracking suspected fraudulent activities across your system.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Sparkles,
      title: "AI-powered Insights",
      description:
        "Machine learning algorithms continuously adapt to evolving fraud patterns for superior protection.",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Users,
      title: "User Risk Analysis",
      description:
        "Identify high-risk users and detect anomalies in account behavior to prevent identity theft.",
      color: "from-amber-500 to-amber-600",
    },
    {
      icon: Ban,
      title: "Instant Transaction Blocking",
      description:
        "Immediately halt suspicious transactions with our real-time block control system.",
      color: "from-rose-500 to-rose-600",
    },
    {
      icon: CreditCard,
      title: "Payment Method Security",
      description:
        "Ensure the security of different payment methods with specialized protection rules.",
      color: "from-emerald-500 to-emerald-600",
    },
    {
      icon: Lock,
      title: "Compliance Management",
      description:
        "Stay compliant with regulatory standards and prevent sanctions with our automated compliance tools.",
      color: "from-indigo-500 to-indigo-600",
    },
  ];

  return (
    <ThemeProvider defaultTheme="dark" defaultAccent="teal">
      <div className="min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative" ref={containerRef}>
        <div className="absolute inset-0 bg-grid opacity-5" 
          style={{ 
            transform: `translateX(${mousePosition.x * -0.01}px) translateY(${mousePosition.y * -0.01}px)` 
          }}
        />
        
        <div 
          className="absolute -top-[40%] -left-[20%] w-[70%] h-[70%] rounded-full bg-gradient-to-r from-teal-500/20 to-cyan-500/20 blur-3xl opacity-30"
          style={{ 
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)` 
          }}
        />
        
        <div 
          className="absolute -bottom-[30%] -right-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-3xl opacity-30"
          style={{ 
            transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)` 
          }}
        />
        
        <div className="fixed top-0 left-0 w-full h-1 z-50">
          <div 
            className="h-full bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500"
            style={{ width: `${scrollProgress * 100}%`, transition: "width 0.1s ease-out" }}
          />
        </div>
        
        <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300" 
          style={{ 
            backgroundColor: scrollProgress > 0.05 ? "rgba(17, 24, 39, 0.8)" : "transparent",
            backdropFilter: scrollProgress > 0.05 ? "blur(12px)" : "none",
            borderBottom: scrollProgress > 0.05 ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
          }}
        >
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AnimatedLogo />
                <span className="font-semibold text-xl tracking-tight">GuardianEdge</span>
              </div>
              
              <nav className="hidden md:flex items-center space-x-6">
                <a href="#features" className="text-white/80 hover:text-white transition-colors duration-200 text-sm font-medium animated-border">
                  Features
                </a>
                <a href="#ai" className="text-white/80 hover:text-white transition-colors duration-200 text-sm font-medium animated-border">
                  AI Technology
                </a>
                <a href="#solutions" className="text-white/80 hover:text-white transition-colors duration-200 text-sm font-medium animated-border">
                  Solutions
                </a>
                <a href="#pricing" className="text-white/80 hover:text-white transition-colors duration-200 text-sm font-medium animated-border">
                  Pricing
                </a>
              </nav>
              
              <div className="flex items-center space-x-3">
                <Link to="/dashboard">
                  <Button variant="outline" size="sm" className="hidden sm:flex items-center">
                    Sign In
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button size="sm">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>
        
        <section className="min-h-screen flex items-center relative pt-16">
          <div className="container mx-auto px-6 py-24">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-4xl mx-auto text-center"
            >
              <motion.div variants={itemVariants} className="inline-block mb-4">
                <span className="bg-teal-500/20 backdrop-blur-md text-teal-300 px-3 py-1 rounded-full text-sm font-medium">
                  Introducing GuardianEdge AI
                </span>
              </motion.div>
              
              <motion.h1 
                variants={itemVariants} 
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-300 via-cyan-300 to-white"
              >
                Next-Gen Fraud Detection & Prevention
              </motion.h1>
              
              <motion.p variants={itemVariants} className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Protect your business with AI-powered fraud detection that adapts to evolving threats in real-time, stopping fraud before it happens.
              </motion.p>
              
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/dashboard">
                  <Button size="lg" className="w-full sm:w-auto bg-teal-500 hover:bg-teal-600 text-white">
                    <span className="relative z-10">Start Your Free Trial</span>
                  </Button>
                </Link>
                
                <Link to="/detection">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-teal-500/30 text-teal-300 hover:bg-teal-500/10">
                    Watch Demo
                  </Button>
                </Link>
              </motion.div>
              
              <motion.div
                variants={itemVariants}
                className="mt-12 relative"
              >
                <div className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-xl shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10 pointer-events-none" />
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                    alt="Fraud Detection Dashboard"
                    className="w-full rounded-xl shadow-lg transform transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-gray-900 to-transparent p-6 z-20">
                    <p className="text-sm font-medium text-white/80">Advanced fraud detection and monitoring dashboard</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="mt-16 flex flex-wrap justify-center items-center gap-8 text-white/50"
              >
                <span className="text-sm font-medium">TRUSTED BY LEADING COMPANIES</span>
                <div className="flex flex-wrap justify-center gap-8">
                  <div className="h-8 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                    <span className="text-xl font-bold">FinTech+</span>
                  </div>
                  <div className="h-8 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                    <span className="text-xl font-bold">SECURE pay</span>
                  </div>
                  <div className="h-8 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                    <span className="text-xl font-bold">DataShield</span>
                  </div>
                  <div className="h-8 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                    <span className="text-xl font-bold">BANK systems</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
        
        <section id="features" className="py-24 relative">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-teal-400 font-medium">POWERFUL FEATURES</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 mt-2">Comprehensive Fraud Protection</h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Our platform offers end-to-end protection with powerful features designed to detect, 
                prevent, and report fraudulent activities across all channels.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card rounded-xl p-6 hover:shadow-xl hover:bg-white/10 transition-all duration-300 border border-white/10"
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-white/70">{feature.description}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-20 text-center">
              <Link to="/dashboard">
                <Button variant="outline" size="lg" className="border-teal-500/30 text-teal-300 hover:bg-teal-500/10">
                  Explore All Features
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        <section id="solutions" className="py-24 relative bg-gradient-to-b from-transparent to-gray-900/50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-teal-400 font-medium">TAILORED SOLUTIONS</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 mt-2">Fraud Protection for Every Industry</h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Customized fraud prevention strategies designed for the unique challenges of different industries.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="glass-card rounded-xl overflow-hidden"
              >
                <div className="h-48 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 relative flex items-center justify-center">
                  <CreditCard className="w-16 h-16 text-white/80" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Financial Services</h3>
                  <p className="text-white/70 mb-4">
                    Protect banking transactions, credit card processing, and financial operations from sophisticated fraud attempts.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-teal-400" />
                      <span className="text-sm">Transaction monitoring</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-teal-400" />
                      <span>Account takeover prevention</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-teal-400" />
                      <span>Regulatory compliance</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="glass-card rounded-xl overflow-hidden"
              >
                <div className="h-48 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 relative flex items-center justify-center">
                  <Sparkles className="w-16 h-16 text-white/80" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">E-commerce</h3>
                  <p className="text-white/70 mb-4">
                    Shield your online store from payment fraud, fake accounts, and promotion abuse.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-teal-400" />
                      <span>Chargeback prevention</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-teal-400" />
                      <span>Account fraud detection</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-teal-400" />
                      <span>Loyalty program protection</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="glass-card rounded-xl overflow-hidden"
              >
                <div className="h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 relative flex items-center justify-center">
                  <Shield className="w-16 h-16 text-white/80" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Digital Services</h3>
                  <p className="text-white/70 mb-4">
                    Secure subscription services, digital goods, and user accounts from fraudulent activities.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-teal-400" />
                      <span>Identity verification</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-teal-400" />
                      <span>Bot attack prevention</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-teal-400" />
                      <span>Digital goods protection</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        <section id="ai" className="py-24 relative">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="lg:w-1/2"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Advanced AI Technology</h2>
                <p className="text-white/70 mb-6">
                  Our system combines state-of-the-art machine learning algorithms with expert rules to 
                  provide unparalleled fraud detection capabilities that continuously evolve and adapt.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center mt-1">
                      <Zap className="w-3 h-3 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">Real-time Processing</h4>
                      <p className="text-sm text-white/70">
                        Process and analyze transactions in milliseconds with our high-performance engine
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center mt-1">
                      <Zap className="w-3 h-3 text-purple-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">Adaptive Learning</h4>
                      <p className="text-sm text-white/70">
                        Models continuously improve based on new data and fraud patterns
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center mt-1">
                      <Zap className="w-3 h-3 text-teal-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">Pattern Recognition</h4>
                      <p className="text-sm text-white/70">
                        Identify complex fraud patterns that would be impossible to detect manually
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center mt-1">
                      <Zap className="w-3 h-3 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">Decision Explainability</h4>
                      <p className="text-sm text-white/70">
                        Understand why a transaction was flagged with detailed reasoning
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Link to="/detection">
                    <Button className="gradient-btn overflow-hidden relative">
                      <span className="relative z-10">Try AI Detection</span>
                    </Button>
                  </Link>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="lg:w-1/2"
              >
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-30 animate-pulse-subtle" />
                  <div className="relative bg-gray-900 border border-white/10 rounded-lg p-6 overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-2xl" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-teal-500/20 to-amber-500/20 blur-2xl" />
                    
                    <h3 className="text-lg font-semibold mb-4">Fraud Detection Model</h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-white/70">Transaction Analysis</span>
                        <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full w-[85%] animate-pulse-subtle" />
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-white/70">Pattern Matching</span>
                        <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-purple-500 rounded-full w-[72%] animate-pulse-subtle" />
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-white/70">Anomaly Detection</span>
                        <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-teal-500 rounded-full w-[94%] animate-pulse-subtle" />
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-white/70">Behavioral Analysis</span>
                        <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full w-[81%] animate-pulse-subtle" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                          <AlertCircle className="w-5 h-5 text-blue-500" />
                        </div>
                        <div>
                          <h4 className="font-medium">AI Prediction</h4>
                          <p className="text-sm text-white/70 mb-2">
                            Transaction #TRX-8294 has been flagged as potentially fraudulent with 92.4% confidence
                          </p>
                          <div className="text-xs bg-white/10 border border-white/10 rounded p-2 font-mono">
                            reason: "unusual location + spending pattern deviation"
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        <section id="pricing" className="py-24 relative">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-teal-400 font-medium">PRICING</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 mt-2">Choose the Perfect Plan</h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Flexible pricing options designed to scale with your business needs
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="glass-card rounded-xl p-6 border border-white/10"
              >
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">Starter</h3>
                  <p className="text-white/70 text-sm">For small businesses getting started</p>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">$99</span>
                    <span className="text-white/70">/month</span>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-teal-400 mt-0.5" />
                    <span>Up to 10,000 transactions/month</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-teal-400 mt-0.5" />
                    <span>Basic fraud detection rules</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-teal-400 mt-0.5" />
                    <span>Standard reporting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-teal-400 mt-0.5" />
                    <span>Email support</span>
                  </li>
                </ul>
                
                <Button className="w-full bg-white/10 hover:bg-white/20 text-white">
                  Get Started
                </Button>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="glass-card rounded-xl p-6 border-2 border-teal-500/40 bg-gradient-to-b from-teal-500/10 to-transparent relative -mt-4 shadow-lg"
              >
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-teal-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
                
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">Professional</h3>
                  <p className="text-white/70 text-sm">For growing businesses with advanced needs</p>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">$299</span>
                    <span className="text-white/70">/month</span>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-teal-400 mt-0.5" />
                    <span>Up to 50,000 transactions/month</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-teal-400 mt-0.5" />
                    <span>Advanced AI detection models</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-teal-400 mt-0.5" />
                    <span>Custom rules and workflows</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-teal-400 mt-0.5" />
                    <span>Real-time transaction blocking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-teal-400 mt-0.5" />
                    <span>Priority support</span>
                  </li>
                </ul>
                
                <Button className="w-full bg-teal-500 hover:bg-teal-600 text-white">
                  Get Started
                </Button>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="glass-card rounded-xl p-6 border border-white/10"
              >
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
                  <p className="text-white/70 text-sm">For large organizations with complex requirements</p>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">Custom</span>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-teal-400 mt-0.5" />
                    <span>Unlimited transactions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-teal-400 mt-0.5" />
                    <span>Custom AI model training</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-teal-400 mt-0.5" />
                    <span>Advanced API integrations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-teal-400 mt-0.5" />
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-teal-400 mt-0.5" />
                    <span>24/7 premium support</span>
                  </li>
                </ul>
                
                <Button variant="outline" className="w-full border-white/20 hover:bg-white/10">
                  Contact Sales
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
        
        <section className="py-24 relative">
          <div className="container mx-auto px-6">
            <div className="relative overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-cyan-600 opacity-90" />
              <div 
                className="absolute inset-0 bg-grid opacity-10"
                style={{ 
                  backgroundSize: "30px 30px",
                  transform: `translateX(${mousePosition.x * -0.02}px) translateY(${mousePosition.y * -0.02}px)` 
                }}
              />
              
              <div className="relative px-6 py-16 md:py-24 text-center z-10">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="text-3xl md:text-4xl font-bold mb-4 text-white"
                >
                  Ready to strengthen your fraud protection?
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: 0.1 }}
                  className="text-white/90 max-w-2xl mx-auto mb-8"
                >
                  Experience the power of AI-driven fraud detection and start protecting 
                  your business and customers today.
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                  <Link to="/dashboard">
                    <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                      Start Free Trial
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  
                  <Link to="/detection">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto border-white bg-white/10 text-white hover:bg-white/20">
                      Schedule Demo
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        
        <footer className="py-12 bg-gray-900/50 border-t border-white/10">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
              <div className="col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <AnimatedLogo />
                  <span className="font-semibold text-lg">GuardianEdge</span>
                </div>
                <p className="text-white/70 mb-4 max-w-md">
                  Advanced fraud detection and prevention powered by artificial intelligence.
                  Protect your business from evolving threats.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-white/70 hover:text-teal-400 transition-colors duration-200">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-white/70 hover:text-teal-400 transition-colors duration-200">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="text-white/70 hover:text-teal-400 transition-colors duration-200">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.01-3.96-.058-.976-.045 1.505-.207 1.858-.344.466.182.8.398 1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-white/70 hover:text-teal-400 transition-colors duration-200">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Product</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-white/70 hover:text-white transition-colors duration-200">Features</a></li>
                  <li><a href="#" className="text-white/70 hover:text-white transition-colors duration-200">Pricing</a></li>
                  <li><a href="#" className="text-white/70 hover:text-white transition-colors duration-200">Case Studies</a></li>
                  <li><a href="#" className="text-white/70 hover:text-white transition-colors duration-200">Reviews</a></li>
                  <li><a href="#" className="text-white/70 hover:text-white transition-colors duration-200">Updates</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-white/70 hover:text-white transition-colors duration-200">About</a></li>
                  <li><a href="#" className="text-white/70 hover:text-white transition-colors duration-200">Careers</a></li>
                  <li><a href="#" className="text-white/70 hover:text-white transition-colors duration-200">Contact</a></li>
                  <li><a href="#" className="text-white/70 hover:text-white transition-colors duration-200">Partners</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-white/70 hover:text-white transition-colors duration-200">Blog</a></li>
                  <li><a href="#" className="text-white/70 hover:text-white transition-colors duration-200">Documentation</a></li>
                  <li><a href="#" className="text-white/70 hover:text-white transition-colors duration-200">Community</a></li>
                  <li><a href="#" className="text-white/70 hover:text-white transition-colors duration-200">Webinars</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
              <div className="text-white/50 text-sm">
                © 2023 GuardianEdge. All rights reserved.
              </div>
              
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-white/50 hover:text-white text-sm">Privacy Policy</a>
                <a href="#" className="text-white/50 hover:text-white text-sm">Terms of Service</a>
                <a href="#" className="text-white/50 hover:text-white text-sm">Cookie Policy</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}
