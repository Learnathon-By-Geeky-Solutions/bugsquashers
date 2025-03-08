import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Lottie from "react-lottie-player";
import SplitText from "./SplitText/SplitText";
import HeroAnimation from "../assets/HeroAnimation";
import { ArrowRight } from "lucide-react";
import { Button } from "../../../components/ui/button";

function Hero() {
  const [mounted, setMounted] = useState(false);
  const [activeUsers, setActiveUsers] = useState(0);

  useEffect(() => {
    setMounted(true);

    const fetchUserCount = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users");
        const users = await response.json();
        const totalUsers = users.length;
        animateUsers(totalUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
        animateUsers(500000); // Fallback
      }
    };

    fetchUserCount();
  }, []);

  const animateUsers = (target) => {
    const startTime = performance.now();
    const duration = 1000;

    const update = (timestamp) => {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const animatedValue = Math.floor(progress * target);

      setActiveUsers(animatedValue);

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  };

  if (!mounted) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
      transition: { duration: 0.8, ease: [0.42, 0, 0.58, 1] },
    },
  };

  return (
    <motion.div
      className="relative min-h-screen overflow-hidden bg-background pt-0 md:pt-28 -mt-2"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div
        className="absolute inset-x-0 top-0 h-[600px] bg-gradient-to-b from-primary via-background to-background dark:from-primary dark:via-background dark:to-background opacity-0 dark:opacity-20"
        aria-hidden="true"
      />
      <motion.div
        className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-4 sm:px-8 md:px-16 lg:px-32 gap-8 lg:gap-12"
        variants={containerVariants}
      >
        <motion.div
          className="relative z-10 max-w-2xl text-left mt-80 sm:mt-96 md:mt-0 lg:mt-0 lg:flex-1 order-2 lg:order-1"
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
            className="mt-6 max-w-2xl text-base sm:text-lg text-muted-foreground hidden md:flex"
            variants={itemVariants}
          >
            Use AI-driven scanning to identify products, compare today’s prices,
            get retailer insights, and ensure fast delivery while saving money.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col sm:flex-row items-center gap-4"
            variants={itemVariants}
          >
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary-hover px-8 py-6 text-lg group rounded-full w-full md:w-48"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="sm"
              className="bg-secondary text-primary-foreground hover:bg-secondary-hover px-8 py-6 text-lg group rounded-full w-full md:w-48"
            >
              Learn More
            </Button>
          </motion.div>

          <motion.div
            className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {[
              {
                value: `${activeUsers.toLocaleString()}+`,
                label: "Active Users",
              },
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

        <motion.div
          className="flex justify-center md:justify-end items-center h-[400px] sm:h-[500px] lg:h-[600px] w-full lg:w-1/2 z-10 -mt-6 lg:mt-0 order-1 lg:order-2 absolute md:relative"
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