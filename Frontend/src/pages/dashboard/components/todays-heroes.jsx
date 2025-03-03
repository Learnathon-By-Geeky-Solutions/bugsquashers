import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"

export function TodaysHeroes() {
  const heroes = [
    { id: 1, avatar: "/Hero1.webp?height=40&width=40" },
    { id: 2, avatar: "/Hero1.webp?height=40&width=40" },
    { id: 3, avatar: "/Hero1.webp?height=40&width=40" },
    { id: 4, avatar: "/Hero1.webp?height=40&width=40" },
  ]

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Today's Heroes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          {heroes.map((hero) => (
            <img
              key={hero.id}
              src={hero.avatar || "/placeholder.svg"}
              alt={`Hero ${hero.id}`}
              className="h-10 w-10 rounded-full border-2 border-white"
            />
          ))}
          <Badge variant="outline" className="ml-1 bg-gray-100 text-gray-700">
            +42
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

