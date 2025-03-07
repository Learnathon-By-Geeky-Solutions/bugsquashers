import { ArrowRight, MessageSquare, Star, ThumbsDown, ThumbsUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { Badge } from "../../../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { Progress } from "../../../components/ui/progress"

export function ReviewsDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Customer Reviews</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ReviewSummaryCard />
        <RatingDistributionCard />
        <ReviewTrendsCard />
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <div className="overflow-x-auto pb-1">
            <TabsList>
              <TabsTrigger value="all">All Reviews</TabsTrigger>
              <TabsTrigger value="positive">Positive</TabsTrigger>
              <TabsTrigger value="negative">Negative</TabsTrigger>
              <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
            </TabsList>
          </div>
          <Button size="sm">Export Reviews</Button>
        </div>

        <TabsContent value="all" className="space-y-4">
          <ReviewsList reviews={allReviews} />
        </TabsContent>

        <TabsContent value="positive" className="space-y-4">
          <ReviewsList reviews={allReviews.filter((review) => review.rating >= 4)} />
        </TabsContent>

        <TabsContent value="negative" className="space-y-4">
          <ReviewsList reviews={allReviews.filter((review) => review.rating <= 2)} />
        </TabsContent>

        <TabsContent value="unanswered" className="space-y-4">
          <ReviewsList reviews={allReviews.filter((review) => !review.replied)} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ReviewSummaryCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Review Summary</CardTitle>
        <CardDescription>Overall customer satisfaction</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center gap-2">
          <div className="text-5xl font-bold">4.7</div>
          <div className="flex flex-col">
            <div className="flex text-yellow-400">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className={`h-5 w-5 ${star <= 4 ? "fill-current" : ""}`} />
              ))}
            </div>
            <div className="text-sm text-muted-foreground">Based on 1,234 reviews</div>
          </div>
        </div>
        <div className="flex justify-between text-sm">
          <div>
            This month: <span className="font-medium">+128 reviews</span>
          </div>
          <div className="text-green-500">+12.5%</div>
        </div>
      </CardContent>
    </Card>
  )
}

