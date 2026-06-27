"use client";

const reviews = [
  { name: "Maria S.", text: "Best Indian food in Lisbon! The butter chicken is absolutely divine.", rating: 5, img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" },
  { name: "João P.", text: "Authentic flavors, beautiful ambiance. A true gem in the city.", rating: 5, img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" },
  { name: "Ana R.", text: "The tandoori platter is incredible. Great service too!", rating: 5, img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80" },
  { name: "Carlos M.", text: "We come here every week. Consistently excellent.", rating: 5, img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80" },
];

export default function Reviews() {
  return (
    <section style={{ padding: '80px 16px', background: '#000' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="tag">TESTIMONIALS</span>
          <h2 style={{ 
            fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
            fontWeight: 600, 
            marginTop: '16px',
            fontFamily: 'Cormorant Garamond, serif'
          }}>
            What Our <span className="gold-gradient">Guests</span> Say
          </h2>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '20px' 
        }}>
          {reviews.map((review, i) => (
            <div key={i} className="card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <img src={review.img} alt={review.name} 
                  style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <p style={{ fontWeight: 600, fontSize: '14px' }}>{review.name}</p>
                  <p style={{ color: '#c59b3b', fontSize: '13px' }}>{'★'.repeat(review.rating)}</p>
                </div>
              </div>
              <p style={{ color: '#999', fontSize: '14px', lineHeight: 1.6, fontStyle: 'italic' }}>
                "{review.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}