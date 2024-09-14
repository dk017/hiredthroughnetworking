import { Inter } from 'next/font/google';
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ViaNetworking',
  description: 'Hired Through Networking',
  icons: {
    icon: [
      { url: './handshake.ico' }
    ],
  },
};

const fontHeading = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
});

const fontBody = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${fontHeading.variable} ${fontBody.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
