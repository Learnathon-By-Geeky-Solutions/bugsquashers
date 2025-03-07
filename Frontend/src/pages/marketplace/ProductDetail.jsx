import React, { useState } from "react"
import { ChevronLeft, ChevronRight, Star, ThumbsUp, MessageSquare, ShoppingCart } from 'lucide-react'

// Import shadcn components with correct paths for Vite
// Note: You'll need to set up shadcn with Vite first
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardFooter } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Badge } from "../../components/ui/badge"
import { Progress } from "../../components/ui/progress"

// Product Review Component
const ProductReview = ({ review }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarFallback>{review.authorInitials}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{review.author}</div>
              <div className="text-xs text-muted-foreground">{review.date}</div>
            </div>
          </div>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-4 w-4 ${i < review.rating ? "fill-primary text-primary" : "fill-muted stroke-muted-foreground"}`} 
              />
            ))}
          </div>
        </div>
        <h3 className="font-semibold mb-2">{review.title}</h3>
        <p className="text-muted-foreground text-sm">{review.content}</p>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <ThumbsUp className="h-4 w-4" />
          <span>{review.helpfulCount} people found this helpful</span>
        </div>
        <Button variant="ghost" size="sm" onClick={() => alert(`Reply to ${review.author}`)}>
          <MessageSquare className="h-4 w-4 mr-1" />
          Reply
        </Button>
      </CardFooter>
    </Card>
  );
};

// Suggested Product Card Component
const ProductCard = ({ product }) => {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-square">
        <img 
          src={product.image || "/placeholder.svg"} 
          alt={product.name} 
          className="object-cover w-full h-full"
        />
        {product.badge && (
          <Badge className={`absolute top-2 left-2 ${product.badge === 'Sale' ? 'bg-red-500' : 'bg-primary'}`}>
            {product.badge}
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium">{product.name}</h3>
        <div className="flex justify-between items-center mt-1">
          <div className="font-bold">
            {product.salePrice ? (
              <>
                <span className="text-red-500">${product.salePrice}</span>
                <span className="text-muted-foreground text-xs line-through ml-1">${product.price}</span>
              </>
            ) : (
              <>${product.price}</>
            )}
          </div>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-3 w-3 ${i < product.rating ? "fill-primary text-primary" : "fill-muted stroke-muted-foreground"}`} 
              />
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full bg-primary"
          onClick={() => alert(`Added ${product.name} to cart`)}
        >
          <ShoppingCart className="h-3 w-3 mr-1" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

