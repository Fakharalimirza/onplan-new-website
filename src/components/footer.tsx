import Link from 'next/link';
import { Building2, Twitter, Facebook, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Building2 className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold font-headline">OnPlan</span>
            </Link>
            <p className="text-sm text-muted-foreground">Your trusted partner in finding the perfect property.</p>
          </div>
          <div>
            <h3 className="font-semibold uppercase text-foreground">Navigation</h3>
            <div className="mt-4 flex flex-col space-y-2">
              <Link href="/properties" className="text-sm text-muted-foreground hover:text-primary">Properties</Link>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">About Us</Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact</Link>
              <Link href="/favorites" className="text-sm text-muted-foreground hover:text-primary">Favorites</Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold uppercase text-foreground">Legal</h3>
            <div className="mt-4 flex flex-col space-y-2">
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold uppercase text-foreground">Follow Us</h3>
            <div className="mt-4 flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} OnPlan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
