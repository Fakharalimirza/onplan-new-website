'use client';

import { useFavorites } from '@/context/favorites-context';
import { properties } from '@/data/properties';
import PropertyCard from '@/components/property-card';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const favoriteProperties = properties.filter(p => favorites.includes(p.id));

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Your Favorite Properties</h1>
        <p className="mt-2 text-lg text-muted-foreground">A collection of properties you've saved.</p>
      </div>

      {favoriteProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favoriteProperties.map(prop => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 border-2 border-dashed rounded-lg">
          <Heart className="mx-auto h-16 w-16 text-muted-foreground/50" />
          <h2 className="mt-6 text-2xl font-semibold">No Favorites Yet</h2>
          <p className="mt-2 text-muted-foreground">Start exploring and save the properties you love!</p>
          <Button asChild className="mt-6">
            <Link href="/properties">Browse Properties</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
