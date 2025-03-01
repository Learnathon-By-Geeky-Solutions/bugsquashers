import Hero from "./components/Hero";
import Bento from "./components/Bento";
import Footer from "./components/Footer";
import { motion } from "framer-motion";
import {
  Card,
} from "../../components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../../components/ui/accordion";
import { Button } from "../../components/ui/button";

// Animation configuration
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

// Product data
const products = [
  {
    id: "apples",
    name: "Organic Apples",
    description: "Freshly picked organic apples from local farms.",
    image: "./Bento1.jpg",
  },
  {
    id: "milk",
    name: "Farm Fresh Milk",
    description: "Pure and fresh milk directly from dairy farms.",
    image: "./Bento2.jpg",
  },
  {
    id: "honey",
    name: "Natural Honey",
    description: "Raw and unfiltered honey from trusted beekeepers.",
    image: "./Bento3.jpg",
  },
  {
    id: "vegetables",
    name: "Organic Vegetables",
    description: "Healthy and chemical-free vegetables.",
    image: "./Bento4.jpg",
  },
];

// Features data
const features = [
  { id: "fast-delivery", title: "Fast Delivery", description: "We ensure top-notch service." },
  { id: "best-prices", title: "Best Prices", description: "Get competitive and fair pricing." },
  { id: "organic", title: "100% Organic", description: "Fresh and chemical-free products." },
];

// FAQ data
const faqs = [
  {
    id: "fairbasket",
    question: "What is FairBasket?",
    answer: "FairBasket is a marketplace connecting farmers and retailers directly.",
  },
  {
    id: "pricing",
    question: "How does pricing work?",
    answer: "We ensure transparent and competitive pricing by eliminating middlemen.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Bento />

      {/* Product Suggestions Section */}
      <section className="py-16 px-6 lg:px-32">
        <motion.h2 {...fadeIn} className="text-3xl font-bold text-center mb-8 text-foreground">
          Recommended Products
        </motion.h2>
        <motion.div {...fadeIn} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="p-6 hover:shadow-lg transition-shadow">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-semibold text-foreground">{product.name}</h3>
              <p className="text-sm text-muted-foreground mt-2">{product.description}</p>
              <Button className="mt-4 w-full bg-primary hover:bg-accent">Buy Now</Button>
            </Card>
          ))}
        </motion.div>
      </section>

      

      {/* FAQ Section */}
      <section className="my-16 mx-6 lg:mx-32 border-2 rounded-md">
        <motion.h2 {...fadeIn} className="text-3xl font-bold text-center pt-10 text-foreground">
          Frequently Asked Questions
        </motion.h2>
        <motion.div {...fadeIn} className="max-w-3xl mx-auto py-20">
          <Accordion type="single" collapsible>
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="text-lg font-semibold">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
