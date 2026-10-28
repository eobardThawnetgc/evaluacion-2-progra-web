
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Card,
  CardBody,
  Button,
  Spinner,
  Alert
} from 'reactstrap';

import { useReservaStore } from '../../../store/reservaStore.js';
import { useToastStore } from '../../../store/useToast.js';
import NavBar from './NavBar.jsx';

// Ajustá este valor si tu backend utiliza otro puerto.
const API_URL = 'http://localhost:3000';

const BandejaReserva = () => {
  const navigate = useNavigate();
  const [confirmando, setConfirmando] = useState(false);

  const showToast = useToastStore((state) => state.showToast);

  const {
    reserva,
    loadingReserva,
    error,
    fetchReserva,
    fetchMenu,
    actualizarCantidad,
    eliminarPlato
  } = useReservaStore();

  useEffect(() => {
    fetchReserva();
  }, [fetchReserva]);

  const handleConfirmarReserva = async () => {
    if (!reserva.itemsReservados?.length || confirmando) {
      return;
    }

    setConfirmando(true);

    try {
      const response = await fetch(
        `${API_URL}/api/reserva/confirmar`,
        { method: 'POST' }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.mensaje || 'No se pudo confirmar la reserva.'
        );
      }

      // El backend ya descontó el saldo y vació la reserva.
      // Sincronizamos el estado local con el servidor.
      await Promise.all([
        fetchReserva(),
        fetchMenu()
      ]);

      showToast('success', data.mensaje || '¡Reserva confirmada correctamente!');
    } catch (err) {
      showToast(
        'error',
        err.message || 'Ocurrió un error al confirmar la reserva.'
      );
    } finally {
      setConfirmando(false);
    }
  };

  if (loadingReserva) {
    return (
      <Container className="mt-5 text-center">
        <Spinner color="primary" />
        <p>Cargando bandeja de reserva...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert color="danger">
          Error: {error}
        </Alert>
      </Container>
    );
  }

  const items = reserva?.itemsReservados ?? [];

  return (
    <Container className="my-5" style={{ maxWidth: '800px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <h2 className="mb-0 fw-bold">
          Mi Bandeja de Reserva
        </h2>

        <Button
          color="secondary"
          className="fw-bold"
          onClick={() => navigate('/food-dei')}
          disabled={confirmando}
        >
          Regresar a ordenar
        </Button>
      </div>

      <NavBar />

      {items.length === 0 ? (
        <Alert color="info" className="text-center fw-bold">
          Tu bandeja está vacía. ¡Regresá al menú para elegir tus platos!
        </Alert>
      ) : (
        <>
          <div className="d-flex flex-column gap-3">
            {items.map((item) => (
              <Card key={item.id} className="shadow-sm border">
                <CardBody className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                  <div>
                    <h4 className="mb-1 text-dark">
                      {item.nombre || `Plato ID: ${item.id}`}
                    </h4>

                    <p className="mb-0 text-muted">
                      Cantidad: {item.cantidad} | Precio unitario: $
                      {Number(item.precio).toFixed(2)}
                    </p>
                  </div>

                  <div className="d-flex align-items-center gap-2">
                    <Button
                      color="success"
                      style={{ width: '36px', height: '36px', padding: 0 }}
                      className="fw-bold fs-5 d-flex justify-content-center align-items-center"
                      onClick={() =>
                        actualizarCantidad(item.id, item.cantidad - 1)
                      }
                      disabled={item.cantidad <= 1 || confirmando}
                    >
                      -
                    </Button>

                    <span
                      className="fw-bold fs-5 px-2 text-center"
                      style={{ minWidth: '30px' }}
                    >
                      {item.cantidad}
                    </span>

                    <Button
                      color="success"
                      style={{ width: '36px', height: '36px', padding: 0 }}
                      className="fw-bold fs-5 d-flex justify-content-center align-items-center"
                      onClick={() =>
                        actualizarCantidad(item.id, item.cantidad + 1)
                      }
                      disabled={confirmando}
                    >
                      +
                    </Button>

                    <Button
                      color="danger"
                      className="fw-bold ms-3"
                      onClick={() => eliminarPlato(item.id)}
                      disabled={confirmando}
                    >
                      Eliminar
                    </Button>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>

          <div className="mt-4 d-flex justify-content-end">
            <Button
              color="success"
              size="lg"
              className="fw-bold"
              onClick={handleConfirmarReserva}
              disabled={confirmando || items.length === 0}
            >
              {confirmando ? (
                <>
                  <Spinner size="sm" className="me-2" />
                  Confirmando reserva...
                </>
              ) : (
                'Confirmar reserva'
              )}
            </Button>
          </div>
        </>
      )}
    </Container>
  );
};

export default BandejaReserva;
