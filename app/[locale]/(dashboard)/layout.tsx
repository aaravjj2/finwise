'use client';

import { type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar } from '@/components/layout/Sidebar';
import { BottomNav } from '@/components/layout/BottomNav';
import { Header } from '@/components/layout/Header';

export default function DashboardLayout({ children }: { children: ReactNode }): JSX.Element {
  const pathname = usePathname();
  const isChatPage = pathname.includes('/chat');

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Desktop Sidebar */}
      <Sidebar className="hidden lg:flex" />

      {/* Main Content */}
      <main className="flex flex-1 flex-col">
        {!isChatPage && <Header />}
        <div className={`flex-1 ${isChatPage ? '' : 'p-4 pb-20 lg:p-6 lg:pb-6'}`}>{children}</div>
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav className="lg:hidden" />
    </div>
  );
}
