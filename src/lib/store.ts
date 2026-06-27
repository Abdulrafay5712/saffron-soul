import { create } from 'zustand';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

interface Store {
  cart: CartItem[];
  orderType: 'takeaway' | 'delivery' | null;
  deliveryAddress: string;
  deliveryPhone: string;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  setOrderType: (type: 'takeaway' | 'delivery' | null) => void;
  setDeliveryAddress: (address: string) => void;
  setDeliveryPhone: (phone: string) => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  getDeliveryFee: () => number;
}

export const useStore = create<Store>((set, get) => ({
  cart: [],
  orderType: null,
  deliveryAddress: '',
  deliveryPhone: '',
  
  addToCart: (item) => {
    set((state) => {
      const existing = state.cart.find((i) => i.id === item.id);
      if (existing) {
        return {
          cart: state.cart.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { cart: [...state.cart, { ...item, quantity: 1 }] };
    });
  },

  removeFromCart: (id) => {
    set((state) => ({
      cart: state.cart.filter((i) => i.id !== id),
    }));
  },

  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(id);
      return;
    }
    set((state) => ({
      cart: state.cart.map((i) =>
        i.id === id ? { ...i, quantity } : i
      ),
    }));
  },

  clearCart: () => set({ cart: [], orderType: null, deliveryAddress: '', deliveryPhone: '' }),

  setOrderType: (type) => set({ orderType: type }),
  setDeliveryAddress: (address) => set({ deliveryAddress: address }),
  setDeliveryPhone: (phone) => set({ deliveryPhone: phone }),

  getCartTotal: () => {
    return get().cart.reduce((total, item) => total + item.price * item.quantity, 0);
  },

  getCartCount: () => {
    return get().cart.reduce((count, item) => count + item.quantity, 0);
  },

  getDeliveryFee: () => {
    const total = get().getCartTotal();
    if (total >= 50) return 0;
    return 5;
  },
}));