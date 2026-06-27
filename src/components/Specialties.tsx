"use client";

const specialties = [
  { name: "Butter Chicken", desc: "Our signature creamy tomato-based curry", img: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&q=80" },
  { name: "Tandoori Chicken", desc: "Clay oven roasted with secret spice blend", img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80" },
  { name: "Chicken Biryani", desc: "Fragrant basmati rice layered with chicken", img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80" },
];

export default function Specialties() {
  return (
    <section style={{ padding: '80px 16px', background: '#050505' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="tag">CHEF'S SPECIAL</span>
          <h2 style={{ 
            fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
            fontWeight: 600, 
            marginTop: '16px',
            fontFamily: 'Cormorant Garamond, serif'
          }}>
            Signature <span className="gold-gradient">Creations</span>
          </h2>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '24px' 
        }}>
          {specialties.map((item, i) => (
            <div key={i} className="card" style={{ position: 'relative', height: '350px', overflow: 'hidden' }}>
              <img src={item.img} alt={item.name} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                padding: '24px'
              }}>
                <h3 style={{ fontSize: '22px', fontWeight: 600, color: '#fff', marginBottom: '4px', fontFamily: 'Cormorant Garamond, serif' }}>
                  {item.name}
                </h3>
                <p style={{ color: '#c59b3b', fontSize: '14px' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}