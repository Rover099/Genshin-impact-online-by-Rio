export type Element = 'Pyro' | 'Hydro' | 'Anemo' | 'Electro' | 'Dendro' | 'Cryo' | 'Geo';
export type WeaponType = 'Sword' | 'Claymore' | 'Polearm' | 'Catalyst' | 'Bow';
export type Region = 'Mondstadt' | 'Liyue' | 'Inazuma' | 'Sumeru' | 'Fontaine' | 'Natlan' | 'Snezhnaya';
export type Rarity = 4 | 5;

export interface Character {
  id: string;
  name: string;
  element: Element;
  weapon: WeaponType;
  region: Region;
  rarity: Rarity;
  description: string;
  imageUrl: string;
  bannerImageUrl: string;
  avatarUrl: string;
  stats: {
    hp: number;
    atk: number;
    def: number;
    mastery: number;
  };
}

export interface UserState {
  primogems: number;
  mora: number;
  arLevel: number;
  worldLevel: number;
  inventory: {
    characters: string[]; // Character IDs
    weapons: string[];
    items: { id: string; quantity: number }[];
  };
  achievements: string[];
  addPrimogems: (amount: number) => void;
  spendPrimogems: (amount: number) => boolean;
  unlockCharacter: (id: string) => void;
}

export interface UiState {
  theme: 'dark' | 'light';
  sidebarOpen: boolean;
  activeModal: string | null;
  notifications: { id: string; message: string; type: 'success' | 'info' | 'warning' | 'error' }[];
  toggleSidebar: () => void;
  openModal: (modalId: string) => void;
  closeModal: () => void;
  addNotification: (message: string, type: 'success' | 'info' | 'warning' | 'error') => void;
  removeNotification: (id: string) => void;
}
