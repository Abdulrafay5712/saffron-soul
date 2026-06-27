"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Specialties from "@/components/Specialties";
import MenuSection from "@/components/MenuSection";
import Gallery from "@/components/Gallery";
import Reviews from "@/components/Reviews";
import Info from "@/components/Info";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ReservationModal from "@/components/ReservationModal";
import CartModal from "@/components/CartModal";
import PaymentModal from "@/components/PaymentModal";

export default function Home() {
  const [showReservation, setShowReservation] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const getCartCount = useStore((state) => state.getCartCount);

  return (
    <main style={{ background: '#000' }}>
      <Navbar onReserve={() => setShowReservation(true)} onCart={() => setShowCart(true)} />
      <Hero onReserve={() => setShowReservation(true)} onOrder={function (): void {
        throw new Error("Function not implemented.");
      } } />
      <About />
      <Specialties />
      <MenuSection />
      <Gallery />
      <Reviews />
      <Info />
      <Contact />
      <Footer />

      {/* Mobile Floating Cart Button */}
      {getCartCount() > 0 && (
        <button onClick={() => setShowCart(true)} style={{
          position: 'fixed', bottom: '20px', right: '20px', zIndex: 50,
          background: '#c59b3b', color: '#000', width: '56px', height: '56px',
          borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 700, fontSize: '14px', boxShadow: '0 8px 24px rgba(197,155,59,0.4)',
          border: 'none', cursor: 'pointer'
        }}>
          🛒<span style={{ position: 'absolute', top: '-4px', right: '-4px', background: '#ef4444', color: '#fff', width: '22px', height: '22px', borderRadius: '50%', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{getCartCount()}</span>
        </button>
      )}

      <ReservationModal show={showReservation} onClose={() => setShowReservation(false)} />
      <CartModal show={showCart} onClose={() => setShowCart(false)} onPayment={() => setShowPayment(true)} />
      <PaymentModal show={showPayment} onClose={() => setShowPayment(false)} />
    </main>
  );
}