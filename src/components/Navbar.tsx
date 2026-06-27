"use client";

import { useState, useEffect, useRef } from "react";
import { useStore } from "@/lib/store";
import Image from "next/image";

export default function Navbar({ onReserve, onCart }: { onReserve: () => void; onCart: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const getCartCount = useStore((state) => state.getCartCount);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
      
      const sections = ["about", "menu", "contact"];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if mobile viewport
  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      if (!isMobileView) {
        setIsMobileOpen(false);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (isMobileOpen && menuRef.current) {
        const target = event.target as Node;
        if (!menuRef.current.contains(target)) {
          const toggleButton = document.querySelector('.mobile-toggle-button');
          if (toggleButton && !toggleButton.contains(target)) {
            setIsMobileOpen(false);
          }
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMobileOpen]);

  const toggleMenu = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMobileOpen(!isMobileOpen);
  };

  const closeMenu = () => {
    setIsMobileOpen(false);
  };

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#menu", label: "Menu" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backdropFilter: 'blur(100px)',
        WebkitBackdropFilter: 'blur(100px)',
        backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.95)' : 'rgba(0, 0, 0, 0.85)',
        borderBottom: isScrolled ? '1px solid rgba(197, 155, 59, 0.2)' : '1px solid rgba(197, 155, 59, 0.08)',
        transition: 'all 0.4s ease',
        boxShadow: isScrolled ? '0 4px 30px rgba(0, 0, 0, 0.3)' : 'none',
        height: isScrolled ? '64px' : '72px',
      }}
    >
      <div className="container flex items-center justify-between px-4 max-w-7xl mx-auto" style={{ height: '100%' }}>
        {/* Logo - Left Side */}
        <a 
          href="#" 
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            transition: 'all 0.3s ease',
            height: '100%',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <div style={{ 
            position: 'relative', 
            width: isScrolled ? '120px' : '140px', 
            height: isScrolled ? '120px' : '140px',
            flexShrink: 0,
          }}>
            <Image
              src="/images/logo.png"
              alt="Saffron Soul"
              fill
              sizes="100px"
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
        </a>

        {/* Desktop Navigation - Right Side - Always visible on desktop */}
        <div style={{ 
          display: isMobile ? 'none' : 'flex',
          alignItems: 'center',
          gap: '8px',
          height: '100%'
        }}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                position: 'relative',
                padding: '6px 16px',
                fontSize: isScrolled ? '10px' : '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                transition: 'all 0.3s ease',
                color: activeSection === link.href.substring(1) ? '#f6d365' : 'rgba(197, 155, 59, 0.5)',
                textDecoration: 'none',
                fontWeight: activeSection === link.href.substring(1) ? 600 : 400,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#f6d365';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                if (activeSection !== link.href.substring(1)) {
                  e.currentTarget.style.color = 'rgba(197, 155, 59, 0.5)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              {link.label}
              <span style={{
                position: 'absolute',
                bottom: '2px',
                left: '50%',
                transform: 'translateX(-50%)',
                height: '2px',
                background: 'linear-gradient(90deg, #f6d365, #fda085)',
                transition: 'all 0.3s ease',
                width: activeSection === link.href.substring(1) ? '20px' : '0',
                borderRadius: '2px',
              }} />
            </a>
          ))}
          
          <div style={{ 
            width: '1px', 
            height: '24px', 
            background: 'linear-gradient(to bottom, transparent, rgba(197, 155, 59, 0.2), transparent)',
            margin: '0 8px' 
          }}></div>
          
          <button 
            onClick={onReserve} 
            style={{
              position: 'relative',
              padding: '7px 22px',
              fontSize: isScrolled ? '9px' : '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              color: '#f6d365',
              border: '1px solid rgba(197, 155, 59, 0.3)',
              borderRadius: '9999px',
              background: 'rgba(197, 155, 59, 0.05)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              overflow: 'hidden',
              fontWeight: 500,
              backdropFilter: 'blur(10px)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#f6d365';
              e.currentTarget.style.boxShadow = '0 0 25px rgba(197, 155, 59, 0.15)';
              e.currentTarget.style.transform = 'scale(1.04)';
              e.currentTarget.style.background = 'rgba(197, 155, 59, 0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(197, 155, 59, 0.3)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.background = 'rgba(197, 155, 59, 0.05)';
            }}
          >
            <span style={{ position: 'relative', zIndex: 10 }}>Reserve</span>
          </button>
          
          <button 
            onClick={onCart} 
            style={{
              position: 'relative',
              padding: '7px 22px',
              fontSize: isScrolled ? '9px' : '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              color: '#0a0602',
              borderRadius: '9999px',
              background: 'linear-gradient(135deg, #f6d365 0%, #fda085 50%, #f6d365 100%)',
              backgroundSize: '200% 200%',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              overflow: 'hidden',
              fontWeight: 600,
              boxShadow: '0 2px 15px rgba(197, 155, 59, 0.2)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.06)';
              e.currentTarget.style.boxShadow = '0 4px 25px rgba(197, 155, 59, 0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 2px 15px rgba(197, 155, 59, 0.2)';
            }}
          >
            <span style={{ 
              position: 'relative', 
              zIndex: 10, 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              fontWeight: 600
            }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '14px', height: '14px' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} 
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                />
              </svg>
              Order
              {getCartCount() > 0 && (
                <span style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '18px',
                  height: '18px',
                  fontSize: '9px',
                  fontWeight: 'bold',
                  color: '#fff',
                  background: '#ef4444',
                  borderRadius: '50%',
                  boxShadow: '0 0 15px rgba(239, 68, 68, 0.3)'
                }}>
                  {getCartCount()}
                </span>
              )}
            </span>
          </button>
        </div>

        {/* Mobile Menu Toggle - Only show on mobile */}
        {isMobile && (
          <button 
            className="mobile-toggle-button"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            style={{
              background: '#000000',
              border: '1px solid rgba(197, 155, 59, 0.15)',
              borderRadius: '8px',
              cursor: 'pointer',
              width: '48px',
              height: '48px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transition: 'all 0.3s ease',
              padding: '0',
              boxShadow: isMobileOpen ? '0 0 20px rgba(197, 155, 59, 0.1)' : 'none',
              touchAction: 'manipulation',
              WebkitTapHighlightColor: 'transparent',
              userSelect: 'none',
              WebkitUserSelect: 'none',
            }}
          >
            <span style={{
              display: 'block',
              height: '2.5px',
              background: isMobileOpen ? '#f6d365' : '#c59b3b',
              transition: 'all 0.3s ease',
              width: isMobileOpen ? '26px' : '26px',
              transform: isMobileOpen ? 'rotate(45deg) translateY(7px)' : 'none',
              borderRadius: '2px',
            }} />
            <span style={{
              display: 'block',
              height: '2.5px',
              background: '#c59b3b',
              transition: 'all 0.3s ease',
              width: isMobileOpen ? '0' : '18px',
              opacity: isMobileOpen ? 0 : 1,
              borderRadius: '2px'
            }} />
            <span style={{
              display: 'block',
              height: '2.5px',
              background: isMobileOpen ? '#f6d365' : '#c59b3b',
              transition: 'all 0.3s ease',
              width: isMobileOpen ? '26px' : '26px',
              transform: isMobileOpen ? 'rotate(-45deg) translateY(-7px)' : 'none',
              borderRadius: '2px',
            }} />
          </button>
        )}
      </div>

      {/* Mobile Menu Overlay - Only show on mobile and when open */}
      {isMobile && isMobileOpen && (
        <div 
          ref={menuRef}
          style={{
            position: 'fixed',
            top: isScrolled ? '64px' : '72px',
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9998,
            background: '#000000',
            backdropFilter: 'blur(100px)',
            WebkitBackdropFilter: 'blur(100px)',
            padding: '32px 20px',
            borderTop: '1px solid rgba(197, 155, 59, 0.1)',
            overflowY: 'auto',
            height: 'calc(100vh - 72px)',
            maxHeight: 'calc(100vh - 72px)',
            display: 'flex',
            flexDirection: 'column',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="container max-w-7xl mx-auto" style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '100%',
            maxWidth: '600px',
            margin: '0 auto',
          }}>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '20px',
              background: '#000000',
              width: '100%',
            }}>
              {navLinks.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  style={{
                    fontSize: '24px',
                    fontWeight: 300,
                    textTransform: 'uppercase',
                    letterSpacing: '0.3em',
                    transition: 'all 0.3s ease',
                    color: index === 0 ? '#f6d365' : 'rgba(197, 155, 59, 0.4)',
                    textDecoration: 'none',
                    padding: '16px 0',
                    borderBottom: index < navLinks.length - 1 ? '1px solid rgba(197, 155, 59, 0.05)' : 'none',
                    background: 'transparent',
                    textAlign: 'center',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#f6d365';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    if (index !== 0) {
                      e.currentTarget.style.color = 'rgba(197, 155, 59, 0.4)';
                      e.currentTarget.style.transform = 'scale(1)';
                    }
                  }}
                >
                  {link.label}
                </a>
              ))}
              
              <div style={{ 
                height: '1px', 
                background: 'linear-gradient(to right, transparent, rgba(197, 155, 59, 0.2), transparent)',
                margin: '16px 0' 
              }}></div>
              
              <button 
                onClick={() => { onReserve(); closeMenu(); }} 
                style={{
                  position: 'relative',
                  width: '100%',
                  padding: '16px',
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  color: '#f6d365',
                  border: '1px solid rgba(197, 155, 59, 0.25)',
                  borderRadius: '9999px',
                  background: 'rgba(197, 155, 59, 0.05)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontWeight: 500,
                  backdropFilter: 'blur(10px)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#f6d365';
                  e.currentTarget.style.background = 'rgba(197, 155, 59, 0.1)';
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(197, 155, 59, 0.25)';
                  e.currentTarget.style.background = 'rgba(197, 155, 59, 0.05)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                Reserve Table
              </button>
              
              <button 
                onClick={() => { onCart(); closeMenu(); }} 
                style={{
                  position: 'relative',
                  width: '100%',
                  padding: '16px',
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  color: '#0a0602',
                  fontWeight: 600,
                  borderRadius: '9999px',
                  background: 'linear-gradient(135deg, #f6d365 0%, #fda085 50%, #f6d365 100%)',
                  backgroundSize: '200% 200%',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 20px rgba(197, 155, 59, 0.2)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.03)';
                  e.currentTarget.style.boxShadow = '0 6px 30px rgba(197, 155, 59, 0.35)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(197, 155, 59, 0.2)';
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '20px', height: '20px' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} 
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                    />
                  </svg>
                  Order Online
                  {getCartCount() > 0 && (
                    <span style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '24px',
                      height: '24px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      color: '#fff',
                      background: '#ef4444',
                      borderRadius: '50%',
                      boxShadow: '0 0 15px rgba(239, 68, 68, 0.3)'
                    }}>
                      {getCartCount()}
                    </span>
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}