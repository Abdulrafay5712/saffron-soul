"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";

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

export default function PaymentModal({ show, onClose }: { show: boolean; onClose: () => void }) {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [complete, setComplete] = useState(false);
  
  const cart = useStore((state) => state.cart);
  const orderType = useStore((state) => state.orderType);
  const clearCart = useStore((state) => state.clearCart);
  
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const serviceCharge = cartTotal * 0.1;
  const deliveryFee = cartTotal >= 50 ? 0 : 5;
  const grandTotal = cartTotal + serviceCharge + (orderType === 'delivery' ? deliveryFee : 0);

  if (!show) return null;

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setComplete(true);
      showToast('Payment successful!');
      setTimeout(() => { clearCart(); onClose(); setComplete(false); }, 2000);
    }, 1500);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '400px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '22px', fontFamily: 'Cormorant Garamond, serif' }}>Payment</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '22px', cursor: 'pointer' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {complete ? (
          <div style={{ textAlign: 'center', padding: '30px 0' }}>
            <div style={{ marginBottom: '12px', color: '#c59b3b' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline' }}>
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <p style={{ fontSize: '18px', marginTop: '12px' }}>Paid €{grandTotal.toFixed(2)}</p>
            <p style={{ color: '#999', fontSize: '14px' }}>Delivery in 30-45 min</p>
          </div>
        ) : (
          <>
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <p style={{ color: '#c59b3b', fontSize: '24px', fontWeight: 700 }}>€{grandTotal.toFixed(2)}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px', marginBottom: '12px' }}>
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
            <input type="text" placeholder="Card Number" className="input-field" style={{ marginBottom: '8px' }} />
            <input type="text" placeholder="Cardholder" className="input-field" style={{ marginBottom: '8px' }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
              <input type="text" placeholder="MM/YY" className="input-field" />
              <input type="text" placeholder="CVV" className="input-field" />
            </div>
            <button onClick={handlePayment} className="btn-gold" style={{ width: '100%', padding: '14px' }} disabled={isProcessing}>
              {isProcessing ? 'Processing...' : `Pay €${grandTotal.toFixed(2)}`}
            </button>
          </>
        )}
      </div>
    </div>
  );
}