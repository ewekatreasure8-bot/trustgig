import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/components/auth-provider';
import { AIChatbox } from '@/components/ai-chatbox';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TrustGig — Hire vetted professionals you can trust',
  description:
    'Secure escrow payments, verified profiles, and live location tracking. Find trusted local and remote professionals for any job.',
  openGraph: {
    title: 'TrustGig — Hire vetted professionals you can trust',
    description:
      'Secure escrow payments, verified profiles, and live location tracking.',
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <AIChatbox />
        </AuthProvider>
      </body>
    </html>
  );
}
