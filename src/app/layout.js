// src/app/layout.js
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';
import { Poppins } from 'next/font/google';



const poppins = Poppins({
  subsets: ['normal'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}