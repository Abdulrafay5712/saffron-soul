"use client";

const images = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80",
  "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=400&q=80",
  "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&q=80",
  "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=400&q=80",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=80",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80",
];

export default function Gallery() {
  return (
    <section style={{ padding: '80px 16px', background: '#000' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="tag">GALLERY</span>
          <h2 style={{ 
            fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
            fontWeight: 600, 
            marginTop: '16px',
            fontFamily: 'Cormorant Garamond, serif'
          }}>
            Our <span className="gold-gradient">Ambiance</span>
          </h2>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
          gap: '12px' 
        }}>
          {images.map((img, i) => (
            <div key={i} className="card" style={{ 
              height: i === 0 ? '300px' : '200px',
              gridRow: i === 0 ? 'span 2' : 'auto',
              overflow: 'hidden'
            }}>
              <img src={img} alt={`Gallery ${i+1}`} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}