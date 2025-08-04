export type Property = {
  id: number;
  title: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  type: 'House' | 'Apartment' | 'Condo';
  status: 'For Sale' | 'For Rent';
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  images: string[];
  description: string;
  amenities: string[];
  featured?: boolean;
  virtualTourUrl?: string;
};

export const properties: Property[] = [
  {
    id: 1,
    title: 'Luxury Villa with Ocean View',
    price: 2500000,
    bedrooms: 5,
    bathrooms: 6,
    sqft: 5500,
    type: 'House',
    status: 'For Sale',
    address: {
      street: '123 Ocean Drive',
      city: 'Malibu',
      state: 'CA',
      zip: '90265',
    },
    images: [
      'https://placehold.co/800x600/FBC700/FFF?text=Villa',
      'https://placehold.co/800x600/74B7FF/FFF?text=Living+Room',
      'https://placehold.co/800x600/FAFAFA/333?text=Pool',
    ],
    description: 'Breathtaking modern villa with panoramic ocean views. Features an infinity pool, home theater, and a gourmet kitchen. Experience coastal living at its finest.',
    amenities: ['Swimming Pool', 'Ocean View', 'Home Theater', 'Garage', 'Gym', 'Gourmet Kitchen'],
    featured: true,
    virtualTourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    id: 2,
    title: 'Modern Downtown Loft',
    price: 850000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1800,
    type: 'Apartment',
    status: 'For Sale',
    address: {
      street: '456 Urban St, Apt 12B',
      city: 'Metropolis',
      state: 'NY',
      zip: '10001',
    },
    images: [
      'https://placehold.co/800x600/74B7FF/FFF?text=Loft',
      'https://placehold.co/800x600/FBC700/FFF?text=Interior',
      'https://placehold.co/800x600/FAFAFA/333?text=View',
    ],
    description: 'A chic and stylish loft in the heart of the city. Open-concept living space with high ceilings, exposed brick, and stunning city views.',
    amenities: ['City View', 'Concierge', 'Fitness Center', 'Rooftop Deck', 'Exposed Brick'],
    featured: true,
  },
  {
    id: 3,
    title: 'Cozy Suburban Family Home',
    price: 650000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2800,
    type: 'House',
    status: 'For Sale',
    address: {
      street: '789 Maple Avenue',
      city: 'Springfield',
      state: 'IL',
      zip: '62704',
    },
    images: [
      'https://placehold.co/800x600/FAFAFA/333?text=Home',
      'https://placehold.co/800x600/FBC700/FFF?text=Kitchen',
      'https://placehold.co/800x600/74B7FF/FFF?text=Backyard',
    ],
    description: 'Perfect family home in a quiet, friendly neighborhood. Features a large backyard, modern kitchen, and a two-car garage. Close to top-rated schools.',
    amenities: ['Backyard', 'Garage', 'Modern Kitchen', 'Fireplace', 'Hardwood Floors'],
  },
  {
    id: 4,
    title: 'Sleek High-Rise Condo',
    price: 1200000,
    bedrooms: 3,
    bathrooms: 3,
    sqft: 2200,
    type: 'Condo',
    status: 'For Sale',
    address: {
      street: '101 Skyview Path, Unit 3401',
      city: 'Chicago',
      state: 'IL',
      zip: '60611',
    },
    images: [
      'https://placehold.co/800x600/FBC700/FFF?text=Condo',
      'https://placehold.co/800x600/74B7FF/FFF?text=Bedroom',
    ],
    description: 'Live above it all in this stunning high-rise condo. Floor-to-ceiling windows offer incredible lake and city views. Building includes a pool, gym, and 24/7 doorman.',
    amenities: ['Lake View', 'City View', 'Swimming Pool', 'Fitness Center', 'Concierge'],
    featured: true,
  },
  {
    id: 5,
    title: 'Charming Studio Apartment for Rent',
    price: 2800,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 600,
    type: 'Apartment',
    status: 'For Rent',
    address: {
      street: '234 Artist Walk',
      city: 'Greenwich Village',
      state: 'NY',
      zip: '10014',
    },
    images: [
        'https://placehold.co/800x600/74B7FF/FFF?text=Studio',
        'https://placehold.co/800x600/FBC700/FFF?text=Living+Area',
    ],
    description: 'A charming and well-lit studio apartment in a historic neighborhood. Perfect for a single professional or student. Hardwood floors and updated kitchenette.',
    amenities: ['Hardwood Floors', 'Updated Kitchenette', 'Natural Light'],
  },
  {
    id: 6,
    title: 'Spacious Apartment with Balcony',
    price: 4500,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1500,
    type: 'Apartment',
    status: 'For Rent',
    address: {
      street: '567 Grand Plaza',
      city: 'San Francisco',
      state: 'CA',
      zip: '94102',
    },
    images: [
      'https://placehold.co/800x600/FAFAFA/333?text=Apartment',
      'https://placehold.co/800x600/FBC700/FFF?text=Balcony',
    ],
    description: 'A bright and spacious 3-bedroom apartment with a private balcony offering city views. Modern amenities and in-unit laundry.',
    amenities: ['Balcony', 'City View', 'In-Unit Laundry', 'Parking'],
  },
];
