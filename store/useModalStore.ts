import { create } from 'zustand';

interface ModalStore {
  isSizeAIOpen: boolean;
  openSizeAI: () => void;
  closeSizeAI: () => void;
  isCheckoutAIOpen: boolean;
  openCheckoutAI: () => void;
  closeCheckoutAI: () => void;
  isSearchAIOpen: boolean;
  openSearchAI: () => void;
  closeSearchAI: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isSizeAIOpen: false,
  openSizeAI: () => set({ isSizeAIOpen: true }),
  closeSizeAI: () => set({ isSizeAIOpen: false }),
  isCheckoutAIOpen: false,
  openCheckoutAI: () => set({ isCheckoutAIOpen: true }),
  closeCheckoutAI: () => set({ isCheckoutAIOpen: false }),
  isSearchAIOpen: false,
  openSearchAI: () => set({ isSearchAIOpen: true }),
  closeSearchAI: () => set({ isSearchAIOpen: false }),
}));
