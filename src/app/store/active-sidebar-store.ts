import { create } from "zustand";

type State = {
  isActive: string;
  scrollToSection: ((id: string) => void) | null;
};

type Action = {
  updateActive: (id: State["isActive"]) => void;
  setScrollToSection: (fn: State["scrollToSection"]) => void;
};

export const useActiveSidebarStore = create<State & Action>()((set) => ({
  isActive: "",
  scrollToSection: null,
  updateActive: (id: string) => set(() => ({ isActive: id })),
  setScrollToSection: (fn) => set({ scrollToSection: fn }),
}));
