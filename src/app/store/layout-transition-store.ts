import { create } from "zustand";

type LayoutTransitionState = {
  isTransitioning: boolean;
  setTransitioning: (value: boolean) => void;
};

export const useLayoutTransitionStore = create<LayoutTransitionState>(
  (set) => ({
    isTransitioning: false,

    setTransitioning: (value) =>
      set({
        isTransitioning: value,
      }),
  })
);
