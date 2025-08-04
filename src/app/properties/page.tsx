'use client';

import { useState, useMemo } from 'react';
import { properties as allProperties } from '@/data/properties';
import PropertyCard from '@/components/property-card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { LayoutGrid, List } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const propertyTypes = ['All', ...Array.from(new Set(allProperties.map(p => p.type)))];
const bedroomOptions = ['Any', '1', '2', '3', '4', '5+'];
const maxPrice = Math.max(...allProperties.map(p => p.price));

export default function PropertiesPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [propertyType, setPropertyType] = useState('All');
  const [bedrooms, setBedrooms] = useState('Any');
  const [priceRange, setPriceRange] = useState([0, maxPrice]);
  const [sortBy, setSortBy] = useState('price-desc');

  const filteredProperties = useMemo(() => {
    return allProperties
      .filter(p => {
        const typeMatch = propertyType === 'All' || p.type === propertyType;
        const bedroomMatch = bedrooms === 'Any' || (bedrooms === '5+' ? p.bedrooms >= 5 : p.bedrooms === parseInt(bedrooms));
        const priceMatch = p.price >= priceRange[0] && p.price <= priceRange[1];
        return typeMatch && bedroomMatch && priceMatch;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'price-asc': return a.price - b.price;
          case 'price-desc': return b.price - a.price;
          case 'beds-desc': return b.bedrooms - a.bedrooms;
          case 'sqft-desc': return b.sqft - a.sqft;
          default: return 0;
        }
      });
  }, [propertyType, bedrooms, priceRange, sortBy]);
  
  const formatPrice = (price: number) => {
    if (price >= 1_000_000) return `$${(price / 1_000_000).toFixed(1)}M`;
    if (price >= 1_000) return `$${(price / 1_000).toFixed(0)}K`;
    return `$${price}`;
  };

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Our Properties</h1>
        <p className="mt-2 text-lg text-muted-foreground">Browse our full collection of exquisite properties.</p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:w-1/4">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Filter & Sort</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Property Type</Label>
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{propertyTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label>Bedrooms</Label>
                <Select value={bedrooms} onValueChange={setBedrooms}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{bedroomOptions.map(option => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="price-range">Price Range</Label>
                 <div className="text-center font-semibold text-primary my-2">
                  {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                </div>
                <Slider
                  id="price-range"
                  min={0}
                  max={maxPrice}
                  step={50000}
                  value={priceRange}
                  onValueChange={(value) => setPriceRange(value as [number, number])}
                  className="w-full"
                />
              </div>
              <div>
                <Label>Sort By</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="beds-desc">Beds: Most First</SelectItem>
                    <SelectItem value="sqft-desc">Sqft: Largest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Listings */}
        <main className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <p className="text-muted-foreground">{filteredProperties.length} results found</p>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={() => setView('grid')} className={cn(view === 'grid' && 'bg-accent')}>
                <LayoutGrid className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setView('list')} className={cn(view === 'list' && 'bg-accent')}>
                <List className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {filteredProperties.length > 0 ? (
             <div className={cn('grid gap-6', view === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1')}>
               {filteredProperties.map(prop => (
                 <PropertyCard key={prop.id} property={prop} view={view} />
               ))}
             </div>
          ) : (
            <div className="text-center py-16 border-2 border-dashed rounded-lg">
              <h3 className="text-xl font-semibold">No Properties Found</h3>
              <p className="text-muted-foreground mt-2">Try adjusting your filters to find what you're looking for.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
