'use client';
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <Link href="/">
              <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 cursor-pointer">
                WealthPulse
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link
              href="/crypto"
              className="text-white hover:text-cyan-400 transition-colors duration-200 font-medium"
            >
              Crypto
            </Link>
            <Link
              href="/stocks"
              className="text-white hover:text-cyan-400 transition-colors duration-200 font-medium"
            >
              Stocks
            </Link>
          
            <Link
              href="/portfolio"
              className="text-white hover:text-cyan-400 transition-colors duration-200 font-medium"
            >
              Portfolio
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-cyan-400 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4 space-y-2">
              <Link
                href="/crypto"
                className="block text-white hover:text-cyan-400 transition-colors duration-200 font-medium py-2 px-3 rounded-lg hover:bg-slate-700/50"
                onClick={() => setIsMenuOpen(false)}
              >
                Crypto
              </Link>
              <Link
                href="/stocks"
                className="block text-white hover:text-cyan-400 transition-colors duration-200 font-medium py-2 px-3 rounded-lg hover:bg-slate-700/50"
                onClick={() => setIsMenuOpen(false)}
              >
                Stocks
              </Link>
              <Link
                href="/mutual-funds"
                className="block text-white hover:text-cyan-400 transition-colors duration-200 font-medium py-2 px-3 rounded-lg hover:bg-slate-700/50"
                onClick={() => setIsMenuOpen(false)}
              >
                Mutual Funds
              </Link>
              <Link
                href="/portfolio"
                className="block text-white hover:text-cyan-400 transition-colors duration-200 font-medium py-2 px-3 rounded-lg hover:bg-slate-700/50"
                onClick={() => setIsMenuOpen(false)}
              >
                Portfolio
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}