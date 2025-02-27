import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Lottie from "react-lottie-player";
import SplitText from "./SplitText/SplitText";
import HeroAnimation from "../assets/HeroAnimation";

function Hero() {
  const [mounted, setMounted] = useState(false);
  const [activeUsers, setActiveUsers] = useState(0); // State for active users

  // Fetch user count from the backend
  useEffect(() => {
    setMounted(true);

    const fetchUserCount = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users"); // Adjust URL if needed
        const users = await response.json();
        const totalUsers = users.length; // Assuming the API returns an array of users
        animateUsers(totalUsers); // Trigger animation
      } catch (error) {
        console.error("Error fetching users:", error);
        animateUsers(500000); // Fallback to static value on error
      }
    };

    fetchUserCount();
  }, []);

  // Animate the user count from 0 to the target value
  const animateUsers = (target) => {
    let start = 0;
    const increment = Math.ceil(target / 100); // Adjust for smoother animation
    const duration = 2000; // Animation duration in ms
    const steps = Math.ceil(duration / 50); // Update every 50ms
    const stepValue = Math.ceil(target / steps);

    const interval = setInterval(() => {
      start += stepValue;
      if (start >= target) {
        setActiveUsers(target);
        clearInterval(interval);
      } else {
        setActiveUsers(start);
      }
    }, 50);
  };

  if (!mounted) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, duration: 0.8, ease: [0.42, 0, 0.58, 1] },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.42, 0, 0.58, 1] },
    },
  };

  return (
    <motion.div
      className="relative min-h-screen overflow-hidden bg-background pt-16 md:pt-28 -mt-2"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-4 sm:px-8 md:px-16 lg:px-32 gap-8 lg:gap-12"
        variants={containerVariants}
      >
        {/* Left Content */}
        <motion.div
          className="relative z-10 max-w-2xl text-left mt-10 lg:mt-0 lg:flex-1 order-2 lg:order-1"
          variants={containerVariants}
        >
          <motion.div className="mb-2 md:mb-8" variants={itemVariants}>
            <div className="inline-flex items-center py-1.5 text-sm text-foreground backdrop-blur-sm">
              Welcome to FairBasket
            </div>
          </motion.div>

          <div>
            <SplitText />
          </div>
          <motion.p
            className="mt-6 max-w-2xl text-base sm:text-lg text-muted-foreground backdrop-blur-sm"
            variants={itemVariants}
          >
            Use AI-driven scanning to identify products, compare today's prices,
            get retailer insights, and ensure fast delivery while saving money.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col sm:flex-row items-center gap-4"
            variants={itemVariants}
          >
            <button className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary-hover">
              Get started
            </button>
            <button className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-secondary px-6 py-3 text-sm font-medium text-foreground hover:bg-secondary-hover">
              Learn More
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {[
              { value: `${activeUsers.toLocaleString()}+`, label: "Active Users" }, // Dynamic value
              { value: "50,000+", label: "Registered Shops" },
              { value: "20,000+", label: "Delivery Agents" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-4 rounded-2xl border border-primary"
              >
                <div className="text-3xl sm:text-4xl font-bold bg-primary bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Side - Lottie Animation */}
        <motion.div
          className="flex justify-center md:justify-end items-center h-[250px] sm:h-[500px] lg:h-[600px] w-full lg:w-1/2 z-10 mt-10 lg:mt-0 order-1 lg:order-2"
          variants={itemVariants}
        >
          <Lottie
            loop
            animationData={HeroAnimation}
            play
            className="w-full h-full"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default Hero;