import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { FavoritesProvider } from '@/context/favorites-context';
import PWALifecycle from '@/components/pwa-lifecycle';

export const metadata: Metadata = {
  title: 'OnPlan - Your Real Estate Partner',
  description: 'Find your dream home with OnPlan. Luxury real estate and property listings.',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#FAFAFA',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;500;600&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="font-body antialiased">
        <FavoritesProvider>
          <div className="flex min-h-screen flex-col bg-background">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <Toaster />
          <PWALifecycle />
        </FavoritesProvider>
      </body>
    </html>
  );
}
