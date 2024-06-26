// components/Footer.js
import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-secondary text-foreground py-6 mt-auto outline outline-1">
      <div className="container mx-auto flex flex-col items-center">
        <div className="flex space-x-6 mb-4">
          <Link href="/" passHref>
            <span className="hover:underline cursor-pointer">Home</span>
          </Link>
          <Link href="/about" passHref>
            <span className="hover:underline cursor-pointer">About Us</span>
          </Link>
          <Link href="/services" passHref>
            <span className="hover:underline cursor-pointer">Services</span>
          </Link>
          <Link href="/contact" passHref>
            <span className="hover:underline cursor-pointer">Contact</span>
          </Link>
        </div>
        <div className="flex space-x-4 mb-4">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Facebook
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Twitter
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Instagram
          </a>
        </div>
        <p className="text-sm">&copy; {new Date().getFullYear()} Charina&apos;s Store. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
