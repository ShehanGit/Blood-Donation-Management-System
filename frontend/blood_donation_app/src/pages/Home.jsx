import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { Flowbite, Carousel, Badge, Button, Card, Modal, Progress, Accordion, Spinner } from "flowbite-react";
import { 
  HiOutlineLocationMarker, 
  HiOutlineCalendar, 
  HiOutlineHeart, 
  HiOutlineInformationCircle, 
  HiChevronRight,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineBell
} from "react-icons/hi";
import { 
  FaHandHoldingMedical, 
  FaUsers, 
  FaTint, 
  FaAward, 
  FaSearch,
  FaMapMarkerAlt,
  FaCalendarCheck,
  FaUserCheck,
  FaHistory,
  FaRegNewspaper,
  FaQuestion
} from "react-icons/fa";
import NavBar from '../component/NavBar';
import Footer1 from "../component/Footer";
import heroImage from '../Images/heroImage2.jpg';
import '../css/Home.css';

// Mock data for upcoming campaigns - will be replaced with API calls later
const upcomingCampaigns = [
  {
    id: 1,
    title: "Community Blood Drive",
    location: "Central Hospital",
    date: "April 25, 2025",
    image: "https://via.placeholder.com/300x200",
    spotsLeft: 12,
    urgency: "high"
  },
  {
    id: 2,
    title: "University Donation Event",
    location: "State University",
    date: "April 30, 2025",
    image: "https://via.placeholder.com/300x200",
    spotsLeft: 25,
    urgency: "medium"
  },
  {
    id: 3,
    title: "Corporate Blood Drive",
    location: "Tech Park",
    date: "May 5, 2025",
    image: "https://via.placeholder.com/300x200",
    spotsLeft: 8,
    urgency: "low"
  }
];

// Blood demand data - will be replaced with API calls
const bloodDemandData = [
  { type: "A+", demand: 75 },
  { type: "A-", demand: 45 },
  { type: "B+", demand: 65 },
  { type: "B-", demand: 30 },
  { type: "AB+", demand: 25 },
  { type: "AB-", demand: 15 },
  { type: "O+", demand: 90 },
  { type: "O-", demand: 80 }
];

// Mock data for blood type information
const bloodTypeInfo = [
  { type: "A+", canDonateTo: ["A+", "AB+"], canReceiveFrom: ["A+", "A-", "O+", "O-"] },
  { type: "A-", canDonateTo: ["A+", "A-", "AB+", "AB-"], canReceiveFrom: ["A-", "O-"] },
  { type: "B+", canDonateTo: ["B+", "AB+"], canReceiveFrom: ["B+", "B-", "O+", "O-"] },
  { type: "B-", canDonateTo: ["B+", "B-", "AB+", "AB-"], canReceiveFrom: ["B-", "O-"] },
  { type: "AB+", canDonateTo: ["AB+"], canReceiveFrom: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] },
  { type: "AB-", canDonateTo: ["AB+", "AB-"], canReceiveFrom: ["A-", "B-", "AB-", "O-"] },
  { type: "O+", canDonateTo: ["A+", "B+", "AB+", "O+"], canReceiveFrom: ["O+", "O-"] },
  { type: "O-", canDonateTo: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], canReceiveFrom: ["O-"] }
];

// Mock data for FAQs about blood donation
const faqs = [
  {
    question: "How often can I donate blood?",
    answer: "Most people can donate whole blood every 56 days (8 weeks). Plasma can be donated every 28 days and platelets every 7 days, up to 24 times per year."
  },
  {
    question: "Is blood donation painful?",
    answer: "Most donors report only a brief pinch when the needle is inserted. The actual donation process is typically painless and takes about 8-10 minutes."
  },
  {
    question: "How long does the donation process take?",
    answer: "The entire process takes about 1 hour, which includes registration, mini-physical, the donation itself (8-10 minutes), and refreshments afterward."
  },
  {
    question: "Who can donate blood?",
    answer: "Generally, anyone who is at least 17 years old (16 with parental consent in some states), weighs at least 110 pounds, and is in good health can donate."
  },
  {
    question: "What should I do before donating blood?",
    answer: "Get a good night's sleep, eat a healthy meal, drink plenty of fluids, and bring a photo ID. Avoid fatty foods before donating."
  }
];

// Recent news mock data
const recentNews = [
  {
    id: 1,
    title: "National Blood Donor Month Campaign Success",
    summary: "Our recent campaign resulted in over 5,000 new donors across the country!",
    date: "April 18, 2025"
  },
  {
    id: 2,
    title: "Blood Shortage Alert for Type O-",
    summary: "Hospitals report critical shortage of O- blood. Urgent donations needed.",
    date: "April 15, 2025"
  },
  {
    id: 3,
    title: "New Mobile Donation Centers Launched",
    summary: "Ten new mobile donation centers will be traveling to underserved communities starting May 1st.",
    date: "April 10, 2025"
  }
];

