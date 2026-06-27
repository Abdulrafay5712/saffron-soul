export default function Hero({ onReserve, onOrder }: { onReserve: () => void; onOrder: () => void }) {
  return (
    <section style={{ 
      position: 'relative', 
      height: '90vh', 
      maxHeight: '700px', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      paddingTop: '72px', // Standard navbar height
    }}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.95))' }} />
      </div>
      <div style={{ 
        position: 'relative', 
        textAlign: 'center', 
        padding: '0 20px',
        marginTop: '10px',
      }}>
        <p style={{ color: '#c59b3b', fontSize: '10px', letterSpacing: '0.3em', marginBottom: '16px' }}>AUTHENTIC INDIAN CUISINE</p>
        <h1 style={{ fontSize: 'clamp(2.5rem, 10vw, 6rem)', fontWeight: 700, lineHeight: 1, marginBottom: '16px' }}>
          <span className="gold-gradient">SAFFRON</span><br /><span style={{ color: '#fff', fontWeight: 300 }}>SOUL</span>
        </h1>
        <p style={{ color: '#999', fontSize: '14px', marginBottom: '32px' }}>Lisbon, Portugal</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={onReserve} className="btn-gold" style={{ padding: '14px 28px' }}>📅 Reserve Table</button>
          <button onClick={onOrder} className="btn-outline" style={{ padding: '14px 28px' }}>🛵 Order Online</button>
        </div>
        <div style={{ marginTop: '40px', display: 'flex', gap: '24px', justifyContent: 'center', color: '#666', fontSize: '12px' }}>
          <span>🕐 12:00 - 23:00</span>
          <span>📍 Lisbon</span>
          <span>⭐ 4.9 Rating</span>
        </div>
      </div>
    </section>
  );
}