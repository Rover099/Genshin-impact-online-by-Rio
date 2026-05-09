import { create } from 'zustand';
import { UserState, UiState } from '../types';

export const useUserStore = create<UserState>((set) => ({
  primogems: 1600,
  mora: 50000,
  arLevel: 1,
  worldLevel: 1,
  inventory: {
    characters: ['c1'], // Start with Diluc for demo
    weapons: [],
    items: [],
  },
  achievements: [],
  addPrimogems: (amount) => set((state) => ({ primogems: state.primogems + amount })),
  spendPrimogems: (amount) => {
    let success = false;
    set((state) => {
      if (state.primogems >= amount) {
        success = true;
        return { primogems: state.primogems - amount };
      }
      return state;
    });
    return success;
  },
  unlockCharacter: (id) => set((state) => ({
    inventory: {
      ...state.inventory,
      characters: state.inventory.characters.includes(id) 
        ? state.inventory.characters 
        : [...state.inventory.characters, id]
    }
  })),
}));

export const useUiStore = create<UiState>((set) => ({
  theme: 'dark',
  sidebarOpen: false,
  activeModal: null,
  notifications: [],
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  openModal: (modalId) => set({ activeModal: modalId }),
  closeModal: () => set({ activeModal: null }),
  addNotification: (message, type) => set((state) => ({
    notifications: [...state.notifications, { id: Date.now().toString(), message, type }]
  })),
  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter((n) => n.id !== id)
  })),
}));
