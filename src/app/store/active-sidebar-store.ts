import { create } from "zustand";

type State = {
  isActive: string;
};

type Action = {
  updateActive: (id: State["isActive"]) => void;
  scrollToSection: (id: string) => void;
  setScrollToSection: (fn: (id: string) => void) => void;
};

export const useActiveSidebarStore = create<State & Action>()((set) => ({
  isActive: "",
  updateActive: (id: string) => set(() => ({ isActive: id })),
  scrollToSection: () => {},
  setScrollToSection: (fn) => set({ scrollToSection: fn }),
}));