// Main Product Detail Component
const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState("red");
  
  // Sample data
  const reviews = [
    {
      author: "John Doe",
      authorInitials: "JD",
      date: "March 2, 2024",
      rating: 5,
      title: "Delicious and fresh!",
      content: "These apples are amazing! So crisp and juicy. I've been buying them weekly for my family and they're always perfect. Highly recommend for anyone looking for quality organic produce.",
      helpfulCount: 12
    },
    {
      author: "Sarah Miller",
      authorInitials: "SM",
      date: "February 15, 2024",
      rating: 4,
      title: "Great quality, but a bit pricey",
      content: "The apples are definitely high quality and taste great. My only complaint is that they're a bit more expensive than other organic options at my local market. Still, the convenience of delivery makes up for it.",
      helpfulCount: 8
    }
  ];
  
  const suggestedProducts = [
    {
      name: "Organic Oranges",
      price: "4.00",
      image: "https://placehold.co/300x300?text=Oranges",
      rating: 4,
      badge: "New"
    },
    {
      name: "Organic Bananas",
      price: "2.50",
      image: "https://placehold.co/300x300?text=Bananas",
      rating: 5
    },
    {
      name: "Organic Strawberries",
      price: "5.99",
      salePrice: "3.99",
      image: "https://placehold.co/300x300?text=Strawberries",
      rating: 4,
      badge: "Sale"
    },
    {
      name: "Organic Blueberries",
      price: "4.50",
      image: "https://placehold.co/300x300?text=Blueberries",
      rating: 5
    }
  ];
  
  const handleAddToCart = () => {
    alert(`Added ${quantity} ${selectedVariant} apple(s) to cart`);
  };
  
  const handleBuyNow = () => {
    alert(`Proceeding to checkout with ${quantity} ${selectedVariant} apple(s)`);
  };
  
  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value) || 1);
  };
  
  const handleVariantChange = (value) => {
    setSelectedVariant(value);
  };
  
  const handleWriteReview = () => {
    alert("Opening review form");
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-sm mb-4">
        <a href="#" className="hover:underline">Shop all</a>
        <span>&gt;</span>
        <a href="#" className="hover:underline">Groceries</a>
        <span>&gt;</span>
        <span>Organic Apples</span>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative">
          <Card className="overflow-hidden">
            <div className="relative aspect-square">
              <img 
                src="https://placehold.co/600x600?text=Organic+Apples" 
                alt="Organic Apples" 
                className="object-cover w-full h-full"
              />
              <Button 
                variant="outline" 
                size="icon" 
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-secondary h-8 w-8"
                onClick={() => alert("Previous image")}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-secondary h-8 w-8"
                onClick={() => alert("Next image")}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </Card>
          <div className="flex justify-center gap-1 mt-4">
            {[0, 1, 2, 3].map((i) => (
              <div 
                key={i} 
                className={`h-2 w-2 rounded-full ${i === 0 ? 'bg-primary' : 'bg-gray-300'}`}
                onClick={() => alert(`Navigate to image ${i+1}`)}
                style={{ cursor: 'pointer' }}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Organic Apples</h1>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${i < 4 ? "fill-primary text-primary" : "fill-muted stroke-muted-foreground"}`} 
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">(4.5 stars) • 20 reviews</span>
            </div>
            <div className="text-2xl font-bold mt-2">$3</div>
          </div>

          <p className="text-muted-foreground">
            Enjoy the crisp, refreshing taste of our organic apples, sourced from local
            farms. Perfect for snacking or adding to your favorite recipes.
          </p>

          <ul className="space-y-1 list-disc pl-5">
            <li>Fresh and delicious choice</li>
            <li>Packed with nutrients</li>
            <li>Perfect for healthy snacks</li>
          </ul>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Variant:</label>
              <Select onValueChange={handleVariantChange} defaultValue={selectedVariant}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="red">Red Apples</SelectItem>
                  <SelectItem value="green">Green Apples</SelectItem>
                  <SelectItem value="yellow">Yellow Apples</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Variant:</label>
              <Tabs 
                defaultValue={selectedVariant} 
                className="w-full"
                onValueChange={handleVariantChange}
              >
                <TabsList className="grid grid-cols-3 h-auto">
                  <TabsTrigger value="red" className="py-2">Red Apples</TabsTrigger>
                  <TabsTrigger value="green" className="py-2">Green Apples</TabsTrigger>
                  <TabsTrigger value="yellow" className="py-2">Yellow Apples</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Quantity:</label>
              <Input 
                type="number" 
                value={quantity} 
                onChange={handleQuantityChange} 
                min="1" 
                className="w-20" 
              />
            </div>

            <div className="flex flex-col gap-2">
              <Button 
                className="w-full bg-primary text-white hover:bg-primary-hover"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to cart
              </Button>
              <Button 
                variant="outline" 
                className="w-full bg-secondary hover:bg-secondary-hover"
                onClick={handleBuyNow}
              >
                Buy now
              </Button>
              <p className="text-xs text-center text-muted-foreground">Free shipping over $10</p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-12 space-y-8">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
            <TabsTrigger value="returns">Returns</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="mt-4">
            <p className="text-muted-foreground">
              Our organic apples are grown without pesticides, ensuring a pure taste.
              Each apple is handpicked to guarantee quality and freshness. Enjoy them in
              salads, desserts, or on their own!
            </p>
          </TabsContent>
          <TabsContent value="shipping" className="mt-4">
            <p className="text-muted-foreground">
              We ship all orders within 2-3 business days. Choose from standard or
              expedited shipping options at checkout. Enjoy fast and reliable delivery
              right to your door.
            </p>
          </TabsContent>
          <TabsContent value="returns" className="mt-4">
            <p className="text-muted-foreground">
              If you're not satisfied with your purchase, you can return it within 30 days
              for a full refund. Simply contact our customer service for assistance. Your
              satisfaction is our priority!
            </p>
          </TabsContent>
        </Tabs>
      </div>

      {/* Reviews Section */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Review Summary */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="text-4xl font-bold">4.5</div>
              <div className="flex flex-col">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < 4 ? "fill-primary text-primary" : "fill-muted stroke-muted-foreground"}`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">Based on 20 reviews</span>
              </div>
            </div>
            
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-2">
                  <div className="text-sm w-8">{rating} ★</div>
                  <Progress 
                    value={rating === 5 ? 75 : rating === 4 ? 15 : rating === 3 ? 5 : rating === 2 ? 3 : 2} 
                    className="h-2" 
                  />
                  <div className="text-sm text-muted-foreground">
                    {rating === 5 ? '75%' : rating === 4 ? '15%' : rating === 3 ? '5%' : rating === 2 ? '3%' : '2%'}
                  </div>
                </div>
              ))}
            </div>
            
            <Button className="w-full " onClick={handleWriteReview}>Write a Review</Button>
          </div>
          
          {/* Review List */}
          <div className="md:col-span-2 space-y-6">
            {reviews.map((review, index) => (
              <ProductReview key={index} review={review} />
            ))}
            
            <Button 
              variant="outline" 
              className="w-full bg-primary"
              onClick={() => alert("Loading more reviews")}
            >
              Load More Reviews
            </Button>
          </div>
        </div>
      </section>

      {/* Suggested Products */}
      <section className="mt-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">You May Also Like</h2>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full bg-primary"
              onClick={() => alert("Previous products")}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full bg-primary"
              onClick={() => alert("Next products")}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {suggestedProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
