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
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '22px', cursor: 'pointer' }}>✕</button>
        </div>

        {complete ? (
          <div style={{ textAlign: 'center', padding: '30px 0' }}>
            <p style={{ fontSize: '48px' }}>✅</p>
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
                  style={{ background: paymentMethod === m ? '#c59b3b' : '#0a0a0a', color: paymentMethod === m ? '#000' : '#999', border: paymentMethod === m ? 'none' : '1px solid #1a1a1a', padding: '10px', borderRadius: '10px', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>
                  {m === 'card' ? '💳' : m === 'paypal' ? '💰' : '🍎'}
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