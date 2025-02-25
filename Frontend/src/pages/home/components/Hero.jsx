import { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import Lottie from "react-lottie-player";
import SplitText from "./SplitText/SplitText";
import HeroAnimation from "../assets/HeroAnimation"; // Import the Lottie JSON file

function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Elements appear one after another smoothly
        duration: 0.8,
        ease: [0.42, 0, 0.58, 1],
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.42, 0, 0.58, 1], // Smooth ease-in-out curve
      },
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
          {/* Welcome Badge */}
          <motion.div className="mb-2 md:mb-8" variants={itemVariants}>
            <div className="inline-flex items-center py-1.5 text-sm text-foreground backdrop-blur-sm">
              <span>Welcome to FairBasket</span>{" "}
              <span className="ml-2">🤖</span>
            </div>
          </motion.div>

          {/* Hero Content */}
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

          {/* Buttons */}
          <motion.div
            className="mt-8 flex flex-col sm:flex-row items-center gap-4"
            variants={itemVariants}
          >
            <button className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary-hover">
              Start Now <span className="ml-2">📊</span>
            </button>
            <button className="w-full sm:w-auto inline-flex items-center justify-center rounded-full  bg-secondary px-6 py-3 text-sm font-medium text-foreground hover:bg-secondary-hover">
              Learn More
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {[
              { value: "500,000+", label: "Active Users" },
              { value: "50,000+", label: "Registered Shops" },
              { value: "20,000+", label: "Delivery Agents" },
            ].map((stat) => (
              <div
                key={stat.label} // Use label as a unique key instead of index
                className="transform hover:scale-105 transition-all duration-300 p-4 rounded-xl border border-primary/20 bg-background/50 backdrop-blur-sm"
              >
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
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
