import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, CardBody, Button, Spinner, Alert } from 'reactstrap';
import { useReservaStore } from '../../../store/reservaStore.js';

const BandejaReserva = () => {
  const navigate = useNavigate();
  
  // Extraemos datos y funciones desde Zustand
  const { 
    reserva, 
    loadingReserva, 
    error, 
    fetchReserva, 
    actualizarCantidad, 
    eliminarPlato 
  } = useReservaStore();

  useEffect(() => {
    fetchReserva();
  }, [fetchReserva]);

  if (loadingReserva) return <Container className="mt-5 text-center"><Spinner color="primary" /> <p>Cargando bandeja de reserva...</p></Container>;
  if (error) return <Container className="mt-5"><Alert color="danger">Error: {error}</Alert></Container>;

  return (
    <Container className="my-5" style={{ maxWidth: '800px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0 fw-bold">Mi Bandeja de Reserva</h2>
        <Button color="secondary" className="fw-bold" onClick={() => navigate('/food-dei')}>
          Regresar a ordenar
        </Button>
      </div>

      <div className="d-flex justify-content-around bg-light p-3 rounded mb-4 border shadow-sm">
        <span className="fs-5"><strong>Saldo disponible:</strong> ${reserva.saldo?.toFixed(2) || "0.00"}</span>
        <span className="fs-5"><strong>Total gastado:</strong> ${reserva.total?.toFixed(2) || "0.00"}</span>
      </div>

      {reserva.itemsReservados.length === 0 ? (
        <Alert color="info" className="text-center fw-bold">Tu bandeja está vacía.</Alert>
      ) : (
        <div className="d-flex flex-column gap-3">
          {reserva.itemsReservados.map((item) => (
            <Card key={item.id} className="shadow-sm border">
              <CardBody className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                <div>
                  <h4 className="mb-1 text-dark">{item.nombre || `Plato ID: ${item.id}`}</h4>
                  <p className="mb-0 text-muted">
                    Cantidad: {item.cantidad} | Precio unitario: ${item.precio}
                  </p>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <Button 
                    color="success" 
                    style={{ width: '36px', height: '36px', padding: 0 }}
                    className="fw-bold fs-5 d-flex justify-content-center align-items-center"
                    onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                    disabled={item.cantidad <= 1}
                  >
                    -
                  </Button>

                  <span className="fw-bold fs-5 px-2 text-center" style={{ minWidth: '30px' }}>
                    {item.cantidad}
                  </span>

                  <Button 
                    color="success" 
                    style={{ width: '36px', height: '36px', padding: 0 }}
                    className="fw-bold fs-5 d-flex justify-content-center align-items-center"
                    onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                  >
                    +
                  </Button>

                  <Button 
                    color="danger" 
                    className="fw-bold ms-3"
                    onClick={() => eliminarPlato(item.id)}
                  >
                    Eliminar
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
};

export default BandejaReserva;