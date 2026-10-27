import React, { useState, useEffect } from 'react';
import './MenuRestaurante.css'; // Importación del CSS

const MenuCatalog = () => {
  const [platos, setPlatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        // Recuerda cambiar el puerto al correcto de tu servidor Express
        const response = await fetch('http://localhost:3000/api/menu'); 
        if (!response.ok) throw new Error('Error al obtener el catálogo');
        const data = await response.json();
        setPlatos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const handleAddPlato = async (platoId) => {
    try {
      const response = await fetch('http://localhost:3000/api/reserva', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platoId, cantidad: 1 }),
      });
      if (!response.ok) throw new Error('Error al añadir plato');
      alert('Plato añadido exitosamente');
    } catch (err) {
      alert('Hubo un problema al añadir el plato');
    }
  };

  if (loading) return <p>Cargando menú...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="menu-container">
      <h2>Catálogo del Menú</h2>
      <div className="platos-grid">
        {platos.map((plato) => (
          <div key={plato.id} className="plato-card">
            <h3>{plato.nombre}</h3>
            <p><strong>Categoría:</strong> {plato.categoria}</p>
            <p><strong>Precio:</strong> ${plato.precio}</p>
            <p><strong>Stock disponible:</strong> {plato.stock}</p>
            
            <button
              className="btn-add"
              onClick={() => handleAddPlato(plato.id)}
              disabled={plato.stock <= 0}
            >
              {plato.stock > 0 ? 'Añadir a la reserva' : 'Agotado'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuCatalog;