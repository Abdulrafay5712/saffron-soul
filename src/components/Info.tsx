export default function Info() {
  return (
    <section style={{ padding: '60px 16px', background: '#050505', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a' }}>
      <div className="container">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '32px',
          textAlign: 'center'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ marginBottom: '8px', color: '#a78bfa', display: 'flex', justifyContent: 'center' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <h4 style={{ fontWeight: 600, marginBottom: '4px', fontSize: '14px' }}>Opening Hours</h4>
            <p style={{ color: '#999', fontSize: '13px' }}>Mon-Sat: 12:00 - 23:00</p>
            <p style={{ color: '#999', fontSize: '13px' }}>Sunday: 12:00 - 22:00</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ marginBottom: '8px', color: '#a78bfa', display: 'flex', justifyContent: 'center' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <h4 style={{ fontWeight: 600, marginBottom: '4px', fontSize: '14px' }}>Location</h4>
            <p style={{ color: '#999', fontSize: '13px' }}>Avenida da Liberdade 123</p>
            <p style={{ color: '#999', fontSize: '13px' }}>Lisbon, Portugal</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ marginBottom: '8px', color: '#a78bfa', display: 'flex', justifyContent: 'center' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </div>
            <h4 style={{ fontWeight: 600, marginBottom: '4px', fontSize: '14px' }}>Contact</h4>
            <p style={{ color: '#999', fontSize: '13px' }}>+351 21 123 4567</p>
            <p style={{ color: '#999', fontSize: '13px' }}>hello@saffronsoul.com</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ marginBottom: '8px', color: '#a78bfa', display: 'flex', justifyContent: 'center' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="3" width="15" height="13"/>
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                <circle cx="5.5" cy="18.5" r="2.5"/>
                <circle cx="18.5" cy="18.5" r="2.5"/>
              </svg>
            </div>
            <h4 style={{ fontWeight: 600, marginBottom: '4px', fontSize: '14px' }}>Delivery</h4>
            <p style={{ color: '#999', fontSize: '13px' }}>Free over €50</p>
            <p style={{ color: '#999', fontSize: '13px' }}>30-45 min delivery</p>
          </div>
        </div>
      </div>
    </section>
  );
}