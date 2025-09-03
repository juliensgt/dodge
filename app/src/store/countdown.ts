import { create } from "zustand";

interface CountdownState {
  time: number;

  // Actions
  setTime: (time: number) => void;
  clear: () => void;
}

const useCountdownStore = create<CountdownState>((set) => ({
  time: 0,

  setTime: (time: number) => {
    set({ time });
  },

  clear: () => {
    set({ time: 0 });
  },
}));

export { useCountdownStore };
