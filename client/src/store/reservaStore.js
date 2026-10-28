import { create } from 'zustand';

export const useReservaStore = create((set, get) => ({
  platos: [],
  reserva: { itemsReservados: [], saldo: 0, total: 0 },
  loadingMenu: true,
  loadingReserva: true,
  error: null,

  // 1. Obtener catálogo
  fetchMenu: async () => {
    set({ loadingMenu: true, error: null });
    try {
      const response = await fetch('http://localhost:3000/api/menu');
      if (!response.ok) throw new Error('Error al obtener el catálogo');
      const data = await response.json();
      set({ platos: data, loadingMenu: false });
    } catch (err) {
      set({ error: err.message, loadingMenu: false });
    }
  },

  // 2. Obtener bandeja
  fetchReserva: async () => {
    set({ loadingReserva: true, error: null });
    try {
      const response = await fetch('http://localhost:3000/api/reserva');
      if (!response.ok) throw new Error('Error al obtener la bandeja de reserva');
      const data = await response.json();
      set({ reserva: data, loadingReserva: false });
    } catch (err) {
      set({ error: err.message, loadingReserva: false });
    }
  },

  // 3. Agregar al carrito
  agregarPlato: async (platoID) => {
    try {
      const response = await fetch('http://localhost:3000/api/reserva/agregar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platoID, cantidad: 1 }), 
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.mensaje);
      
      // Magia de Zustand: Refrescamos menú y bandeja al instante
      await get().fetchMenu();
      await get().fetchReserva();
      
      return { success: true, mensaje: data.mensaje };
    } catch (err) {
      return { success: false, mensaje: err.message };
    }
  },

  // 4. Modificar cantidad (+ / -)
  actualizarCantidad: async (id, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;
    try {
      const response = await fetch(`http://localhost:3000/api/reserva/actualizar-porciones/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cantidad: nuevaCantidad }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.mensaje || 'Error al actualizar las porciones');

      await get().fetchMenu();
      await get().fetchReserva();
    } catch (err) {
      alert(err.message);
    }
  },

  // 5. Eliminar del carrito
  eliminarPlato: async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/reserva/eliminar/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.mensaje || 'Error al eliminar el platillo');

      await get().fetchMenu();
      await get().fetchReserva();
    } catch (err) {
      alert(err.message);
    }
  }
}));