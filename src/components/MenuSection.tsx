"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { menuItems, allCategories } from "@/lib/menuData";
import { useStore } from "@/lib/store";

function showToast(message: string) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    toast.style.zIndex = '200';
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

const categories = allCategories.filter(cat => cat !== "All");

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const addToCart = useStore((state) => state.addToCart);
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const filteredItems = menuItems.filter(item => item.category === activeCategory);

  // Check scroll position
  const checkScroll = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, []);

  // Reset and start auto-slide when category changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
    }
    checkScroll();

    // Start auto-slide
    const startAutoSlide = () => {
      autoSlideRef.current = setInterval(() => {
        if (scrollRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
          if (scrollLeft >= scrollWidth - clientWidth) {
            scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            scrollRef.current.scrollBy({ left: 170, behavior: 'smooth' });
          }
        }
      }, 3000);
    };

    startAutoSlide();

    return () => {
      if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    };
  }, [activeCategory, checkScroll]);

  // Listen for scroll events
  useEffect(() => {
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener('scroll', checkScroll);
      return () => ref.removeEventListener('scroll', checkScroll);
    }
  }, [checkScroll]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = direction === 'left' ? -340 : 340;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  // Pause auto-slide on hover
  const pauseAutoSlide = () => {
    if (autoSlideRef.current) clearInterval(autoSlideRef.current);
  };

  const resumeAutoSlide = () => {
    pauseAutoSlide();
    autoSlideRef.current = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft >= scrollWidth - clientWidth) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 170, behavior: 'smooth' });
        }
      }
    }, 3000);
  };

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
    });
    showToast(`${item.name} added ✓`);
  };

  return (
    <section id="menu" style={{ padding: '60px 16px', background: '#050505' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span className="tag">OUR MENU</span>
          <h2 style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: 600, marginTop: '16px', fontFamily: 'Cormorant Garamond, serif' }}>
            <span className="gold-gradient">Authentic</span> Indian Cuisine
          </h2>
        </div>

        {/* Category Tabs */}
        <div style={{ 
          display: 'flex', 
          gap: '6px', 
          marginBottom: '24px',
          overflowX: 'auto',
          paddingBottom: '8px',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                whiteSpace: 'nowrap',
                flexShrink: 0,
                padding: '8px 16px',
                borderRadius: '9999px',
                fontSize: '11px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                cursor: 'pointer',
                transition: 'all 0.2s',
                background: activeCategory === cat ? '#c59b3b' : 'transparent',
                color: activeCategory === cat ? '#000' : '#999',
                border: activeCategory === cat ? 'none' : '1px solid #1a1a1a',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Category Title */}
        <h3 style={{
          fontSize: '20px', 
          fontWeight: 600, 
          color: '#c59b3b',
          marginBottom: '16px',
          fontFamily: 'Cormorant Garamond, serif',
        }}>
          {activeCategory}
        </h3>

        {/* Carousel Container */}
        <div 
          style={{ position: 'relative' }}
          onMouseEnter={pauseAutoSlide}
          onMouseLeave={resumeAutoSlide}
        >
          {/* Left Arrow */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              style={{
                position: 'absolute',
                left: '-8px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.8)',
                border: '1px solid #c59b3b',
                color: '#c59b3b',
                fontSize: '18px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(4px)',
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#c59b3b'; e.currentTarget.style.color = '#000'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.8)'; e.currentTarget.style.color = '#c59b3b'; }}
            >
              ‹
            </button>
          )}

          {/* Right Arrow */}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              style={{
                position: 'absolute',
                right: '-8px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.8)',
                border: '1px solid #c59b3b',
                color: '#c59b3b',
                fontSize: '18px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(4px)',
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#c59b3b'; e.currentTarget.style.color = '#000'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.8)'; e.currentTarget.style.color = '#c59b3b'; }}
            >
              ›
            </button>
          )}

          {/* Scrollable Dishes */}
          <div 
            ref={scrollRef}
            style={{
              display: 'flex',
              gap: '12px',
              overflowX: 'auto',
              padding: '8px 4px',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              scrollSnapType: 'x mandatory',
            }}
          >
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                className="card"
                style={{
                  minWidth: '160px',
                  maxWidth: '160px',
                  flexShrink: 0,
                  scrollSnapAlign: 'start',
                }}
              >
                <div style={{ position: 'relative', height: '120px', overflow: 'hidden' }}>
                  <img src={item.image} alt={item.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    loading="lazy" />
                  <span style={{
                    position: 'absolute', bottom: '6px', right: '6px',
                    background: 'rgba(0,0,0,0.85)', color: '#c59b3b',
                    padding: '2px 8px', borderRadius: '9999px',
                    fontSize: '11px', fontWeight: 700
                  }}>
                    €{item.price.toFixed(2)}
                  </span>
                </div>
                <div style={{ padding: '10px' }}>
                  <h4 style={{ 
                    fontSize: '13px', 
                    fontWeight: 600, 
                    marginBottom: '8px', 
                    lineHeight: 1.2,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {item.name}
                  </h4>
                  <button 
                    onClick={() => handleAddToCart(item)}
                    style={{
                      width: '100%', padding: '8px', fontSize: '11px',
                      background: '#c59b3b', color: '#000', border: 'none',
                      borderRadius: '8px', fontWeight: 600, cursor: 'pointer',
                      whiteSpace: 'nowrap'
                    }}>
                    + Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {filteredItems.length === 0 && (
          <p style={{ textAlign: 'center', color: '#666', padding: '40px' }}>No items in this category</p>
        )}
      </div>
    </section>
  );
}