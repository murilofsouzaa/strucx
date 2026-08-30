import type { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ScrollToTop } from './ScrollToTop';
import { WhatsAppFloatingButton } from './WhatsAppFloatingButton';

interface LayoutProps {
  children?: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-transparent text-[#0F172A] selection:bg-[#0284C7] selection:text-white">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1 w-full relative">
        {children}
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}
