import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'FinWise - AI Financial Coach',
    template: '%s | FinWise',
  },
  description:
    'AI-powered financial literacy coach for emerging markets. Learn to save, borrow safely, and build financial security in your language.',
  keywords: [
    'financial literacy',
    'microfinance',
    'emerging markets',
    'AI coach',
    'savings',
    'budgeting',
  ],
  authors: [{ name: 'FinWise Team' }],
  creator: 'FinWise',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'FinWise',
    title: 'FinWise - AI Financial Coach',
    description: 'AI-powered financial literacy coach for emerging markets',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FinWise - AI Financial Coach',
    description: 'AI-powered financial literacy coach for emerging markets',
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'FinWise',
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#22c55e' },
    { media: '(prefers-color-scheme: dark)', color: '#16a34a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
