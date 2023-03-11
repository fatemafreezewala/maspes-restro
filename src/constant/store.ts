import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import zustandStorage from './zustandStorage';

interface UserStore {
  user: any;
  role: any;
  setUser: (val: any) => void;
  clear: () => void;
}

const useUserStore = create<UserStore>()(
  persist(
    set => ({
      user: {},
      role: null,
      setUser: (val: any) => set({user: val, role: val.admin_role}),
      clear: () => set({user: {}, role: null}),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);

interface CartStore {
  cart: any[];
  cartLength: number;
  addToCart: (val: any) => void;
  removeItem: (id: any) => void;
  isInCart: (id: any) => void;
  resetCartStore: () => void;
}

const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      cartLength: 0,
      addToCart: val => {
        const getCart = get().cart;
        let itemIndex = getCart.findIndex(item => item.prod_id === val.prod_id);
        if (itemIndex === -1) {
          let tempCart = [...getCart];
          tempCart.push(val);
          set({cart: tempCart, cartLength: tempCart.length});
        }
      },
      removeItem: id => {
        let itemIndex = get().cart.findIndex(item => item.prod_id === id);
        if (itemIndex !== -1) {
          let tempCart = [...get().cart];
          tempCart.splice(itemIndex, 1);
          set({cart: tempCart, cartLength: tempCart.length});
        }
      },
      isInCart: id => {
        let itemIndex = get().cart.findIndex(item => item.prod_id === id);
        if (itemIndex === -1) {
          return false;
        } else {
          return true;
        }
      },
      resetCartStore: () => set({cart: [], cartLength: 0}),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);

export {useUserStore, useCartStore};
