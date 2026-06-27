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
          <button onClick={reset} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '22px', cursor: 'pointer' }}>✕</button>
        </div>

        {paymentComplete && success ? (
          <div style={{ textAlign: 'center', padding: '30px 0' }}>
            <p style={{ fontSize: '48px' }}>✅</p>
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
              <div className={`availability-badge ${availability.isFull ? 'full' : 'available'}`}>
                <span>{availability.isFull ? '🔴 Full' : `🟢 ${availability.available.length} tables`}</span>
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
                  style={{ background: paymentMethod === m ? '#c59b3b' : '#0a0a0a', color: paymentMethod === m ? '#000' : '#999', border: paymentMethod === m ? 'none' : '1px solid #1a1a1a', padding: '10px', borderRadius: '10px', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>
                  {m === 'card' ? '💳' : m === 'paypal' ? '💰' : '🍎'}
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