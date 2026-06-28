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
        <p style={{ color: '#c59b3b', fontSize: '10px', letterSpacing: '0.3em', marginBottom: '16px' }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }}>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          AUTHENTIC INDIAN CUISINE 
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline', marginLeft: '8px', verticalAlign: 'middle' }}>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </p>
        <h1 style={{ fontSize: 'clamp(2.5rem, 10vw, 6rem)', fontWeight: 700, lineHeight: 1, marginBottom: '16px' }}>
          <span className="gold-gradient">SAFFRON</span><br /><span style={{ color: '#fff', fontWeight: 300 }}>SOUL</span>
        </h1>
        <p style={{ color: '#999', fontSize: '14px', marginBottom: '32px' }}>Lisbon, Portugal</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={onReserve} className="btn-gold" style={{ padding: '14px 28px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }}>
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            Reserve Table
          </button>
          <button onClick={onOrder} className="btn-outline" style={{ padding: '14px 28px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }}>
              <rect x="1" y="3" width="15" height="13"/>
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
              <circle cx="5.5" cy="18.5" r="2.5"/>
              <circle cx="18.5" cy="18.5" r="2.5"/>
            </svg>
            Order Online
          </button>
        </div>
        <div style={{ marginTop: '40px', display: 'flex', gap: '24px', justifyContent: 'center', color: '#666', fontSize: '12px' }}>
          <span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }}>
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            12:00 - 23:00
          </span>
          <span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }}>
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            Lisbon
          </span>
          <span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }}>
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            4.9 Rating
          </span>
        </div>
      </div>
    </section>
  );
}