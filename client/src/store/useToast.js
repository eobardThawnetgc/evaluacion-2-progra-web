import { create } from "zustand";

export const useToastStore = create((set) => ({
  toast: null,

  showToast: (tipo, mensaje, duracion = 3000) => {
    set({
      toast: {
        id: Date.now(),
        tipo,
        mensaje,
        duracion,
      },
    });
  },

  hideToast: () => set({ toast: null }),
}));
