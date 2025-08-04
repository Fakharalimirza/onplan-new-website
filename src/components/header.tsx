'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Building2, Heart, Info, Mail, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import React from 'react';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/properties', label: 'Properties', icon: Building2 },
  { href: '/favorites', label: 'Favorites', icon: Heart },
  { href: '/about', label: 'About', icon: Info },
  { href: '/contact', label: 'Contact', icon: Mail },
];

export default function Header() {
  const pathname = usePathname();

  const renderNavLinks = (isMobile = false) =>
    navItems.map((item) => {
      const isActive = pathname === item.href;
      const LinkContent = () => (
        <>
          <item.icon className="h-5 w-5" />
          <span>{item.label}</span>
        </>
      );

      if (isMobile) {
        return (
          <SheetClose asChild key={item.href}>
            <Link
              href={item.href}
              className={cn(
                'flex items-center gap-4 rounded-lg px-4 py-3 text-lg font-medium transition-colors',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-primary/5 hover:text-primary'
              )}
            >
              <LinkContent />
            </Link>
          </SheetClose>
        );
      }

      return (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'relative px-3 py-2 text-sm font-medium transition-colors hover:text-primary',
            isActive ? 'text-primary' : 'text-foreground/60'
          )}
        >
          {item.label}
          {isActive && (
            <span className="absolute bottom-0 left-1/2 h-0.5 w-1/2 -translate-x-1/2 rounded-full bg-primary"></span>
          )}
        </Link>
      );
    });

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Building2 className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold font-headline text-gray-800">OnPlan</span>
        </Link>
        <nav className="hidden items-center gap-4 md:flex">
          {renderNavLinks()}
        </nav>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm">
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b pb-4">
                  <Link href="/" className="flex items-center gap-2">
                    <Building2 className="h-7 w-7 text-primary" />
                    <span className="text-xl font-bold font-headline">OnPlan</span>
                  </Link>
                </div>
                <nav className="mt-6 flex flex-col gap-2">{renderNavLinks(true)}</nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
