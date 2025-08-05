import Image from 'next/image';
import Link from 'next/link';
import { properties } from '@/data/properties';
import PropertyCard from '@/components/property-card';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { TestimonialCard } from '@/components/testimonial-card';
import { AreaGuideCard } from '@/components/area-guide-card';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Autoplay from 'embla-carousel-autoplay';

const strapiBaseUrl = 'https://cms.authenticholidayhomes.ae';

const featuredProperties = properties.filter(p => p.featured).slice(0, 3);

const testimonials = [
  { name: 'Alice Johnson', title: 'First-time Home Buyer', quote: 'OnPlan made our dream a reality. The team was supportive and professional throughout the entire process. We couldn\'t be happier!', avatar: 'https://placehold.co/100x100', rating: 5 },
  { name: 'Mark Smith', title: 'Investor', quote: 'An exceptional experience from start to finish. Their market knowledge and negotiation skills are top-notch. Highly recommended for any real estate needs.', avatar: 'https://placehold.co/100x100', rating: 5 },
  { name: 'Sophia Rodriguez', title: 'Renter', quote: 'Finding a rental in this market was tough, but OnPlan found us the perfect apartment within our budget. The process was surprisingly smooth.', avatar: 'https://placehold.co/100x100', rating: 5 },
];

const areaGuides = [
    { name: 'Downtown Metropolis', description: 'Vibrant city life with endless amenities.', imageUrl: 'https://placehold.co/400x500/FBC700/FFF?text=Downtown', link: '/properties' },
    { name: 'Coastal Malibu', description: 'Luxurious living with breathtaking ocean views.', imageUrl: 'https://placehold.co/400x500/74B7FF/FFF?text=Malibu', link: '/properties' },
    { name: 'Suburban Springfield', description: 'Quiet, family-friendly neighborhoods.', imageUrl: 'https://placehold.co/400x500/FAFAFA/333?text=Suburbia', link: '/properties' },
]

async function fetchHeroData() {
  try {
    const res = await fetch(`${strapiBaseUrl}/api/homepage?populate=*`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }
    const response = await res.json();
    const attributes = response?.data?.attributes;

    const getUrl = (media: any) => {
        if (!media?.data?.attributes?.url) return null;
        return `${strapiBaseUrl}${media.data.attributes.url}`;
    };
    
    const getUrls = (media: any) => {
        if (!media?.data) return [];
        return media.data.map((img: any) => `${strapiBaseUrl}${img?.attributes?.url}`);
    };

    return {
      desktopImages: getUrls(attributes?.hero_desktop_image),
      desktopVideo: getUrl(attributes?.hero_desktop_video),
    };
  } catch (error) {
    console.error("Hero section fetch failed:", error);
    return {
      desktopImages: ['https://placehold.co/1920x1080/000000/FFF?text=Modern+Architecture'],
      desktopVideo: null,
    };
  }
}

export default async function Home() {
  const hero = await fetchHeroData();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden text-white">
        {/* Background content */}
        {hero.desktopVideo ? (
          <video
            src={hero.desktopVideo}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        ) : (
          <Carousel
            className="absolute inset-0 w-full h-full z-0"
            plugins={[Autoplay({ delay: 5000, stopOnInteraction: false })]}
            opts={{ loop: true }}
          >
            <CarouselContent className="h-full">
              {(hero.desktopImages.length > 0 ? hero.desktopImages : ['https://placehold.co/1920x1080/000000/FFF?text=Modern+Architecture']).map((url, i) => (
                <CarouselItem key={i} className="relative h-full">
                  <Image
                    src={url}
                    alt={`Hero image ${i + 1}`}
                    fill
                    className="object-cover"
                    priority={i === 0}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 z-10" />

        {/* Centered content */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold leading-tight drop-shadow-lg">
            Find Your <span className="text-primary">Perfect</span> Home
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-neutral-200 drop-shadow-md">
            Discover a curated selection of the finest properties. Your next chapter starts here.
          </p>
          <div className="mt-8 w-full max-w-2xl">
            <div className="relative">
              <Input
                placeholder="Search by City, Address, or Zip..."
                className="h-14 pl-12 pr-32 text-base bg-white/90 text-foreground"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
              <Button size="lg" className="absolute right-2 top-1/2 -translate-y-1/2">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-16 lg:py-24 bg-secondary">
        <div className="container">
          <h2 className="text-center font-headline text-3xl md:text-4xl font-bold">Featured Properties</h2>
          <p className="mt-2 text-center text-lg text-muted-foreground max-w-2xl mx-auto">Handpicked listings that represent the best in quality and value.</p>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredProperties.map(prop => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild size="lg" variant="outline">
              <Link href="/properties">View All Properties</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container">
          <h2 className="text-center font-headline text-3xl md:text-4xl font-bold">What Our Clients Say</h2>
          <p className="mt-2 text-center text-lg text-muted-foreground max-w-2xl mx-auto">We are proud of the relationships we build and the results we deliver.</p>
          <div className="mt-12">
            <Carousel opts={{ loop: true, align: 'start' }} className="w-full">
              <CarouselContent className="-ml-4">
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <div className="p-1 h-full">
                      <TestimonialCard testimonial={testimonial} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="ml-14" />
              <CarouselNext className="mr-14" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* Area Guides Section */}
      <section className="py-16 lg:py-24 bg-secondary">
        <div className="container">
          <h2 className="text-center font-headline text-3xl md:text-4xl font-bold">Explore Our Areas</h2>
          <p className="mt-2 text-center text-lg text-muted-foreground max-w-2xl mx-auto">Get to know the neighborhoods we serve, from bustling city centers to serene suburbs.</p>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {areaGuides.map((guide, index) => (
              <AreaGuideCard key={index} guide={guide} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
