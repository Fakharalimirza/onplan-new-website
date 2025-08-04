'use client';

import type { Property } from '@/data/properties';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, BedDouble, Bath, SquareGanttChart, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useFavorites } from '@/context/favorites-context';
import { cn } from '@/lib/utils';

interface PropertyCardProps {
  property: Property;
  view?: 'grid' | 'list';
}

export default function PropertyCard({ property, view = 'grid' }: PropertyCardProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorite = isFavorite(property.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (favorite) {
      removeFavorite(property.id);
    } else {
      addFavorite(property.id);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };
  
  const content = (
    <Card className={cn("overflow-hidden transition-all duration-300 hover:shadow-xl", view === 'list' ? 'flex flex-col md:flex-row' : '')}>
      <div className={cn("relative", view === 'list' ? 'md:w-1/3' : 'w-full')}>
        <Badge
          className="absolute top-3 left-3 z-10"
          variant={property.status === 'For Sale' ? 'default' : 'secondary'}
        >
          {property.status}
        </Badge>
        <Button
          size="icon"
          className={cn(
            'absolute top-3 right-3 z-10 rounded-full h-9 w-9 transition-colors',
            favorite ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-white/80 text-foreground hover:bg-white'
          )}
          onClick={handleFavoriteClick}
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className={cn('h-5 w-5', favorite && 'fill-current')} />
        </Button>
        <Image
          src={property.images[0]}
          alt={property.title}
          width={400}
          height={300}
          className={cn("object-cover w-full transition-transform duration-300 group-hover:scale-105", view === 'grid' ? 'aspect-[4/3]' : 'aspect-video md:aspect-[4/3]')}
          data-ai-hint="house exterior"
        />
      </div>
      <CardContent className={cn("p-4 flex flex-col flex-grow", view === 'list' ? 'md:w-2/3' : '')}>
        <div className="flex-grow">
          <p className="font-headline text-2xl font-bold text-primary">
            {formatPrice(property.price)}
            {property.status === 'For Rent' && <span className="text-sm font-normal text-muted-foreground">/month</span>}
          </p>
          <h3 className="mt-1 font-headline text-xl font-semibold leading-tight truncate">{property.title}</h3>
          <div className="mt-2 flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-1.5 h-4 w-4 flex-shrink-0" />
            <span className="truncate">{property.address.street}, {property.address.city}</span>
          </div>
        </div>
        <div className={cn("mt-4 flex items-center justify-between border-t pt-4 text-sm text-muted-foreground", view === 'list' && 'md:flex-wrap md:gap-y-2')}>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <BedDouble className="h-4 w-4 text-primary" />
              {property.bedrooms} beds
            </span>
            <span className="flex items-center gap-1.5">
              <Bath className="h-4 w-4 text-primary" />
              {property.bathrooms} baths
            </span>
            <span className="flex items-center gap-1.5">
              <SquareGanttChart className="h-4 w-4 text-primary" />
              {property.sqft.toLocaleString()} sqft
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Link href={`/properties/${property.id}`} className="group block">
      {content}
    </Link>
  );
}
