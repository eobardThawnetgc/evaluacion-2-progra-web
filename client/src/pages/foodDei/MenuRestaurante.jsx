import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { useToastStore } from "../../store/useToast.js";
import { useReservaStore } from "../../store/reservaStore.js";
import NavBar from './components/NavBar.jsx';

const MenuCatalog = () => {
  const showToast = useToastStore((state) => state.showToast);
  const navigate = useNavigate();

  // Extraemos datos y funciones desde Zustand
  const { platos, loadingMenu, error, fetchMenu, agregarPlato, fetchReserva } = useReservaStore();

  useEffect(() => {
    fetchMenu();
    fetchReserva()
  }, [fetchMenu]);

  const handleAddPlato = async (platoId) => {
    const result = await agregarPlato(platoId);
    if (result.success) {
      showToast("success", result.mensaje);
    } else {
      showToast("error", result.mensaje);
    }
  };

  if (loadingMenu) return <Container className="mt-5"><p>Cargando menú...</p></Container>;
  if (error) return <Container className="mt-5"><p className="text-danger">Error: {error}</p></Container>;

  return (
    <Container className="my-5">
      <NavBar />
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Catálogo del Menú</h2>
        <Button color="primary" onClick={() => navigate('/food-dei/reserva')}>
          Ver Bandeja de Reserva
        </Button>
      </div>

      <Row>
        {platos.map((plato) => (
          <Col sm="12" md="6" lg="4" xl="3" className="mb-4" key={plato.id}>
            <Card className="h-100 shadow-sm border-0">
              <CardImg
                top
                width="100%"
                src={plato.imagen || 'https://via.placeholder.com/300x200?text=Sin+Imagen'}
                alt={plato.nombre}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <CardBody className="d-flex flex-column">
                <CardTitle tag="h5" className="fw-bold mb-3">
                  {plato.nombre}
                </CardTitle>
                <CardText className="mb-1">
                  <strong>Categoría:</strong> {plato.categoria}
                </CardText>
                <CardText className="mb-1">
                  <strong>Precio:</strong> ${plato.precio}
                </CardText>
                <CardText className="mb-3">
                  <strong>Stock disponible:</strong> {plato.stock}
                </CardText>

                <Button
                  color="success"
                  className="mt-auto fw-bold"
                  onClick={() => handleAddPlato(plato.id)}
                  disabled={plato.stock <= 0}
                >
                  {plato.stock > 0 ? 'Añadir a la reserva' : 'Agotado'}
                </Button>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MenuCatalog;