import { create } from 'zustand';
import {ModalTypes} from './types'
interface UseModalStoreProps {
  type: ModalTypes | null;
  isOpen: boolean;
  onOpen: (type: ModalTypes) => void;
  onClose: () => void;
}

export const useStoreModal = create<UseModalStoreProps>((set) => ({
 type:null,
  isOpen: false,
  onOpen: (type) => set({ isOpen: true, type }),
  onClose: () => set({ isOpen: false,type:null }),
}));