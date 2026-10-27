
import { create } from 'zustand';

export const useGuessNumberStore = create((set) => ({
  // Array que almacena los números ingresados
  history: [],

  // Agrega un intento con su número y resultado
  addNumber: (numero, resultado) =>
    set((state) => ({
      history: [
        ...state.history,
        {
          number: numero,
          result: resultado,
          color:
            resultado === 'mayor'
              ? 'warning'
              : resultado === 'menor'
                ? 'info'
                : 'success',
        },
      ],
    })),

  // Función para limpiar el historial
  cleanHistory: () =>
    set({ history: [] }),
}));
