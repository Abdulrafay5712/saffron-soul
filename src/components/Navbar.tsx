"use client";

import { useState, useEffect } from "react";
import { useStore } from "@/lib/store";

export default function Navbar({ onReserve, onCart }: { onReserve: () => void; onCart: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const getCartCount = useStore((state) => state.getCartCount);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all ${isScrolled ? 'nav-blur' : ''}`}>
      <div className="container flex items-center justify-between h-16 px-4">
        <a href="#" className="text-xl font-bold serif">
          <span className="gold-gradient">SAFFRON</span>
          <span style={{ color: '#fff', marginLeft: '6px', fontWeight: 300 }}>SOUL</span>
        </a>

        <div className="hidden md:flex items-center gap-4">
          <a href="#about" style={{ color: '#999', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', textDecoration: 'none' }}>About</a>
          <a href="#menu" style={{ color: '#999', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', textDecoration: 'none' }}>Menu</a>
          <a href="#contact" style={{ color: '#999', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', textDecoration: 'none' }}>Contact</a>
          <button onClick={onReserve} className="btn-outline" style={{ padding: '8px 20px', fontSize: '11px' }}>Reserve</button>
          <button onClick={onCart} className="btn-gold" style={{ padding: '8px 20px', fontSize: '11px' }}>
            🛒 Order Online {getCartCount() > 0 && `(${getCartCount()})`}
          </button>
        </div>

        <button className="md:hidden" onClick={() => setIsMobileOpen(!isMobileOpen)} 
          style={{ color: '#fff', fontSize: '22px', background: 'none', border: 'none' }}>
          {isMobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {isMobileOpen && (
        <div style={{ background: '#000', borderTop: '1px solid #1a1a1a', padding: '12px' }}>
          <a href="#about" onClick={() => setIsMobileOpen(false)} style={{ display: 'block', color: '#999', padding: '10px 0', textDecoration: 'none' }}>About</a>
          <a href="#menu" onClick={() => setIsMobileOpen(false)} style={{ display: 'block', color: '#999', padding: '10px 0', textDecoration: 'none' }}>Menu</a>
          <a href="#contact" onClick={() => setIsMobileOpen(false)} style={{ display: 'block', color: '#999', padding: '10px 0', textDecoration: 'none' }}>Contact</a>
          <button onClick={() => { onReserve(); setIsMobileOpen(false); }} className="btn-outline" style={{ width: '100%', marginTop: '8px', padding: '12px' }}>Reserve Table</button>
          <button onClick={() => { onCart(); setIsMobileOpen(false); }} className="btn-gold" style={{ width: '100%', marginTop: '8px', padding: '12px' }}>
            🛒 Order Online {getCartCount() > 0 && `(${getCartCount()})`}
          </button>
        </div>
      )}
    </nav>
  );
}