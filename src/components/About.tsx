"use client";

export default function About() {
  return (
    <section id="about" style={{ padding: '80px 16px', background: '#000' }}>
      <div className="container">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '60px', 
          alignItems: 'center' 
        }}>
          <div>
            <span className="tag">OUR STORY</span>
            <h2 style={{ 
              fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
              fontWeight: 600, 
              marginTop: '20px', 
              marginBottom: '24px', 
              lineHeight: 1.1,
              fontFamily: 'Cormorant Garamond, serif'
            }}>
              The Art of <span className="gold-gradient">Indian Cuisine</span>
            </h2>
            <p style={{ color: '#999', fontSize: '15px', lineHeight: 1.8, marginBottom: '16px' }}>
              SAFFRON SOUL brings the rich culinary heritage of India to the heart of Lisbon. 
              Our master chefs blend traditional recipes with contemporary techniques to create 
              an unforgettable dining experience.
            </p>
            <p style={{ color: '#999', fontSize: '15px', lineHeight: 1.8, marginBottom: '32px' }}>
              Every spice is carefully selected, every dish crafted with passion. From the 
              tandoor to your table, we promise authenticity in every bite.
            </p>
            
            <div style={{ display: 'flex', gap: '40px' }}>
              <div>
                <p style={{ fontSize: '2rem', fontWeight: 700, color: '#c59b3b', fontFamily: 'Cormorant Garamond, serif' }}>15+</p>
                <p style={{ color: '#666', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Years Experience</p>
              </div>
              <div>
                <p style={{ fontSize: '2rem', fontWeight: 700, color: '#c59b3b', fontFamily: 'Cormorant Garamond, serif' }}>54</p>
                <p style={{ color: '#666', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Signature Dishes</p>
              </div>
              <div>
                <p style={{ fontSize: '2rem', fontWeight: 700, color: '#c59b3b', fontFamily: 'Cormorant Garamond, serif' }}>5★</p>
                <p style={{ color: '#666', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Rating</p>
              </div>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <img 
              src="https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=400&q=80" 
              alt="Restaurant" 
              style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '16px' }} 
            />
            <img 
              src="https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&q=80" 
              alt="Restaurant" 
              style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '16px', marginTop: '20px' }} 
            />
            <img 
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80" 
              alt="Chef" 
              style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '16px' }} 
            />
            <img 
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=80" 
              alt="Food" 
              style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '16px', marginTop: '20px' }} 
            />
          </div>
        </div>
      </div>
    </section>
  );
}