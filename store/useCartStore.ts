import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
  category: string;
  isPreOrder: boolean;
  depositAmount?: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(
          (i) => i.id === item.id && i.size === item.size
        );

        if (existingItem) {
          set({
            items: currentItems.map((i) =>
              i.id === item.id && i.size === item.size
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          });
        } else {
          set({ items: [...currentItems, item] });
        }
      },
      removeItem: (id, size) => {
        set({
          items: get().items.filter((i) => !(i.id === id && i.size === size)),
        });
      },
      updateQuantity: (id, size, quantity) => {
        set({
          items: get().items.map((i) =>
            i.id === id && i.size === size ? { ...i, quantity } : i
          ),
        });
      },
      clearCart: () => set({ items: [] }),
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "grassland-cart-storage",
    }
  )
);
