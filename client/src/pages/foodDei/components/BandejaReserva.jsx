import { useState, useEffect } from "react";
import { Card, CardBody, CardTitle, ListGroup, ListGroupItem, ButtonGroup, Button, UncontrolledAlert } from "reactstrap";

const BandejaReserva = () => {
  const [resumen, setResumen] = useState(null);
  const [error, setError] = useState(null);

  const fetchReserva = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/reserva");
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.mensaje || "Error al obtener la reserva");
      }
      
      setResumen(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchReserva();
  }, []);

  const actualizarCantidad = async (id, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;

    try {
      const response = await fetch(`http://localhost:3000/api/reserva/actualizar-porciones/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cantidad: nuevaCantidad }), 
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.mensaje || "Error al actualizar las porciones");
      }

      fetchReserva(); 
      setError(null);
    } catch (err) {
      setError(err.message); 
    }
  };

  const eliminarPlato = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/reserva/eliminar/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.mensaje || "Error al eliminar el platillo");
      }

      fetchReserva();
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const items = resumen?.itemsReservados || [];

  return (
    <Card 
      style={{
        border: '1px solid #EEF0F3',
        borderRadius: '20px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
        fontFamily: 'Segoe UI, sans-serif',
        overflow: 'hidden'
      }}
    >
      <CardBody className="p-4 p-lg-5">
        
        {/* Título de la bandeja con el estilo del número "02" */}
        <CardTitle 
          tag="h4" 
          style={{
            fontWeight: 750,
            color: '#212529',
            marginBottom: '25px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <span
            style={{
              fontSize: '14px',
              fontWeight: 700,
              color: '#198754',
              backgroundColor: '#E5F6EC',
              padding: '8px 12px',
              borderRadius: '9px',
            }}
          >
            🛒
          </span>
          Bandeja de Reserva
        </CardTitle>

        {error && (
          <UncontrolledAlert color="warning" style={{ borderRadius: '10px' }}>
            {error}
          </UncontrolledAlert>
        )}

        <ListGroup flush>
          {items.length === 0 ? (
            <ListGroupItem className="text-center text-secondary border-0 py-4" style={{ fontSize: '15px' }}>
              Tu bandeja está vacía.
            </ListGroupItem>
          ) : (
            items.map((item) => (
              <ListGroupItem key={item.id} className="d-flex justify-content-between align-items-center px-0 py-3 border-bottom">
                <div>
                  <strong style={{ color: '#212529', fontSize: '15px' }}>{item.nombre || `Platillo #${item.id}`}</strong>
                  <br/>
                  <small className="text-secondary" style={{ fontSize: '13px' }}>Porciones: {item.cantidad}</small>
                </div>
                
                <div className="d-flex align-items-center gap-2">
                  <ButtonGroup size="sm">
                    <Button 
                      color="secondary" 
                      outline
                      onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                      disabled={item.cantidad <= 1}
                    >
                      -
                    </Button>
                    <Button disabled color="light" className="text-dark fw-bold border-secondary">
                      {item.cantidad}
                    </Button>
                    <Button 
                      color="secondary" 
                      outline
                      onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                    >
                      +
                    </Button>
                  </ButtonGroup>

                  <Button 
                    color="danger" 
                    outline 
                    size="sm"
                    style={{ borderRadius: '6px' }}
                    onClick={() => eliminarPlato(item.id)}
                  >
                    Quitar
                  </Button>
                </div>
              </ListGroupItem>
            ))
          )}
        </ListGroup>

        {resumen && (
          <div className="mt-4 pt-4 text-end" style={{ borderTop: '2px dashed #EEF0F3' }}>
             <h6 className="mb-2 text-secondary" style={{ fontSize: '15px' }}>
               Saldo restante: <span style={{ color: '#212529', fontWeight: 650 }}>${resumen.saldo?.toFixed(2) || "0.00"}</span>
             </h6>
             <h5 className="mb-0 fw-bold" style={{ color: '#198754', fontSize: '24px' }}>
               Total: ${resumen.total?.toFixed(2) || "0.00"}
             </h5>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default BandejaReserva;