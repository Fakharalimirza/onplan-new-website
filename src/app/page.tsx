
import HomeClient from '@/components/home-client';
import { properties } from '@/data/properties';

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
];

async function getHeroData() {
  try {
    const res = await fetch(`${strapiBaseUrl}/api/homepage?populate[Hero][populate]=*`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }
    const response = await res.json();
    const data = response?.data;
    const root = data?.attributes ?? data;
    const hero = Array.isArray(root?.Hero) ? root.Hero[0] : root;

    const getUrl = (media: any) => {
      if (!media) return null;
      const item = Array.isArray(media) ? media[0] : media;
      if (!item) return null;
      if (item.url) return `${strapiBaseUrl}${item.url}`;
      if (item.attributes?.url) return `${strapiBaseUrl}${item.attributes.url}`;
      if (item.data?.attributes?.url) return `${strapiBaseUrl}${item.data.attributes.url}`;
      if (item.data?.url) return `${strapiBaseUrl}${item.data.url}`;
      return null;
    };

    const getUrls = (media: any) => {
      if (!media) return [];
      if (Array.isArray(media)) {
        return media.map(item => getUrl(item)).filter(Boolean);
      }
      if (Array.isArray(media.data)) {
        return media.data.map((img: any) => getUrl(img)).filter(Boolean);
      }
      return [];
    };

    return {
      desktopImages: getUrls(hero?.hero_desktop_image),
      desktopVideo: getUrl(hero?.hero_desktop_video),
    };
  } catch (error) {
    console.error('Hero section fetch failed:', error);
    return {
      desktopImages: ['https://placehold.co/1920x1080/000000/FFF?text=Modern+Architecture'],
      desktopVideo: null,
    };
  }
}

export default async function Home() {
  const heroData = await getHeroData();

  return (
    <HomeClient
      heroData={heroData}
      featuredProperties={featuredProperties}
      testimonials={testimonials}
      areaGuides={areaGuides}
    />
  );
}
