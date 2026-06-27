"use client";

import { useStore } from "@/lib/store";

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

export default function CartModal({ show, onClose, onPayment }: { show: boolean; onClose: () => void; onPayment: () => void }) {
  const cart = useStore((state) => state.cart);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const updateQuantity = useStore((state) => state.updateQuantity);
  const clearCart = useStore((state) => state.clearCart);
  const orderType = useStore((state) => state.orderType);
  const setOrderType = useStore((state) => state.setOrderType);
  const deliveryAddress = useStore((state) => state.deliveryAddress);
  const setDeliveryAddress = useStore((state) => state.setDeliveryAddress);
  const deliveryPhone = useStore((state) => state.deliveryPhone);
  const setDeliveryPhone = useStore((state) => state.setDeliveryPhone);

  if (!show) return null;

  // Calculate totals from cart array
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
  const serviceCharge = cartTotal * 0.1;
  const deliveryFee = cartTotal >= 50 ? 0 : 5;
  const grandTotal = cartTotal + serviceCharge + (orderType === 'delivery' ? deliveryFee : 0);

  const handlePlaceOrder = () => {
    if (cart.length === 0) { showToast('Your cart is empty'); return; }
    if (!orderType) { showToast('Please select Takeaway or Delivery'); return; }
    
    if (orderType === 'delivery') {
      if (!deliveryAddress || !deliveryPhone) { 
        showToast('Please enter your delivery address and phone number'); 
        return; 
      }
      onClose();
      onPayment();
    } else if (orderType === 'takeaway') {
      showToast('Order placed! Ready for pickup in 25-35 minutes');
      clearCart();
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '520px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '24px', fontFamily: 'Cormorant Garamond, serif' }}>
            <span className="gold-gradient">Your</span> Order
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '22px', cursor: 'pointer' }}>✕</button>
        </div>

        {/* Order Type Selection */}
        <p style={{ color: '#999', fontSize: '12px', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Select Order Type</p>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
          <button 
            onClick={() => setOrderType('takeaway')} 
            style={{
              flex: 1, padding: '16px', borderRadius: '12px', fontSize: '14px', fontWeight: 600,
              cursor: 'pointer', transition: 'all 0.3s', textAlign: 'center',
              background: orderType === 'takeaway' ? '#22c55e' : 'transparent',
              color: orderType === 'takeaway' ? '#000' : '#22c55e',
              border: orderType === 'takeaway' ? 'none' : '2px solid #22c55e',
            }}
          >
            🛍️ Takeaway<br />
            <span style={{ fontSize: '11px', fontWeight: 400, opacity: 0.8 }}>Pick up at restaurant</span>
          </button>
          <button 
            onClick={() => setOrderType('delivery')} 
            style={{
              flex: 1, padding: '16px', borderRadius: '12px', fontSize: '14px', fontWeight: 600,
              cursor: 'pointer', transition: 'all 0.3s', textAlign: 'center',
              background: orderType === 'delivery' ? '#3b82f6' : 'transparent',
              color: orderType === 'delivery' ? '#fff' : '#3b82f6',
              border: orderType === 'delivery' ? 'none' : '2px solid #3b82f6',
            }}
          >
            🛵 Delivery<br />
            <span style={{ fontSize: '11px', fontWeight: 400, opacity: 0.8 }}>Delivered to your door</span>
          </button>
        </div>

        {cart.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#666' }}>
            <p style={{ fontSize: '48px', marginBottom: '16px' }}>🛒</p>
            <p style={{ fontSize: '16px', marginBottom: '4px' }}>Your cart is empty</p>
            <p style={{ fontSize: '13px' }}>Browse our menu to add delicious items</p>
          </div>
        ) : (
          <>
            {/* Delivery Address Form */}
            {orderType === 'delivery' && (
              <div style={{ 
                background: '#0a0a0a', 
                border: '1px solid #3b82f6', 
                borderRadius: '12px', 
                padding: '16px', 
                marginBottom: '16px' 
              }}>
                <p style={{ color: '#3b82f6', fontSize: '13px', fontWeight: 600, marginBottom: '12px' }}>
                  📍 Delivery Details
                </p>
                <input 
                  type="text" 
                  placeholder="Street Address, Apt/Suite" 
                  value={deliveryAddress} 
                  onChange={e => setDeliveryAddress(e.target.value)} 
                  className="input-field"
                  style={{ marginBottom: '8px' }}
                />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <input type="text" placeholder="City" className="input-field" />
                  <input type="text" placeholder="Postal Code" className="input-field" />
                </div>
                <input 
                  type="tel" 
                  placeholder="Phone Number" 
                  value={deliveryPhone} 
                  onChange={e => setDeliveryPhone(e.target.value)} 
                  className="input-field"
                  style={{ marginTop: '8px' }}
                />
                <textarea 
                  placeholder="Delivery instructions (optional)" 
                  className="input-field"
                  style={{ marginTop: '8px', resize: 'none', height: '60px' }}
                />
              </div>
            )}

            {/* Cart Items */}
            <p style={{ color: '#999', fontSize: '12px', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Order Items ({cartCount})
            </p>
            <div style={{ maxHeight: '200px', overflowY: 'auto', marginBottom: '16px' }}>
              {cart.map(item => (
                <div key={item.id} style={{ 
                  display: 'flex', gap: '8px', alignItems: 'center', 
                  padding: '10px', background: '#0a0a0a', borderRadius: '10px', 
                  border: '1px solid #1a1a1a', marginBottom: '6px' 
                }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 600, fontSize: '13px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.name}
                    </p>
                    <p style={{ color: '#c59b3b', fontSize: '12px' }}>€{item.price.toFixed(2)}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="quantity-btn">−</button>
                    <span style={{ fontWeight: 600, fontSize: '13px', minWidth: '16px', textAlign: 'center' }}>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="quantity-btn">+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} 
                    style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '14px', padding: '4px' }}>
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                <span style={{ color: '#999' }}>Subtotal</span>
                <span style={{ color: '#fff' }}>€{cartTotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                <span style={{ color: '#999' }}>Service Charge (10%)</span>
                <span style={{ color: '#fff' }}>€{serviceCharge.toFixed(2)}</span>
              </div>
              {orderType === 'delivery' && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                  <span style={{ color: '#999' }}>Delivery Fee</span>
                  <span style={{ color: deliveryFee === 0 ? '#22c55e' : '#fff' }}>
                    {deliveryFee === 0 ? 'FREE' : `€${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
              )}
              <div style={{ 
                display: 'flex', justifyContent: 'space-between', 
                fontSize: '18px', fontWeight: 700, marginTop: '12px', 
                paddingTop: '12px', borderTop: '1px solid #1a1a1a' 
              }}>
                <span>Total</span>
                <span style={{ color: '#c59b3b' }}>€{grandTotal.toFixed(2)}</span>
              </div>

              {/* Place Order Button */}
              <button 
                onClick={handlePlaceOrder} 
                className="btn-gold" 
                style={{ width: '100%', marginTop: '20px', padding: '16px', fontSize: '15px' }}
              >
                {orderType === 'takeaway' ? 'Place Order - Pickup' : 
                 orderType === 'delivery' ? 'Proceed to Payment' : 
                 'Select Order Type'}
              </button>

              <button 
                onClick={clearCart} 
                style={{ 
                  width: '100%', background: 'none', border: 'none', 
                  color: '#666', marginTop: '10px', cursor: 'pointer', 
                  fontSize: '12px' 
                }}>
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}