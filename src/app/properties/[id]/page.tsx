import { properties } from '@/data/properties';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import ContactForm from '@/components/contact-form';
import { BedDouble, Bath, SquareGanttChart, MapPin, CheckCircle2 } from 'lucide-react';

type Props = {
  params: { id: string };
};

export async function generateStaticParams() {
  return properties.map(property => ({
    id: property.id.toString(),
  }));
}

export default function PropertyDetailPage({ params }: Props) {
  const property = properties.find(p => p.id.toString() === params.id);

  if (!property) {
    notFound();
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-secondary">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <Carousel className="w-full">
                  <CarouselContent>
                    {property.images.map((src, index) => (
                      <CarouselItem key={index}>
                        <div className="aspect-w-16 aspect-h-9">
                          <Image
                            src={src}
                            alt={`${property.title} - Image ${index + 1}`}
                            width={1200}
                            height={675}
                            className="object-cover w-full h-full"
                            priority={index === 0}
                            data-ai-hint="house interior"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-4" />
                  <CarouselNext className="right-4" />
                </Carousel>
              </CardContent>
            </Card>

            <Card className="mt-8">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="font-headline text-3xl md:text-4xl font-bold">{property.title}</h1>
                    <div className="mt-2 flex items-center text-muted-foreground">
                      <MapPin className="mr-2 h-5 w-5" />
                      <span>{property.address.street}, {property.address.city}, {property.address.state} {property.address.zip}</span>
                    </div>
                  </div>
                  <Badge variant={property.status === 'For Sale' ? 'default' : 'secondary'} className="text-lg">
                    {property.status}
                  </Badge>
                </div>
                <Separator className="my-4" />
                <div className="flex items-center space-x-6 text-lg">
                  <span className="flex items-center gap-2"><BedDouble className="h-6 w-6 text-primary" /> {property.bedrooms} Beds</span>
                  <span className="flex items-center gap-2"><Bath className="h-6 w-6 text-primary" /> {property.bathrooms} Baths</span>
                  <span className="flex items-center gap-2"><SquareGanttChart className="h-6 w-6 text-primary" /> {property.sqft.toLocaleString()} sqft</span>
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="font-headline text-2xl font-semibold mb-4">Description</h3>
                <p className="text-muted-foreground leading-relaxed">{property.description}</p>
                
                <Separator className="my-6" />

                <h3 className="font-headline text-2xl font-semibold mb-4">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.map(amenity => (
                    <div key={amenity} className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-muted-foreground">{amenity}</span>
                    </div>
                  ))}
                </div>

                {property.virtualTourUrl && (
                  <>
                    <Separator className="my-6" />
                    <h3 className="font-headline text-2xl font-semibold mb-4">Virtual Tour</h3>
                    <div className="aspect-w-16 aspect-h-9">
                      <iframe
                        className="w-full h-full rounded-lg"
                        src={property.virtualTourUrl}
                        title="Virtual Tour"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center text-2xl">
                    <span className="font-headline text-primary font-bold text-4xl">{formatPrice(property.price)}</span>
                    {property.status === 'For Rent' && <span className="text-lg font-normal text-muted-foreground">/month</span>}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <h4 className="text-lg font-semibold text-center mb-4">Interested in this property?</h4>
                  <ContactForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
