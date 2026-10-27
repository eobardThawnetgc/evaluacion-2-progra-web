import React, { useState, useEffect } from 'react';
import './BandejaReserva.css'; 

const BandejaReserva = () => {
  const [reserva, setReserva] = useState({ itemsReservados: [], saldo: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener el estado actual de la reserva desde el backend
  const fetchReserva = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/reserva');
      if (!response.ok) throw new Error('Error al obtener la bandeja de reserva');
      const data = await response.json();
      setReserva(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReserva();
  }, []);

  // Función para actualizar porciones (Aumentar o Disminuir cantidad)
  const actualizarCantidad = async (id, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;

    try {
      const response = await fetch(`http://localhost:3000/api/reserva/actualizar-porciones/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cantidad: nuevaCantidad }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.mensaje || 'Error al actualizar las porciones');

      // Refrescamos los datos de la reserva
      fetchReserva();
    } catch (err) {
      alert(err.message);
    }
  };

  // Función para eliminar un plato de la reserva
  const eliminarPlato = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/reserva/eliminar/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.mensaje || 'Error al eliminar el platillo');

      // Refrescamos los datos de la reserva
      fetchReserva();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Cargando bandeja de reserva...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bandeja-container">
      <h2>Mi Bandeja de Reserva</h2>
      <div className="reserva-info">
        <p><strong>Saldo disponible:</strong> ${reserva.saldo}</p>
        <p><strong>Total gastado:</strong> ${reserva.total || 0}</p>
      </div>

      {reserva.itemsReservados.length === 0 ? (
        <p>Tu bandeja está vacía.</p>
      ) : (
        <div className="items-list">
          {reserva.itemsReservados.map((item) => (
            <div key={item.id} className="item-card">
              <div>
                <h4>{item.nombre || `Plato ID: ${item.id}`}</h4>
                <p>Cantidad: {item.cantidad}</p>
                <p>Precio unitario: ${item.precio}</p>
              </div>

              <div className="acciones-botones">
                {/* Botón para disminuir porciones */}
                <button 
                  onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                  className="btn-cantidad"
                >
                  -
                </button>

                <span>{item.cantidad}</span>

                {/* Botón para aumentar porciones */}
                <button 
                  onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                  className="btn-cantidad"
                >
                  +
                </button>

                {/* Botón para eliminar el plato por completo */}
                <button 
                  onClick={() => eliminarPlato(item.id)}
                  className="btn-eliminar"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BandejaReserva;