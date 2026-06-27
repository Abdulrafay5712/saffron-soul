export default function Contact() {
  return (
    <section id="contact" style={{ padding: '60px 16px' }}>
      <div className="container" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <span className="tag">CONTACT</span>
        <h2 style={{ fontSize: '2rem', fontWeight: 600, marginTop: '16px', marginBottom: '32px', fontFamily: 'Cormorant Garamond, serif' }}>
          Visit <span className="gold-gradient">Us</span>
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: '#999', fontSize: '14px' }}>
          <p>📍 Avenida da Liberdade 123, Lisbon</p>
          <p>📞 +351 21 123 4567</p>
          <p>✉️ hello@saffronsoul.com</p>
          <p>🕐 12:00 - 23:00 (Sun: 12:00 - 22:00)</p>
        </div>
      </div>
    </section>
  );
}