"use client";

import { useState, useEffect } from "react";
import { getAvailableTables, makeReservation, getTimeSlots } from "@/lib/reservationLogic";

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

export default function ReservationModal({ show, onClose }: { show: boolean; onClose: () => void }) {
  const [step, setStep] = useState<'form' | 'payment'>('form');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState('2');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [availability, setAvailability] = useState<any>(null);
  const [success, setSuccess] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  useEffect(() => {
    if (date && time && guests) {
      const result = getAvailableTables(date, time, parseInt(guests));
      setAvailability(result);
    }
  }, [date, time, guests]);

  const reset = () => {
    setStep('form'); setSuccess(null); setPaymentComplete(false);
    setDate(''); setTime(''); setGuests('2');
    setName(''); setEmail(''); setPhone(''); setLocation('');
    onClose();
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!availability || availability.isFull) { showToast('No tables available'); return; }
    if (!name || !email || !phone) { showToast('Fill all fields'); return; }
    setStep('payment');
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      const result = makeReservation({ date, time, guests: parseInt(guests), name, email, phone, location: location || undefined });
      setIsProcessing(false);
      if (result.success) { setSuccess(result); setPaymentComplete(true); }
    }, 1500);
  };

  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={reset}>
      <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '450px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '22px', fontFamily: 'Cormorant Garamond, serif' }}>{step === 'form' ? 'Reserve' : 'Payment'}</h2>
          <button onClick={reset} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '22px', cursor: 'pointer' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {paymentComplete && success ? (
          <div style={{ textAlign: 'center', padding: '30px 0' }}>
            <div style={{ marginBottom: '12px', color: '#c59b3b' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline' }}>
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <h3 style={{ fontSize: '20px', margin: '12px 0' }}>Reserved!</h3>
            <p style={{ color: '#c59b3b', fontSize: '16px', fontWeight: 700 }}>Table {success.tableNumber}</p>
            <p style={{ color: '#999', fontSize: '14px' }}>{date} at {time} • {guests} guests</p>
            <button onClick={reset} className="btn-gold" style={{ marginTop: '16px' }}>Close</button>
          </div>
        ) : step === 'form' ? (
          <form onSubmit={handleNext} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} className="input-field" required min={new Date().toISOString().split('T')[0]} />
            <select value={time} onChange={e => setTime(e.target.value)} className="input-field" required>
              <option value="">Select Time</option>
              {getTimeSlots().map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <select value={guests} onChange={e => setGuests(e.target.value)} className="input-field" required>
              {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} Guest{n>1?'s':''}</option>)}
            </select>
            <select value={location} onChange={e => setLocation(e.target.value)} className="input-field">
              <option value="">No location preference</option>
              <option value="indoor">Indoor</option>
              <option value="outdoor">Outdoor</option>
            </select>
            {availability && date && time && (
              <div className={`availability-badge ${availability.isFull ? 'full' : 'available'}`} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {availability.isFull ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#ef4444" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                    </svg>
                  ) : (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#22c55e" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                    </svg>
                  )}
                  {availability.isFull ? 'Full' : `${availability.available.length} tables`}
                </span>
              </div>
            )}
            <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} className="input-field" required />
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="input-field" required />
            <input type="tel" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} className="input-field" required />
            <button type="submit" className="btn-gold" style={{ width: '100%' }} disabled={availability?.isFull}>
              {availability?.isFull ? 'No Tables' : `Continue - €${(parseInt(guests) * 10).toFixed(2)}`}
            </button>
          </form>
        ) : (
          <form onSubmit={handlePayment} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: '10px', padding: '12px' }}>
              <p style={{ color: '#999', fontSize: '13px' }}>{date} at {time} • {guests} guests</p>
              <p style={{ color: '#c59b3b', fontWeight: 700 }}>€{(parseInt(guests) * 10).toFixed(2)}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
              {['card', 'paypal', 'apple'].map(m => (
                <button key={m} type="button" onClick={() => setPaymentMethod(m)}
                  style={{ 
                    background: paymentMethod === m ? '#c59b3b' : '#0a0a0a', 
                    color: paymentMethod === m ? '#000' : '#999', 
                    border: paymentMethod === m ? 'none' : '1px solid #1a1a1a', 
                    padding: '10px', 
                    borderRadius: '10px', 
                    fontSize: '11px', 
                    fontWeight: 600, 
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}>
                  {m === 'card' ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                      <line x1="1" y1="10" x2="23" y2="10"/>
                    </svg>
                  ) : m === 'paypal' ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/>
                      <path d="M8.5 2h7.5"/>
                      <path d="M3 16v-4a2 2 0 0 1 2-2h1"/>
                      <rect x="3" y="12" width="4" height="8" rx="1"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                  )}
                  <span style={{ textTransform: 'capitalize' }}>{m}</span>
                </button>
              ))}
            </div>
            <input type="text" placeholder="Card Number" className="input-field" />
            <input type="text" placeholder="Cardholder" className="input-field" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <input type="text" placeholder="MM/YY" className="input-field" />
              <input type="text" placeholder="CVV" className="input-field" />
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button type="button" onClick={() => setStep('form')} className="btn-outline" style={{ flex: 1 }}>Back</button>
              <button type="submit" className="btn-gold" style={{ flex: 1 }} disabled={isProcessing}>
                {isProcessing ? '...' : `Pay €${(parseInt(guests) * 10).toFixed(2)}`}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}