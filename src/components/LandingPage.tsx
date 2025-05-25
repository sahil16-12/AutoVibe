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
import Notification from './Notification';
const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollY, setScrollY] = useState(0);
const [notification, setNotification] = useState({
  message: '',
  type: 'success' as 'success' | 'error',
  isVisible: false
});
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
      image: "/Sports.jpg",
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
      image: "/Suv.jpg",
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
const [selectedMake, setSelectedMake] = useState('');
const [carModels, setCarModels] = useState<string[]>([]);

const carData = {
  Maruti: ['Brezza', 'Swift'],
  Hyundai: ['i20'],
  Tata: ['Punch'],
  Kia: ['Seltos'],
  Mahindra: ['XUV300'],
  Toyota: ['Urban Cruiser'],
  Ford: ['EcoSport'],
  Honda: ['Jazz'],
  Volkswagen: ['Taigun', 'Polo'],
  Skoda: ['Slavia'],
  Renault: ['Kiger'],
  MG: ['Hector'],
  Nissan: ['Magnite']
};
const [formData, setFormData] = useState({
  name: '',
  phone: '',
  selectedMake: '',
  selectedModel: '',
  date: '',
  time: ''
});
  useEffect(() => {
      setFormData({
    name: '',
    phone: '',
    selectedMake: '',
    selectedModel: '',
    date: '',
    time: ''
  });
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

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!formData.name || !formData.phone || !formData.selectedMake || 
      !formData.selectedModel || !formData.date || !formData.time) {
    setNotification({
      message: 'Please fill in all required fields',
      type: 'error',
      isVisible: true
    });
    return;
  }

  try {
    const resp = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.name,
        phone: formData.phone,
        carMake: formData.selectedMake,
        carModel: formData.selectedModel,
        date: formData.date,
        time: formData.time
      })
    });
    
    const result = await resp.json();
    
    if (result.success) {
      setNotification({
        message: 'Test drive booked successfully! We will contact you shortly.',
        type: 'success',
        isVisible: true
      });
      setFormData({
        name: '',
        phone: '',
        selectedMake: '',
        selectedModel: '',
        date: '',
        time: ''
      });
      setSelectedMake('');
      setCarModels([]);
    } else {
      setNotification({
        message: result.message || 'Failed to book test drive',
        type: 'error',
        isVisible: true
      });
    }
  } catch (error) {
    console.error('Error booking test drive:', error);
    setNotification({
      message: 'Failed to book test drive. Please try again.',
      type: 'error',
      isVisible: true
    });
  }
};
const NavLink = ({ href, children }: { href: string, children: React.ReactNode }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
   <motion.a 
      href={href}
      onClick={handleClick}
      className={`
        relative group px-4 py-2 transition-all duration-300 cursor-pointer
        ${activeSection === href.slice(1) ? 'text-[#F79B72]' : 'text-gray-300'}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#F79B72] scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
    </motion.a>
  );
};

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
        onClick={(e) => {
          e.preventDefault();
          const element = document.getElementById(item.toLowerCase());
          if (element) {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
            setIsMenuOpen(false);
          }
        }}
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
              <button 
  onClick={() => {
    const element = document.getElementById('vehicles');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }}
  className="flex items-center justify-center space-x-2 bg-[#F79B72] text-white px-8 py-4 rounded-lg hover:bg-[#F79B72]/90 transition-all cursor-pointer"
>
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
      <section id="vehicles" className="py-20 bg-[#121212]">
        
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                   <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#F79B72] mb-4">
              Explore Our Collection
            </h2>
            <p className="text-xl text-gray-300">
              Find the perfect vehicle that matches your lifestyle
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {vehicleCategories.map((category, index) => (
 <motion.div
    key={index}
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ 
      delay: index * 0.1,
      duration: 0.2,
      stiffness: 100
    }}
    whileHover={{ 
      scale: 1.05,
      transition: { duration: 0.2 }
    }}
    className="group relative overflow-hidden rounded-xl cursor-pointer"
  >
    <motion.div 
      className="aspect-w-16 aspect-h-9 relative h-[250px]"
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.4 }}
    >
      <Image
        src={category.image}
        alt={category.name}
        fill
        quality={100}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        priority={index === 0}
        className="object-cover transform transition-transform duration-300"
        style={{ 
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden'
        }}
      />
    </motion.div>
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 flex flex-col justify-end"
    >
      <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
      <p className="text-gray-200 text-sm mb-2 transform translate-y-0 group-hover:translate-y-0 transition-transform duration-300">
        {category.description}
      </p>
      <span className="text-[#F79B72] font-semibold">{category.count} vehicles</span>
    </motion.div>
  </motion.div>
))}
          </div>
        </div>
      </section>
      {/* Test Drive Section */}
<section className="py-20 bg-[#121212] overflow-hidden">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="lg:flex items-start gap-12">
      {/* Left Content */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="lg:w-1/3 mb-12 lg:mb-0"
      >
        <h2 className="text-4xl font-bold text-[#F79B72] mb-4">
          Book Your Test Drive
        </h2>
        <p className="text-xl text-gray-300 mb-6">
          Experience your dream car firsthand. Schedule a test drive today and feel the thrill of your future ride.
        </p>
        <div className="hidden lg:block">
          <motion.img
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            src="/Sports.jpg" // Add your image
            alt="Test Drive"
            className="rounded-xl"
          />
        </div>
      </motion.div>

      {/* Right Form */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="lg:w-2/3"
      >
       <form onSubmit={handleSubmit} className="space-y-6 bg-black/20 p-8 rounded-2xl border border-white/10"  suppressHydrationWarning>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <label className="block text-[#F79B72] mb-2 text-sm">Your Name</label>
              <input
  type="text"
  value={formData.name}
  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
  placeholder="John Doe"
  className="w-full p-4 rounded-xl bg-black/40 border border-white/20 text-gray-300 placeholder-gray-500
    focus:outline-none focus:border-[#F79B72] focus:ring-1 focus:ring-[#F79B72] transition-all duration-200"
  required
/>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-[#F79B72] mb-2 text-sm">Contact Number</label>
              <input
  type="tel"
  value={formData.phone}
  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
  placeholder="Your phone number"
  className="w-full p-4 rounded-xl bg-black/40 border border-white/20 text-gray-300 placeholder-gray-500
    focus:outline-none focus:border-[#F79B72] focus:ring-1 focus:ring-[#F79B72] transition-all duration-200"
  required
/>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.3 }}
  >
    <label className="block text-[#F79B72] mb-2 text-sm">Car Make</label>
<select
  value={formData.selectedMake}
  onChange={(e) => {
    const make = e.target.value;
    setFormData(prev => ({ 
      ...prev, 
      selectedMake: make,
      selectedModel: '' 
    }));
    setSelectedMake(make);
    setCarModels(make ? carData[make as keyof typeof carData] : []);
  }}
  className="w-full p-4 rounded-xl bg-black/40 border border-white/20 text-gray-300
    focus:outline-none focus:border-[#F79B72] focus:ring-1 focus:ring-[#F79B72] transition-all duration-200
    [&>option]:bg-[#121212]"
  required
  suppressHydrationWarning
>
  <option value="">Select Make</option>
  {Object.keys(carData).map((make) => (
    <option key={make} value={make}>{make}</option>
  ))}

</select>
  </motion.div>

  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.4 }}
  >
    <label className="block text-[#F79B72] mb-2 text-sm">Car Model</label>
 <select
  value={formData.selectedModel}
  onChange={(e) => {
    const model = e.target.value;
    setFormData(prev => ({
      ...prev,
      selectedModel: model
    }));
  }}
  className="w-full p-4 rounded-xl bg-black/40 border border-white/20 text-gray-300
    focus:outline-none focus:border-[#F79B72] focus:ring-1 focus:ring-[#F79B72] transition-all duration-200
    [&>option]:bg-[#121212]"
  required
  disabled={!formData.selectedMake}
  suppressHydrationWarning
>
  <option value="">
    {formData.selectedMake ? 'Select Model' : 'Please select a make first'}
  </option>
  {carModels.map((model) => (
    <option key={model} value={model}>{model}</option>
  ))}
</select>
  </motion.div>
</div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-[#F79B72] mb-2 text-sm">Preferred Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                className="w-full p-4 rounded-xl bg-black/40 border border-white/20 text-gray-300
                  focus:outline-none focus:border-[#F79B72] focus:ring-1 focus:ring-[#F79B72] transition-all duration-200
                  [color-scheme:dark]"
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <label className="block text-[#F79B72] mb-2 text-sm">Preferred Time</label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                className="w-full p-4 rounded-xl bg-black/40 border border-white/20 text-gray-300
                  focus:outline-none focus:border-[#F79B72] focus:ring-1 focus:ring-[#F79B72] transition-all duration-200
                  [color-scheme:dark]"
                required
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="flex justify-end"
          >
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#F79B72] text-white px-8 py-4 rounded-xl hover:bg-[#F79B72]/90 
                transition-all duration-200 inline-flex items-center space-x-2"
            >
              <span>Schedule Test Drive</span>
              <Clock className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  </div>
</section>
      {/* Process Section */}
      <section className="py-20 bg-[#121212]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#F79B72] mb-4">
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
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ 
      delay: index * 0.1,
      duration: 0.1,
    
      stiffness: 100 
    }}
    whileHover={{ 
      scale: 1.05,
      y: -10,
      transition: {
        duration: 0.1,
        ease: [0.23, 1, 0.32, 1]
      },
      boxShadow: "0 20px 25px -5px rgba(247, 155, 114, 0.1), 0 10px 10px -5px rgba(247, 155, 114, 0.04)"
    }}
    className="text-center bg-black/40 p-8 rounded-xl transition-all duration-300 border border-[#F79B72]/20 hover:border-[#F79B72]/50"
  >
    <motion.div
      initial={{ scale: 0.5 }}
      whileInView={{ scale: 1 }}
      transition={{ delay: index * 0.2 + 0.3 }}
      className="text-4xl font-bold text-[#F79B72] mb-4"
    >
      {process.step}
    </motion.div>
    <h3 className="text-xl font-bold text-[#F79B72] mb-2">
      {process.title}
    </h3>
    <p className="text-gray-300">
      {process.description}
    </p>
  </motion.div>
))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
<section className="py-20 bg-[#121212]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#F79B72] mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-300">
              Read about experiences from our satisfied customers
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
           {testimonials.map((testimonial, index) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ 
      delay: index * 0.1,
      duration: 0.1,
      stiffness: 100
    }}
    whileHover={{ 
      scale: 1.03,
      y: -5,
      transition: {
        duration: 0.1,
        ease: [0.23, 1, 0.32, 1]
      },
      boxShadow: "0 25px 30px -12px rgba(247, 155, 114, 0.15)"
    }}
    className="bg-black/40 p-8 rounded-xl shadow-lg transition-all duration-500 border border-[#F79B72]/20 hover:border-[#F79B72]/50 hover:bg-black/70"
  >
    <motion.div 
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ delay: index * 0.3 + 0.2 }}
      className="flex items-center mb-6"
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
                    <h3 className="text-lg font-bold text-[#F79B72]">{testimonial.name}</h3>
                    <p className="text-gray-300">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 italic">{testimonial.comment}</p>
    </motion.div>
  </motion.div>
))}
          </div>
        </div>
      </section>

<Notification
  message={notification.message}
  type={notification.type}
  isVisible={notification.isVisible}
  onClose={() => setNotification(prev => ({ ...prev, isVisible: false }))}
/>
      {/* ChatBot Component */}
      <ChatBot />
    </div>
  );
};

export default LandingPage;
