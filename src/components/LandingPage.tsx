'use client';

import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ArrowRight, Zap, Shield, Users, Star, 
  Car, Award, PhoneCall, Clock, PlusCircle,
  CheckCircle, Settings, DollarSign, MapPin 
} from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ChatBot from './ChatBot';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollY, setScrollY] = useState(0);

  const features = [
    {
      icon: <Car className="w-8 h-8" />,
      title: "Premium Selection",
      description: "Curated collection of luxury and performance vehicles."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Ultimate Safety",
      description: "Advanced AI-powered safety systems for your protection."
    },
    {
      icon: <Car className="w-8 h-8" />,
      title: "Expert Service",
      description: "Professional maintenance by certified technicians."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Quality Assured",
      description: "Rigorous inspection and certification process."
    },
    {
      icon: <PhoneCall className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Round-the-clock assistance for all your needs."
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Quick Process",
      description: "Streamlined buying process with instant approvals."
    }
  ];

  const stats = [
    { number: "500+", label: "Premium Vehicles" },
    { number: "50k+", label: "Happy Customers" },
    { number: "100%", label: "Satisfaction Rate" },
    { number: "24/7", label: "Support Available" }
  ];

  const vehicleCategories = [
    {
      name: "Luxury Sedans",
      count: 45,
      image: "/luxury-sedan.jpg",
      description: "Experience ultimate comfort with our premium sedan collection"
    },
    {
      name: "Sports Cars",
      count: 32,
      image: "/sports-car.jpg",
      description: "Feel the adrenaline with high-performance sports vehicles"
    },
    {
      name: "Electric Vehicles",
      count: 28,
      image: "/electric-car.jpg",
      description: "Embrace the future with our eco-friendly electric lineup"
    },
    {
      name: "SUVs",
      count: 50,
      image: "/SUVs.jpg",
      description: "Discover versatility and comfort in our SUV range"
    }
  ];

  const testimonials = [
    {
      name: "John Anderson",
      role: "Business Executive",
      comment: "The best car buying experience I've ever had. Professional service and amazing selection.",
      image: "/testimonials.png"
    },
    {
      name: "Sarah Williams",
      role: "Tech Entrepreneur",
      comment: "AutoVibe made finding my dream car effortless. Their AI recommendations were spot-on!",
      image: "/testimonials.png"
    }
  ];

  const processes = [
    {
      step: "01",
      title: "Browse Selection",
      description: "Explore our extensive collection of premium vehicles"
    },
    {
      step: "02",
      title: "Book Test Drive",
      description: "Schedule a test drive at your convenience"
    },
    {
      step: "03",
      title: "Choose Financing",
      description: "Select from flexible financing options"
    },
    {
      step: "04",
      title: "Drive Home",
      description: "Complete the paperwork and drive away happy"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Update active section based on scroll position
      const sections = ['home', 'features', 'vehicles', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const bounds = element.getBoundingClientRect();
          return bounds.top <= 100 && bounds.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
    <a 
      href={href}
      className={`
        relative group px-4 py-2 transition-all duration-300
        ${activeSection === href.slice(1) ? 'text-[#F79B72]' : 'text-gray-300'}
      `}
    >
      {children}
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#F79B72] scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
    </a>
  );

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Enhanced Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`
          z-50 transition-all duration-300
          ${scrollY > 50 ? 'bg-black/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-[#F79B72] rounded-xl flex items-center justify-center">
                <Car className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">
                Auto<span className="text-[#F79B72]">Vibe</span>
              </span>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <NavLink href="#home">Home</NavLink>
              <NavLink href="#features">Features</NavLink>
              <NavLink href="#vehicles">Vehicles</NavLink>
              <NavLink href="#contact">Contact</NavLink>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#F79B72] text-white px-6 py-2 rounded-lg hover:bg-[#F79B72]/90 transition-colors"
              >
                Get Started
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: isMenuOpen ? 1 : 0,
              height: isMenuOpen ? 'auto' : 0
            }}
            className="md:hidden overflow-hidden"
          >
            <div className="py-4 space-y-2">
              {['Home', 'Features', 'Vehicles', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block px-4 py-2 text-gray-300 hover:text-[#F79B72] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <div className="pt-2 px-4">
                <button className="w-full bg-[#F79B72] text-white py-2 rounded-lg hover:bg-[#F79B72]/90 transition-colors">
                  Get Started
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/land.png')] opacity-5" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto pt-20"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-7xl font-bold text-white mb-6"
            >
              Experience the Future of
              <span className="text-[#F79B72]"> Driving</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-300 mb-12 leading-relaxed"
            >
              Discover our premium selection of vehicles with cutting-edge technology
              and unmatched performance. Experience luxury redefined.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button className="flex items-center justify-center space-x-2 bg-[#F79B72] text-white px-8 py-4 rounded-lg hover:bg-[#F79B72]/90 transition-all">
                <span>Browse Vehicles</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="flex items-center justify-center space-x-2 border border-[#F79B72] text-[#F79B72] px-8 py-4 rounded-lg hover:bg-[#F79B72]/10 transition-all">
                <span>Learn More</span>
                <PlusCircle className="w-5 h-5" />
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-[#F79B72] mb-2">{stat.number}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Vehicle Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#2A4759] mb-4">
              Explore Our Collection
            </h2>
            <p className="text-xl text-gray-600">
              Find the perfect vehicle that matches your lifestyle
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {vehicleCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-xl"
              >
                <div className="aspect-w-16 aspect-h-9 relative h-[250px]">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    priority={index === 0}
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end">
                  <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
                  <p className="text-gray-200 text-sm mb-2">{category.description}</p>
                  <span className="text-[#F79B72]">{category.count} vehicles</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-[#2A4759]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-300">
              Your journey to the perfect car in four simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {processes.map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-[#F79B72] mb-4">{process.step}</div>
                <h3 className="text-xl font-bold text-white mb-2">{process.title}</h3>
                <p className="text-gray-300">{process.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#2A4759] mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600">
              Read about experiences from our satisfied customers
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4 relative">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#2A4759]">{testimonial.name}</h3>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">{testimonial.comment}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* ChatBot Component */}
      <ChatBot />
    </div>
  );
};

export default LandingPage;