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
          <div>
            <p style={{ fontSize: '32px', marginBottom: '8px' }}>🕐</p>
            <h4 style={{ fontWeight: 600, marginBottom: '4px', fontSize: '14px' }}>Opening Hours</h4>
            <p style={{ color: '#999', fontSize: '13px' }}>Mon-Sat: 12:00 - 23:00</p>
            <p style={{ color: '#999', fontSize: '13px' }}>Sunday: 12:00 - 22:00</p>
          </div>
          <div>
            <p style={{ fontSize: '32px', marginBottom: '8px' }}>📍</p>
            <h4 style={{ fontWeight: 600, marginBottom: '4px', fontSize: '14px' }}>Location</h4>
            <p style={{ color: '#999', fontSize: '13px' }}>Avenida da Liberdade 123</p>
            <p style={{ color: '#999', fontSize: '13px' }}>Lisbon, Portugal</p>
          </div>
          <div>
            <p style={{ fontSize: '32px', marginBottom: '8px' }}>📞</p>
            <h4 style={{ fontWeight: 600, marginBottom: '4px', fontSize: '14px' }}>Contact</h4>
            <p style={{ color: '#999', fontSize: '13px' }}>+351 21 123 4567</p>
            <p style={{ color: '#999', fontSize: '13px' }}>hello@saffronsoul.com</p>
          </div>
          <div>
            <p style={{ fontSize: '32px', marginBottom: '8px' }}>🚗</p>
            <h4 style={{ fontWeight: 600, marginBottom: '4px', fontSize: '14px' }}>Delivery</h4>
            <p style={{ color: '#999', fontSize: '13px' }}>Free over €50</p>
            <p style={{ color: '#999', fontSize: '13px' }}>30-45 min delivery</p>
          </div>
        </div>
      </div>
    </section>
  );
}