function RatingDistributionCard() {
  const ratings = [
    { stars: 5, count: 824, percentage: 67 },
    { stars: 4, count: 256, percentage: 21 },
    { stars: 3, count: 87, percentage: 7 },
    { stars: 2, count: 42, percentage: 3 },
    { stars: 1, count: 25, percentage: 2 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rating Distribution</CardTitle>
        <CardDescription>Breakdown of customer ratings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {ratings.map((rating) => (
          <div key={rating.stars} className="space-y-1">
            <div className="flex justify-between text-sm">
              <div className="flex items-center">
                <span className="mr-2">{rating.stars}</span>
                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
              </div>
              <span>{rating.count}</span>
            </div>
            <Progress value={rating.percentage} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function ReviewTrendsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Review Trends</CardTitle>
        <CardDescription>Monthly review volume</CardDescription>
      </CardHeader>
      <CardContent className="h-[180px] flex items-center justify-center border rounded-md">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <MessageSquare className="h-8 w-8" />
          <p className="text-sm">Review trend chart would appear here</p>
        </div>
      </CardContent>
    </Card>
  )
}

function ReviewsList({ reviews }) {
  return (
    <div className="space-y-4">
      {reviews.map((review, index) => (
        <Card key={index}>
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              <Avatar className="h-10 w-10 hidden sm:block">
                <AvatarImage
                  src={`/placeholder.svg?height=40&width=40&text=${review.customer.initials}`}
                  alt={review.customer.name}
                />
                <AvatarFallback>{review.customer.initials}</AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-3">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                  <div>
                    <div className="font-medium">{review.customer.name}</div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="flex text-yellow-400">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className={`h-3.5 w-3.5 ${star <= review.rating ? "fill-current" : ""}`} />
                        ))}
                      </div>
                      <span>•</span>
                      <span>{review.date}</span>
                    </div>
                  </div>

                  <Badge variant={review.productVerified ? "outline" : "secondary"} className="mt-1 sm:mt-0">
                    {review.productVerified ? "Verified Purchase" : "Unverified"}
                  </Badge>
                </div>

                <div>
                  <div className="font-medium mb-1">{review.title}</div>
                  <p className="text-sm text-muted-foreground">{review.content}</p>
                </div>

                {review.replied && (
                  <div className="bg-muted p-3 rounded-md mt-3">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-8 w-8 hidden sm:block">
                        <AvatarImage src="/placeholder.svg?height=32&width=32&text=SD" alt="Store" />
                        <AvatarFallback>SD</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium">Store Response</div>
                        <p className="text-sm text-muted-foreground">{review.reply}</p>
                        <div className="text-xs text-muted-foreground mt-1">{review.replyDate}</div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-2 sm:gap-4 pt-2">
                  <Button variant="outline" size="sm">
                    <ThumbsUp className="mr-1 h-4 w-4" />
                    <span className="hidden sm:inline">Helpful</span> ({review.helpfulCount})
                  </Button>
                  <Button variant="outline" size="sm">
                    <ThumbsDown className="mr-1 h-4 w-4" />
                    <span className="hidden sm:inline">Not Helpful</span>
                  </Button>
                  {!review.replied && (
                    <Button variant="outline" size="sm" className="ml-auto">
                      Reply
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="flex justify-center">
        <Button variant="outline">
          Load More Reviews
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

// Sample review data
const allReviews = [
  {
    customer: { name: "John Smith", initials: "JS" },
    rating: 5,
    date: "May 15, 2023",
    title: "Excellent product, exceeded expectations!",
    content:
      "I've been using this product for a month now and I'm extremely satisfied with its performance. The battery life is amazing and the design is sleek. Would definitely recommend to anyone looking for a quality product.",
    productVerified: true,
    helpfulCount: 24,
    replied: true,
    reply:
      "Thank you for your kind words, John! We're thrilled to hear that you're enjoying our product. Your satisfaction is our top priority, and we appreciate you taking the time to share your experience.",
    replyDate: "May 16, 2023",
  },
  {
    customer: { name: "Sarah Johnson", initials: "SJ" },
    rating: 4,
    date: "April 28, 2023",
    title: "Great product with minor issues",
    content:
      "Overall, I'm happy with my purchase. The product works as advertised and the quality is good. The only reason I'm giving 4 stars instead of 5 is because the setup was a bit complicated. Once set up though, it works perfectly.",
    productVerified: true,
    helpfulCount: 18,
    replied: false,
  },
  {
    customer: { name: "Michael Brown", initials: "MB" },
    rating: 2,
    date: "May 3, 2023",
    title: "Disappointed with durability",
    content:
      "The product worked great for the first week, but then started having issues. The build quality doesn't seem very durable. I expected better for the price point.",
    productVerified: true,
    helpfulCount: 7,
    replied: true,
    reply:
      "We're sorry to hear about your experience, Michael. This is not the quality we strive for. Please contact our customer service team so we can make this right for you.",
    replyDate: "May 4, 2023",
  },
  {
    customer: { name: "Emily Davis", initials: "ED" },
    rating: 5,
    date: "May 10, 2023",
    title: "Perfect for my needs!",
    content:
      "This product is exactly what I was looking for. Easy to use, great features, and the customer service was excellent when I had a question about one of the functions.",
    productVerified: true,
    helpfulCount: 15,
    replied: false,
  },
  {
    customer: { name: "David Wilson", initials: "DW" },
    rating: 1,
    date: "April 22, 2023",
    title: "Doesn't work as advertised",
    content:
      "I'm very disappointed with this purchase. The product doesn't perform nearly as well as the description claims. Save your money and look elsewhere.",
    productVerified: false,
    helpfulCount: 3,
    replied: true,
    reply:
      "We're sorry to hear you're not satisfied with your purchase. We stand behind our products and would like to understand more about the issues you're experiencing. Please contact our support team so we can help resolve these issues.",
    replyDate: "April 23, 2023",
  },
]

