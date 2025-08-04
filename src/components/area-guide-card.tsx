import Link from "next/link"
import Image from "next/image"
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

type AreaGuide = {
  name: string
  description: string
  imageUrl: string
  link: string
}

export function AreaGuideCard({ guide }: { guide: AreaGuide }) {
  return (
    <Link href={guide.link} className="group relative block overflow-hidden rounded-lg shadow-lg">
      <Image
        src={guide.imageUrl}
        alt={guide.name}
        width={400}
        height={500}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        data-ai-hint="city neighborhood"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-6 text-white">
        <h3 className="font-headline text-2xl font-bold">{guide.name}</h3>
        <p className="mt-2 text-sm opacity-90">{guide.description}</p>
        <Button variant="secondary" size="sm" className="mt-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white">
          Explore
          <MapPin className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </Link>
  )
}