export default function Home() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ donors: 0, lives: 0, campaigns: 0 });
  const [selectedBloodType, setSelectedBloodType] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isQuickCheckOpen, setIsQuickCheckOpen] = useState(false);
  const [userEligibility, setUserEligibility] = useState(null);
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
  const [isCheckingEligibility, setIsCheckingEligibility] = useState(false);
  const [quickDonorInfo, setQuickDonorInfo] = useState({
    age: "",
    weight: "",
    lastDonation: "",
    medications: ""
  });
  const [notificationPreferences, setNotificationPreferences] = useState({
    email: true,
    sms: false,
    push: true
  });
  const [activeCampaignFilter, setActiveCampaignFilter] = useState("all");
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  
  const statsRef = useRef(null);
  const campaignsRef = useRef(null);
  const bloodTypeRef = useRef(null);
  const donateNowRef = useRef(null);
  
  // Animation for stats counters
  useEffect(() => {
    const intervalId = setInterval(() => {
      setStats(prevStats => {
        return {
          donors: prevStats.donors < 15000 ? prevStats.donors + 150 : 15000,
          lives: prevStats.lives < 45000 ? prevStats.lives + 450 : 45000,
          campaigns: prevStats.campaigns < 500 ? prevStats.campaigns + 5 : 500
        };
      });
    }, 50);

    return () => clearInterval(intervalId);
  }, []);

  // Simulating map loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMapLoaded(true);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Function to get user location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setSearchQuery("Current Location");
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser");
    }
  };

  const handleAppointmentClick = () => {
    navigate('/map');
  };

  const scrollToRef = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Quick eligibility check
  const handleQuickCheck = () => {
    setIsCheckingEligibility(true);
    // Simulate API call
    setTimeout(() => {
      const age = parseInt(quickDonorInfo.age);
      const weight = parseInt(quickDonorInfo.weight);
      const lastDonation = quickDonorInfo.lastDonation;
      
      let eligibility = "eligible";
      let message = "Based on the information provided, you appear to be eligible to donate blood!";
      
      if (age < 17) {
        eligibility = "ineligible";
        message = "You must be at least 17 years old to donate blood.";
      } else if (weight < 110) {
        eligibility = "ineligible";
        message = "You must weigh at least 110 pounds to donate blood.";
      } else if (lastDonation && new Date(lastDonation) > new Date(Date.now() - 56 * 24 * 60 * 60 * 1000)) {
        eligibility = "temporary";
        message = "You must wait at least 56 days between whole blood donations.";
      }
      
      setUserEligibility({ status: eligibility, message });
      setIsCheckingEligibility(false);
    }, 1500);
  };
  
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setIsEmailSubmitted(true);
    // Reset after 3 seconds
    setTimeout(() => {
      setIsNewsletterOpen(false);
      setIsEmailSubmitted(false);
      setEmail("");
    }, 3000);
  };

  // Function to format numbers with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  // Function to filter campaigns
  const getFilteredCampaigns = () => {
    if (activeCampaignFilter === "all") return upcomingCampaigns;
    return upcomingCampaigns.filter(camp => camp.urgency === activeCampaignFilter);
  };
  
  // Function to get urgency label style
  const getUrgencyLabel = (urgency) => {
    switch(urgency) {
      case "high":
        return { color: "failure", text: "Urgent Need" };
      case "medium":
        return { color: "warning", text: "Moderate Need" };
      case "low":
        return { color: "success", text: "Standard Need" };
      default:
        return { color: "info", text: "Needed" };
    }
  };
  
  return (
    <Flowbite>
      <div className="min-h-screen flex flex-col">
        <NavBar />
        
        {/* Enhanced Hero Section with parallax effect */}
        <div className="hero-section relative overflow-hidden bg-gradient-to-r">
          <div className="absolute inset-0 hero-background"></div>
          <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center relative z-10">
            <div className="hero-content md:w-1/2 text-center md:text-left mb-8 md:mb-0">
              <Badge color="red" size="xl" className="mb-4 animate-pulse">International Blood Donor Day</Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-4 hero-title">
                Your Blood <span className="text-red-600">Saves</span> Lives
              </h1>
              <p className="text-xl text-slate-600 mb-8">
                Every donation can save up to three lives. Join our community of heroes making a difference today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button color="red" size="xl" onClick={handleAppointmentClick} className="px-8 py-3 font-semibold pulse-red">
                  <HiOutlineCalendar className="mr-2 h-5 w-5" />
                  Donate Now
                </Button>
                <Button color="light" size="xl" onClick={() => scrollToRef(bloodTypeRef)} className="px-8 py-3 font-semibold">
                  <HiOutlineInformationCircle className="mr-2 h-5 w-5" />
                  Check Compatibility
                </Button>
              </div>
              <div className="mt-8 flex gap-4 justify-center md:justify-start">
                <button onClick={() => scrollToRef(statsRef)} className="text-sm text-gray-600 hover:text-red-600 transition-colors">
                  Our Impact
                </button>
                <button onClick={() => scrollToRef(campaignsRef)} className="text-sm text-gray-600 hover:text-red-600 transition-colors">
                  Campaigns
                </button>
                <button onClick={() => setIsQuickCheckOpen(true)} className="text-sm text-gray-600 hover:text-red-600 transition-colors">
                  Eligibility Check
                </button>
              </div>
            </div>
            <div className="hero-image md:w-1/2 relative">
              {/* Animated elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-red-400 rounded-full opacity-30 animate-ping" style={{ animationDuration: '3s' }}></div>
              <div className="absolute top-1/4 -right-4 w-6 h-6 bg-red-500 rounded-full opacity-40 animate-ping" style={{ animationDuration: '4s' }}></div>
              <div className="absolute bottom-1/4 -left-2 w-4 h-4 bg-red-600 rounded-full opacity-50 animate-ping" style={{ animationDuration: '2.5s' }}></div>
              
              <div className="relative overflow-hidden rounded-lg shadow-2xl transform transition-all hover:scale-105 duration-500">
                {/* <div className="absolute inset-0 bg-gradient-to-tr from-red-600/20 to-blue-600/20 z-10"></div> */}
                <img 
                  src={heroImage} 
                  alt="Blood Donation" 
                  className="w-full max-w-xl mx-auto z-0 hero-img"
                />
                
                {/* Floating badges */}
                <div className="absolute top-4 right-4 z-20 bg-white/90 rounded-full px-3 py-1 text-xs font-bold text-red-600 shadow-lg backdrop-blur-sm">
                  <FaHandHoldingMedical className="inline mr-1" /> Life Saver
                </div>
                <div className="absolute bottom-4 left-4 z-20 bg-white/90 rounded-full px-3 py-1 text-xs font-bold text-blue-600 shadow-lg backdrop-blur-sm">
                  <FaTint className="inline mr-1" /> Every Drop Counts
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced floating elements */}
          <div className="absolute top-10 left-10 text-red-500 opacity-20 text-6xl float-animation">❤</div>
          <div className="absolute bottom-10 right-10 text-red-500 opacity-20 text-6xl float-animation" style={{ animationDelay: '1s' }}>❤</div>
          <div className="absolute top-1/3 right-1/4 text-red-500 opacity-10 text-4xl float-animation" style={{ animationDelay: '2s' }}>❤</div>
          <div className="absolute bottom-1/3 left-1/4 text-red-500 opacity-10 text-4xl float-animation" style={{ animationDelay: '3s' }}>❤</div>
        </div>
        
        {/* Emergency Alert Banner (can be toggled based on API response) */}
        <div className="bg-amber-50 border-t border-b border-amber-200">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-amber-100 p-2 rounded-full mr-3">
                  <HiOutlineBell className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-amber-800">Urgent Need: O- and B+ Blood Types</h4>
                  <p className="text-sm text-amber-700">Local hospitals are experiencing critical shortages</p>
                </div>
              </div>
              <Button 
                color="warning" 
                size="xs" 
                onClick={handleAppointmentClick}
                className="whitespace-nowrap"
              >
                Donate Now
              </Button>
            </div>
          </div>
        </div>
        
        {/* Animated Stats Section - Enhanced with ref */}
        <div ref={statsRef} className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10 text-white">Our Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="stat-card p-6 transform transition-all hover:scale-105 duration-300">
                <div className="stat-icon-container mx-auto mb-4 w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                  <FaUsers className="text-3xl text-white" />
                </div>
                <h3 className="text-4xl font-bold mb-2">{formatNumber(stats.donors)}+</h3>
                <p className="text-xl text-red-100">Registered Donors</p>
                <div className="mt-4 h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white" style={{ width: `${(stats.donors/15000)*100}%` }}></div>
                </div>
              </div>
              <div className="stat-card p-6 transform transition-all hover:scale-105 duration-300">
                <div className="stat-icon-container mx-auto mb-4 w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                  <FaHandHoldingMedical className="text-3xl text-white" />
                </div>
                <h3 className="text-4xl font-bold mb-2">{formatNumber(stats.lives)}+</h3>
                <p className="text-xl text-red-100">Lives Saved</p>
                <div className="mt-4 h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white" style={{ width: `${(stats.lives/45000)*100}%` }}></div>
                </div>
              </div>
              <div className="stat-card p-6 transform transition-all hover:scale-105 duration-300">
                <div className="stat-icon-container mx-auto mb-4 w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                  <FaAward className="text-3xl text-white" />
                </div>
                <h3 className="text-4xl font-bold mb-2">{formatNumber(stats.campaigns)}+</h3>
                <p className="text-xl text-red-100">Campaigns Organized</p>
                <div className="mt-4 h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white" style={{ width: `${(stats.campaigns/500)*100}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Current Blood Demand Section - NEW */}
        <div className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-6 text-slate-800">Current Blood Demand</h2>
            <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">
              See which blood types are most needed right now in your community. 
              Blood demand varies by type, and your donation could be critical.
            </p>
            
            <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
              {bloodDemandData.map(blood => (
                <div key={blood.type} className="bg-white rounded-lg shadow-md p-4 border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${blood.demand > 70 ? 'bg-red-600' : blood.demand > 40 ? 'bg-amber-500' : 'bg-green-500'}`}>
                        {blood.type}
                      </div>
                      <div className="ml-3">
                        <span className={`text-xs font-semibold px-2 py-1 rounded ${blood.demand > 70 ? 'bg-red-100 text-red-800' : blood.demand > 40 ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}>
                          {blood.demand > 70 ? 'Critical' : blood.demand > 40 ? 'Needed' : 'Stable'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Progress
                    color={blood.demand > 70 ? 'red' : blood.demand > 40 ? 'yellow' : 'green'}
                    progress={blood.demand}
                    size="lg"
                    labelText
                    labelProgress
                  />
                </div>
              ))}
            </div>
            
            <div className="mt-10 text-center">
              <Button 
                onClick={handleAppointmentClick}
                color="red"
                pill
                className="mx-auto"
              >
                Schedule a Donation
              </Button>
            </div>
          </div>
        </div>
        
        {/* Quick Information Cards */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">How You Can Help</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="info-card transform transition-all hover:shadow-xl hover:-translate-y-2 duration-300 border-t-4 border-red-600 overflow-visible">
                <div className="flex justify-center -mt-10">
                  <div className="p-4 rounded-full bg-red-600 text-white shadow-lg">
                    <FaUserCheck className="w-8 h-8" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center mb-2">Check Your Eligibility</h3>
                <p className="text-gray-600 text-center mb-4">
                  Find out if you're eligible to donate blood by answering a few simple questions.
                </p>
                <Button 
                  color="red" 
                  onClick={() => setIsQuickCheckOpen(true)}
                  className="w-full"
                >
                  Quick Check <HiChevronRight className="ml-2" />
                </Button>
              </Card>
              <Card className="info-card transform transition-all hover:shadow-xl hover:-translate-y-2 duration-300 border-t-4 border-blue-600 overflow-visible">
                <div className="flex justify-center -mt-10">
                  <div className="p-4 rounded-full bg-blue-600 text-white shadow-lg">
                    <FaHistory className="w-8 h-8" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center mb-2">Track Your Donations</h3>
                <p className="text-gray-600 text-center mb-4">
                  Create an account to track your donation history and schedule future appointments.
                </p>
                <Button 
                  color="light" 
                  onClick={() => navigate('/account')}
                  className="w-full"
                >
                  Sign Up / Login <HiChevronRight className="ml-2" />
                </Button>
              </Card>
              <Card className="info-card transform transition-all hover:shadow-xl hover:-translate-y-2 duration-300 border-t-4 border-purple-600 overflow-visible">
                <div className="flex justify-center -mt-10">
                  <div className="p-4 rounded-full bg-purple-600 text-white shadow-lg">
                    <FaCalendarCheck className="w-8 h-8" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center mb-2">Organize a Campaign</h3>
                <p className="text-gray-600 text-center mb-4">
                  Start your own blood donation campaign at your workplace, school, or community.
                </p>
                <Button 
                  color="light" 
                  onClick={() => navigate('/campaigncreate')}
                  className="w-full"
                >
                  Organize Now <HiChevronRight className="ml-2" />
                </Button>
              </Card>
            </div>
          </div>
        </div>
        
        {/* Upcoming Campaigns - Enhanced with ref and filtering */}
        <div ref={campaignsRef} className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-slate-800 mb-4 md:mb-0">Upcoming Campaigns</h2>
              <div className="flex gap-2">
                <Button 
                  color={activeCampaignFilter === "all" ? "red" : "light"} 
                  size="sm"
                  onClick={() => setActiveCampaignFilter("all")}
                >
                  All
                </Button>
                <Button 
                  color={activeCampaignFilter === "high" ? "red" : "light"} 
                  size="sm"
                  onClick={() => setActiveCampaignFilter("high")}
                >
                  Urgent
                </Button>
                <Button 
                  color={activeCampaignFilter === "medium" ? "red" : "light"} 
                  size="sm"
                  onClick={() => setActiveCampaignFilter("medium")}
                >
                  Needed
                </Button>
                <Button 
                  color="light"
                  size="sm"
                  onClick={() => navigate('/campaigns')}
                >
                  View All <HiChevronRight className="ml-1" />
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {getFilteredCampaigns().map(campaign => (
                <Card 
                  key={campaign.id}
                  className="campaign-card overflow-hidden transform transition-all hover:shadow-xl hover:scale-105 duration-300 border border-gray-200"
                >
                  <div className="relative">
                    <img 
                      src={campaign.image} 
                      alt={campaign.title} 
                      className="w-full h-40 object-cover"
                    />
                    <Badge 
                      color={getUrgencyLabel(campaign.urgency).color}
                      className="absolute top-2 right-2"
                      size="sm"
                    >
                      {getUrgencyLabel(campaign.urgency).text}
                    </Badge>
                  </div>
                  <div className="p-4">
                    <h5 className="text-xl font-bold tracking-tight text-gray-900 mb-2">
                      {campaign.title}
                    </h5>
                    <div className="flex items-center mb-2 text-gray-600">
                      <HiOutlineLocationMarker className="mr-2" />
                      <span>{campaign.location}</span>
                    </div>
                    <div className="flex items-center mb-4 text-gray-600">
                      <HiOutlineCalendar className="mr-2" />
                      <span>{campaign.date}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{campaign.spotsLeft} spots left</span>
                      <Button
                        color="red"
                        onClick={() => navigate(`/campaign/${campaign.id}`)}
                        size="sm"
                      >
                        Register
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
        
        {/* Blood Type Compatibility Tool - Enhanced with ref */}
        <div ref={bloodTypeRef} className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-slate-800">Blood Type Compatibility</h2>
            <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
              Understanding blood type compatibility is crucial for blood donation. 
              Select your blood type to see who you can donate to and receive from.
            </p>
            
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg transform transition hover:shadow-2xl duration-300">
              <div className="grid grid-cols-4 md:grid-cols-8 gap-3 mb-8">
                {bloodTypeInfo.map(info => (
                  <Button
                    key={info.type}
                    color={selectedBloodType === info.type ? "red" : "light"}
                    onClick={() => setSelectedBloodType(info.type)}
                    className={`text-lg font-bold transition-all duration-300 ${selectedBloodType === info.type ? 'scale-110 shadow-md' : ''}`}
                  >
                    {info.type}
                  </Button>
                ))}
              </div>
              
              {selectedBloodType ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-green-50 p-6 rounded-lg border border-green-100 transform transition hover:scale-105 duration-300">
                    <h4 className="text-lg font-semibold text-green-800 mb-3 flex items-center">
                      <FaTint className="mr-2" /> Can Donate To:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {bloodTypeInfo.find(b => b.type === selectedBloodType).canDonateTo.map(type => (
                        <Badge key={type} color="success" className="text-base py-2 px-3">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 transform transition hover:scale-105 duration-300">
                    <h4 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
                      <FaTint className="mr-2" /> Can Receive From:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {bloodTypeInfo.find(b => b.type === selectedBloodType).canReceiveFrom.map(type => (
                        <Badge key={type} color="info" className="text-base py-2 px-3">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 p-8 border border-dashed border-gray-300 rounded-lg">
                  <FaQuestion className="mx-auto text-4xl text-gray-300 mb-2" />
                  <p>Please select a blood type to see compatibility information</p>
                </div>
              )}
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold mb-2">Did you know?</h4>
                <p className="text-gray-600 text-sm">
                  Only 7% of people have O- blood type, but it can be given to anyone, making it the "universal donor" type.
                  AB+ individuals can receive blood from any type, making them "universal recipients".
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Find Donation Centers - Enhanced with user location */}
        <div className="bg-red-50 py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
                <h2 className="text-3xl font-bold mb-6 text-slate-800">Find Donation Centers Near You</h2>
                <p className="text-gray-600 mb-6">
                  Enter your location to find nearby blood donation centers and 
                  check availability for appointments.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <FaSearch className="text-gray-400" />
                    </div>
                    <input 
                      type="text" 
                      className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full pl-10 p-2.5" 
                      placeholder="Enter your zip code or city"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button 
                    color="red" 
                    onClick={() => navigate(`/map?query=${searchQuery}`)}
                  >
                    Search
                  </Button>
                </div>
                <div className="flex items-center mb-6">
                  <Button 
                    color="light" 
                    size="xs"
                    onClick={getUserLocation}
                    className="flex items-center"
                  >
                    <FaMapMarkerAlt className="mr-1 text-red-600" />
                    Use my current location
                  </Button>
                  <span className="mx-3 text-gray-400">or</span>
                  <Button 
                    color="light" 
                    size="xs"
                    onClick={() => navigate('/map')}
                  >
                    View all centers
                  </Button>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Nearest Centers</h3>
                  <ul className="divide-y divide-gray-200">
                    <li className="py-3 flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Central Hospital Blood Bank</h4>
                        <p className="text-sm text-gray-600">1.2 miles away</p>
                      </div>
                      <Button color="light" size="xs" onClick={() => navigate('/center/1')}>
                        Details
                      </Button>
                    </li>
                    <li className="py-3 flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Community Health Center</h4>
                        <p className="text-sm text-gray-600">2.5 miles away</p>
                      </div>
                      <Button color="light" size="xs" onClick={() => navigate('/center/2')}>
                        Details
                      </Button>
                    </li>
                    <li className="py-3 flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">University Medical Center</h4>
                        <p className="text-sm text-gray-600">3.8 miles away</p>
                      </div>
                      <Button color="light" size="xs" onClick={() => navigate('/center/3')}>
                        Details
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="bg-white p-4 rounded-lg shadow-md relative overflow-hidden">
                  {!isMapLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                      <div className="text-center">
                        <Spinner size="xl" color="red" className="mb-3" />
                        <p className="text-gray-500">Loading map...</p>
                      </div>
                    </div>
                  )}
                  {isMapLoaded && (
                    <div className="aspect-video bg-gray-100 rounded-lg relative">
                      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://via.placeholder.com/800x450')" }}></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/90 p-3 rounded-lg shadow-lg backdrop-blur-sm">
                          <p className="text-gray-800 text-center">
                            Interactive Map
                            <br />
                            <span className="text-sm text-gray-500">3 donation centers found nearby</span>
                          </p>
                        </div>
                      </div>
                      
                      {/* Location markers - would be dynamic in the real implementation */}
                      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-6 h-6 bg-red-600 rounded-full border-2 border-white shadow-lg pulse-red"></div>
                      </div>
                      <div className="absolute top-2/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-5 h-5 bg-red-600 rounded-full border-2 border-white shadow-lg"></div>
                      </div>
                      <div className="absolute top-1/4 right-1/4 transform translate-x-1/2 -translate-y-1/2">
                        <div className="w-5 h-5 bg-red-600 rounded-full border-2 border-white shadow-lg"></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Recent News Section - NEW */}
        <div className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-slate-800">Recent News</h2>
              <Button color="light" onClick={() => navigate('/news')}>
                View All <HiChevronRight className="ml-1" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentNews.map(news => (
                <Card 
                  key={news.id}
                  className="overflow-hidden transform transition-all hover:shadow-xl hover:-translate-y-1 duration-300"
                >
                  <div className="flex items-center mb-3">
                    <FaRegNewspaper className="text-red-600 mr-2" />
                    <span className="text-xs text-gray-500">{news.date}</span>
                  </div>
                  <h5 className="text-xl font-bold tracking-tight text-gray-900 mb-2">
                    {news.title}
                  </h5>
                  <p className="text-gray-600 mb-4">
                    {news.summary}
                  </p>
                  <Button
                    color="light"
                    onClick={() => navigate(`/news/${news.id}`)}
                    className="text-red-600"
                  >
                    Read More <HiChevronRight className="ml-1" />
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </div>
        
        {/* FAQ Section - NEW */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-slate-800">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto">
              <Accordion>
                {faqs.map((faq, index) => (
                  <Accordion.Panel key={index}>
                    <Accordion.Title>
                      {faq.question}
                    </Accordion.Title>
                    <Accordion.Content>
                      <p className="mb-2 text-gray-600">
                        {faq.answer}
                      </p>
                    </Accordion.Content>
                  </Accordion.Panel>
                ))}
              </Accordion>
              
              <div className="mt-8 text-center">
                <Button
                  color="light"
                  onClick={() => navigate('/faq')}
                >
                  View All FAQs <HiChevronRight className="ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Testimonials - Enhanced */}
        <div className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">Donor Stories</h2>
            
            <div className="max-w-4xl mx-auto">
              <Carousel>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-lg">
                  <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6">
                    <div className="shrink-0">
                      <div className="w-24 h-24 bg-gray-300 rounded-full mb-4 border-4 border-white shadow-lg"></div>
                      <div className="flex justify-center gap-1">
                        <FaTint className="text-red-500" />
                        <FaTint className="text-red-500" />
                        <FaTint className="text-red-500" />
                      </div>
                      <div className="text-xs text-gray-500 mt-1">15 donations</div>
                    </div>
                    <div>
                      <div className="text-6xl text-blue-200 mb-2">"</div>
                      <p className="italic text-gray-600 mb-4 text-lg">
                        "I've been donating blood for 5 years now, and it's one of the most rewarding things I do. 
                        Knowing that my 30 minutes can save up to three lives is an incredible feeling."
                      </p>
                      <h5 className="text-lg font-bold text-blue-900">Sarah Johnson</h5>
                      <p className="text-sm text-blue-600">Regular Donor</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-red-50 to-orange-50 p-8 rounded-lg">
                  <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6">
                    <div className="shrink-0">
                      <div className="w-24 h-24 bg-gray-300 rounded-full mb-4 border-4 border-white shadow-lg"></div>
                      <div className="flex justify-center gap-1">
                        <FaTint className="text-red-500" />
                        <FaTint className="text-red-500" />
                      </div>
                      <div className="text-xs text-gray-500 mt-1">8 donations</div>
                    </div>
                    <div>
                      <div className="text-6xl text-red-200 mb-2">"</div>
                      <p className="italic text-gray-600 mb-4 text-lg">
                        "After receiving blood during emergency surgery, I promised myself I would give back. 
                        Now I donate regularly and organize blood drives at my workplace."
                      </p>
                      <h5 className="text-lg font-bold text-red-900">Michael Carter</h5>
                      <p className="text-sm text-red-600">Recipient & Donor</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-teal-50 p-8 rounded-lg">
                  <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6">
                    <div className="shrink-0">
                      <div className="w-24 h-24 bg-gray-300 rounded-full mb-4 border-4 border-white shadow-lg"></div>
                      <div className="flex justify-center gap-1">
                        <FaTint className="text-red-500" />
                        <FaTint className="text-red-500" />
                        <FaTint className="text-red-500" />
                        <FaTint className="text-red-500" />
                      </div>
                      <div className="text-xs text-gray-500 mt-1">20 donations</div>
                    </div>
                    <div>
                      <div className="text-6xl text-green-200 mb-2">"</div>
                      <p className="italic text-gray-600 mb-4 text-lg">
                        "As a nurse, I see firsthand how critical blood donations are. 
                        BloodFlow has made it so easy to donate and keep track of my donation history."
                      </p>
                      <h5 className="text-lg font-bold text-green-900">Elena Rodriguez</h5>
                      <p className="text-sm text-green-600">Healthcare Professional</p>
                    </div>
                  </div>
                </div>
              </Carousel>
            </div>
          </div>
        </div>
        
        {/* Call to Action - Enhanced with ref */}
        <div ref={donateNowRef} className="bg-gradient-to-r from-red-600 to-red-700 py-16 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Your donation can save up to 3 lives. Schedule an appointment today or 
              learn more about how you can contribute.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                color="white" 
                size="xl" 
                onClick={handleAppointmentClick}
                className="text-red-600 font-bold shadow-lg hover:shadow-xl transition-shadow"
              >
                Schedule Donation
              </Button>
              <Button 
                color="light" 
                outline={true}
                size="xl"
                onClick={() => navigate('/learn-more')}
                className="text-white border-white font-bold hover:bg-white/10 transition-colors"
              >
                Learn More
              </Button>
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/20 flex justify-center">
              <Button 
                color="light" 
                pill
                outline
                size="sm"
                onClick={() => setShowNotificationModal(true)}
                className="text-white border-white hover:bg-white/10"
              >
                <HiOutlineBell className="mr-2" />
                Get Notifications About Blood Shortages
              </Button>
            </div>
          </div>
        </div>
        
        {/* Newsletter Signup - Enhanced */}
        <div className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg transform transition-all hover:shadow-xl duration-300">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 rounded-full bg-red-100 text-red-600">
                  <HiOutlineMail className="w-6 h-6" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-center mb-2">Stay Updated</h3>
              <p className="text-center text-gray-600 mb-6">
                Subscribe to our newsletter for updates on blood drives, donation tips, and success stories.
              </p>
              
              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <div className="flex flex-col md:flex-row gap-3">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Button 
                    color="red"
                    type="submit"
                    disabled={isEmailSubmitted}
                  >
                    {isEmailSubmitted ? (
                      <>
                        <span className="mr-2">✓</span> Subscribed!
                      </>
                    ) : (
                      "Subscribe"
                    )}
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-4 justify-center pt-4">
                  <div className="flex items-center">
                    <input 
                      id="notify-campaigns" 
                      type="checkbox" 
                      className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
                      defaultChecked
                    />
                    <label htmlFor="notify-campaigns" className="ml-2 text-sm text-gray-600">
                      Upcoming campaigns
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      id="notify-tips" 
                      type="checkbox" 
                      className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
                      defaultChecked
                    />
                    <label htmlFor="notify-tips" className="ml-2 text-sm text-gray-600">
                      Donation tips
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      id="notify-shortage" 
                      type="checkbox" 
                      className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
                      defaultChecked
                    />
                    <label htmlFor="notify-shortage" className="ml-2 text-sm text-gray-600">
                      Blood shortage alerts
                    </label>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        
       
        
        <Footer1 />
        
        {/* Quick Eligibility Check Modal */}
        <Modal show={isQuickCheckOpen} onClose={() => setIsQuickCheckOpen(false)} size="lg">
          <Modal.Header>
            Quick Eligibility Check
          </Modal.Header>
          <Modal.Body>
            {userEligibility ? (
              <div className="text-center p-4">
                <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
                  userEligibility.status === 'eligible' ? 'bg-green-100 text-green-600' : 
                  userEligibility.status === 'temporary' ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'
                }`}>
                  {userEligibility.status === 'eligible' ? (
                    <FaUserCheck className="w-8 h-8" />
                  ) : userEligibility.status === 'temporary' ? (
                    <HiOutlineCalendar className="w-8 h-8" />
                  ) : (
                    <FaUsers className="w-8 h-8" />
                  )}
                </div>
                <h3 className={`text-xl font-bold mt-4 ${
                  userEligibility.status === 'eligible' ? 'text-green-600' : 
                  userEligibility.status === 'temporary' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {userEligibility.status === 'eligible' ? 'You are eligible!' : 
                   userEligibility.status === 'temporary' ? 'Temporarily deferred' : 'Not eligible at this time'}
                </h3>
                <p className="mt-2 text-gray-600">{userEligibility.message}</p>
                
                {userEligibility.status === 'eligible' && (
                  <Button 
                    color="success" 
                    className="mt-4"
                    onClick={() => {
                      setIsQuickCheckOpen(false);
                      handleAppointmentClick();
                    }}
                  >
                    Schedule Donation
                  </Button>
                )}
                
                {userEligibility.status === 'temporary' && (
                  <Button 
                    color="warning" 
                    className="mt-4"
                    onClick={() => {
                      setIsQuickCheckOpen(false);
                      navigate('/learn-more');
                    }}
                  >
                    Learn More
                  </Button>
                )}
                
                <div className="mt-6 text-xs text-gray-500">
                  Note: This is just a preliminary check. A full assessment will be conducted at the donation center.
                </div>
              </div>
            ) : (
              <div>
                <p className="text-gray-600 mb-6">
                  Please answer these quick questions to check your basic eligibility for blood donation.
                  This is not a complete screening, but will give you a general idea.
                </p>
                {isCheckingEligibility ? (
                  <div className="text-center p-10">
                    <Spinner size="xl" color="red" className="mb-4" />
                    <p className="text-gray-600">Checking eligibility...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        What is your weight?
                      </label>
                      <input 
                        type="number" 
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                        placeholder="Weight in pounds"
                        value={quickDonorInfo.weight}
                        onChange={(e) => setQuickDonorInfo({...quickDonorInfo, weight: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        When was your last blood donation? (if applicable)
                      </label>
                      <input 
                        type="date" 
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                        value={quickDonorInfo.lastDonation}
                        onChange={(e) => setQuickDonorInfo({...quickDonorInfo, lastDonation: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Are you currently taking any medications?
                      </label>
                      <input 
                        type="text" 
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                        placeholder="List medications (optional)"
                        value={quickDonorInfo.medications}
                        onChange={(e) => setQuickDonorInfo({...quickDonorInfo, medications: e.target.value})}
                      />
                    </div>
                    <Button 
                      color="red" 
                      className="w-full mt-4"
                      onClick={handleQuickCheck}
                    >
                      Check Eligibility
                    </Button>
                  </div>
                )}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button color="gray" onClick={() => setIsQuickCheckOpen(false)}>
              Close
            </Button>
            {!userEligibility && !isCheckingEligibility && (
              <Button color="light" onClick={() => navigate('/eligibility')}>
                Full Eligibility Criteria
              </Button>
            )}
          </Modal.Footer>
        </Modal>
        
        {/* Notification Preferences Modal */}
        <Modal show={showNotificationModal} onClose={() => setShowNotificationModal(false)}>
          <Modal.Header>
            Blood Shortage Notifications
          </Modal.Header>
          <Modal.Body>
            <p className="text-gray-600 mb-6">
              Get notified when there's a critical need for your blood type or during emergency situations. 
              Choose how you'd like to receive these important alerts:
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <HiOutlineMail className="text-gray-600 mr-3 text-xl" />
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-gray-500">Get notifications to your email address</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={notificationPreferences.email}
                    onChange={() => setNotificationPreferences({
                      ...notificationPreferences,
                      email: !notificationPreferences.email
                    })}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <HiOutlinePhone className="text-gray-600 mr-3 text-xl" />
                  <div>
                    <h4 className="font-medium">SMS Notifications</h4>
                    <p className="text-sm text-gray-500">Get text messages to your mobile phone</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={notificationPreferences.sms}
                    onChange={() => setNotificationPreferences({
                      ...notificationPreferences,
                      sms: !notificationPreferences.sms
                    })}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <HiOutlineBell className="text-gray-600 mr-3 text-xl" />
                  <div>
                    <h4 className="font-medium">Push Notifications</h4>
                    <p className="text-sm text-gray-500">Get notifications in our mobile app</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={notificationPreferences.push}
                    onChange={() => setNotificationPreferences({
                      ...notificationPreferences,
                      push: !notificationPreferences.push
                    })}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                </label>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium mb-2">What would you like to be notified about?</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input 
                      id="notify-critical" 
                      type="checkbox" 
                      className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
                      defaultChecked
                    />
                    <label htmlFor="notify-critical" className="ml-2 text-sm text-gray-600">
                      Critical blood shortages for my blood type
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      id="notify-emergency" 
                      type="checkbox" 
                      className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
                      defaultChecked
                    />
                    <label htmlFor="notify-emergency" className="ml-2 text-sm text-gray-600">
                      Emergency situations with high blood demand
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      id="notify-eligible" 
                      type="checkbox" 
                      className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
                      defaultChecked
                    />
                    <label htmlFor="notify-eligible" className="ml-2 text-sm text-gray-600">
                      When I'm eligible to donate again
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      id="notify-nearby" 
                      type="checkbox" 
                      className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
                      defaultChecked
                    />
                    <label htmlFor="notify-nearby" className="ml-2 text-sm text-gray-600">
                      Nearby donation opportunities
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button color="gray" onClick={() => setShowNotificationModal(false)}>
              Cancel
            </Button>
            <Button color="red" onClick={() => {
              // In real implementation, this would save to backend
              setShowNotificationModal(false);
              // Show success message
              alert("Notification preferences saved!");
            }}>
              Save Preferences
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Flowbite>
  );
}