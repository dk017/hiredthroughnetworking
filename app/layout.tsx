import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import Image from 'next/image'; // Import the Image component
//import Footer from './footer';


// Define fonts with appropriate font weights
const fontHeading = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
  weight: '700', // Set weight for heading font
});

const fontBody = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
  weight: '500', // Set weight for body font
});

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <div className="flex items-center sticky top-0 z-10">
        <Link href="/" passHref className="flex items-center"> {/* Add flex here */}
          <Image src="/handshake.png" alt="Logo" className="h-10 mr-2" width={40} height={40} />
          <h1 className="text-3xl font-bold">ViaNetworking</h1>
        </Link>
      </div>
      <nav>
        <Link href="/categories" className="text-white hover:underline mr-4">Job Categories</Link>
        <Link href="/remote-jobs" className="text-white hover:underline mr-4">Remote Jobs</Link>
      </nav>
    </header>
  );
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${fontHeading.variable} ${fontBody.variable} antialiased`}>
        <Header />
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}