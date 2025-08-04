import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

type Testimonial = {
  name: string
  title: string
  quote: string
  avatar: string
  rating: number
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="h-full border-2 border-primary/20 bg-transparent shadow-lg">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-center mb-4">
          <Avatar>
            <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint="person portrait" />
            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-4">
            <p className="font-semibold text-foreground">{testimonial.name}</p>
            <p className="text-sm text-muted-foreground">{testimonial.title}</p>
          </div>
        </div>
        <blockquote className="flex-grow text-foreground/80 italic">
          "{testimonial.quote}"
        </blockquote>
        <div className="flex items-center mt-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${i < testimonial.rating ? 'text-primary fill-current' : 'text-gray-300'}`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
