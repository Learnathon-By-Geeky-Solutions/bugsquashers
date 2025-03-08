import Hero from "./components/Hero";
import Bento from "./components/Bento";
import Footer from "./components/Footer";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { ArrowRight, CheckCircle, Truck, Users } from "lucide-react";
import Lottie from "react-lottie-player";
import HeroAnimation from "./assets/1"; // Ensure this is the correct animation
import DeliveryAnimation from "./assets/2"; // Example alternative animation
import FarmersAnimation from "./assets/3"; // Example alternative animation
import SavingsAnimation from "./assets/4"; // Example alternative animation
import { InfiniteMovingCards } from "../../components/ui/infinite-moving-cards";

const testimonials = [
  {
    quote:
      "FairBasket has completely transformed the way I shop for groceries. The direct-from-farm produce is fresher and more affordable than anything I've found elsewhere.",
    name: "Sarah Johnson",
    title: "Happy Customer",
    avatar: "https://i.pinimg.com/736x/d1/78/72/d17872ea78786123380ce9fa66b7c413.jpg",
    rating: 5, // Rating out of 5
  },
  {
    quote:
      "The easy ordering system and efficient delivery make grocery shopping a breeze. I love supporting local farmers while saving money!",
    name: "Michael Smith",
    title: "Local Food Enthusiast",
    avatar: "https://i.pinimg.com/736x/d1/78/72/d17872ea78786123380ce9fa66b7c413.jpg",
    rating: 4,
  },
  {
    quote:
      "FairBasket's technology is a game-changer. It's amazing to see how they connect farmers directly with consumers, cutting out the middlemen.",
    name: "Emily Davis",
    title: "Sustainability Advocate",
    avatar: "https://i.pinimg.com/736x/d1/78/72/d17872ea78786123380ce9fa66b7c413.jpg",
    rating: 5,
  },
  {
    quote:
      "I've never experienced such fast and reliable grocery delivery. FairBasket has made my life so much easier!",
    name: "David Brown",
    title: "Busy Professional",
    avatar: "https://i.pinimg.com/736x/d1/78/72/d17872ea78786123380ce9fa66b7c413.jpg",
    rating: 4,
  },
  {
    quote:
      "The quality of the produce is outstanding, and the prices are unbeatable. FairBasket is my go-to for all my grocery needs.",
    name: "Linda Wilson",
    title: "Health-Conscious Shopper",
    avatar: "https://i.pinimg.com/736x/d1/78/72/d17872ea78786123380ce9fa66b7c413.jpg",
    rating: 5,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Bento />

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-background relative overflow-hidden px-4 sm:px-8 lg:px-32">
        {/* Container */}
        <div className="container mx-auto relative">
          {/* Section Title */}
          <div className="flex flex-col items-center text-center mb-12 md:mb-20">
            <span className="mb-3 px-4 py-1 text-sm bg-background border border-border rounded-full">
              Why Choose Us
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Why Choose FairBasket?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              We’re revolutionizing the grocery supply chain with technology
              that benefits everyone.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {/* Feature 1: Easy Ordering */}
            <div className="flex flex-col items-center space-y-6 md:flex-row md:space-y-0 md:space-x-8">
              <div className="space-y-4 flex-1 order-2 md:order-1">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-8 h-8 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="text-3xl font-semibold text-primary pb-2">
                      Easy Ordering
                    </h3>
                    <p className="text-muted-foreground text-lg">
                      No more hassle—scan products with your phone and add them
                      instantly to your cart. Our smart search helps you find
                      what you need in seconds.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex justify-center order-1 md:order-2">
                <Lottie
                  loop
                  animationData={HeroAnimation}
                  play
                  className="w-full max-w-md"
                />
              </div>
            </div>

            {/* Feature 2: Direct from Farmers */}
            <div className="flex flex-col items-center space-y-6 md:flex-row-reverse md:space-y-0 md:space-x-8">
              <div className="space-y-4 flex-1 order-2 md:order-1">
                <div className="flex items-start space-x-4">
                  <Users className="w-8 h-8 text-secondary flex-shrink-0" />
                  <div>
                    <h3 className="text-3xl font-semibold text-secondary pb-2">
                      Direct from Farmers
                    </h3>
                    <p className="text-muted-foreground text-lg">
                      Fresh, organic, and straight from the farm—no middlemen,
                      just quality produce at better prices for both farmers and
                      customers.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex justify-center order-1 md:order-2">
                <Lottie
                  loop
                  animationData={FarmersAnimation}
                  play
                  className="w-full max-w-md"
                />
              </div>
            </div>

            {/* Feature 3: Efficient Delivery */}
            <div className="flex flex-col items-center space-y-6 md:flex-row md:space-y-0 md:space-x-8">
              <div className="space-y-4 flex-1 order-2 md:order-1">
                <div className="flex items-start space-x-4">
                  <Truck className="w-8 h-8 text-accent flex-shrink-0" />
                  <div>
                    <h3 className="text-3xl font-semibold text-accent pb-2">
                      Efficient Delivery
                    </h3>
                    <p className="text-muted-foreground text-lg">
                      Our logistics system ensures quick and reliable
                      deliveries, whether from farmers to retailers or from
                      retailers to customers.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex justify-center order-1 md:order-2">
                <Lottie
                  loop
                  animationData={DeliveryAnimation}
                  play
                  className="w-full max-w-md"
                />
              </div>
            </div>

            {/* Feature 4: Save More Money */}
            <div className="flex flex-col items-center space-y-6 md:flex-row-reverse md:space-y-0 md:space-x-8">
              <div className="space-y-4 flex-1 order-2 md:order-1">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-8 h-8 text-green-500 flex-shrink-0" />
                  <div>
                    <h3 className="text-3xl font-semibold text-green-500 pb-2">
                      Save More Money
                    </h3>
                    <p className="text-muted-foreground text-lg">
                      Get exclusive discounts, bulk purchase benefits, and zero
                      middleman charges. Buy smart, save more with FairBasket.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex justify-center order-1 md:order-2">
                <Lottie
                  loop
                  animationData={SavingsAnimation}
                  play
                  className="w-full max-w-md"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-foreground mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary text-primary-foreground rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 animate-float1">
                <span className="text-3xl">1</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">Scan</h3>
              <p className="text-muted-foreground">
                Scan any product to find it in our marketplace.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-secondary text-secondary-foreground rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 animate-float2">
                <span className="text-3xl">2</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">Order</h3>
              <p className="text-muted-foreground">
                Place your order with ease.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-accent text-accent-foreground rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 animate-float3">
                <span className="text-3xl">3</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">Deliver</h3>
              <p className="text-muted-foreground">
                Our riders will deliver your order quickly.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-primary-foreground rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 animate-float4">
                <span className="text-3xl">4</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">Enjoy</h3>
              <p className="text-muted-foreground">
                Enjoy fresh groceries delivered to your doorstep.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <div className="flex flex-col items-center py-16">
        <Badge
          variant="outline"
          className="mb-4 px-4 py-1 text-sm bg-background"
        >
          Testimonials
        </Badge>
        <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-4">
          What Our Customers Say
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl">
          Don’t just take our word for it - hear from the people who use
          FAIRBASKET every day.
        </p>
      </div>
      <div className="h-full rounded-md flex flex-col antialiased bg-background dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="fast"
          className="bg-background"
          itemClassName="bg-card border border-border p-6 rounded-lg shadow-sm"
          quoteClassName="text-foreground text-lg"
          nameClassName="text-primary font-semibold mt-4"
          titleClassName="text-muted-foreground text-sm"
        />
      </div>

      {/* Call to Action Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-background opacity-70"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto bg-card rounded-2xl p-12 shadow-xl border border-border relative overflow-hidden">
            <div className="relative">
              <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-4">
                Join FairBasket Today
              </h2>
              <p className="text-muted-foreground text-center mb-8 text-lg">
                Experience the future of grocery shopping and be part of a
                sustainable ecosystem.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary-hover px-8 py-6 text-lg group rounded-full"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary bg-secondary hover:bg-secondary-hover px-8 py-6 text-lg rounded-full"
                >
                  Learn More
                </Button>
              </div>
              <div className="mt-8 flex items-center justify-center gap-4">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">1,000+</span>{" "}
                  people joined last month
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;