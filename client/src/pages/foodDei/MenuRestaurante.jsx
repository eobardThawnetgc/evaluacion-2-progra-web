import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { useToastStore } from '../../store/useToast.js';

const MenuCatalog = () => {
  const showToast = useToastStore((state) => state.showToast);
  const navigate = useNavigate();

  const [platos, setPlatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/menu');
        if (!response.ok) throw new Error('Error al obtener el catálogo');
        const data = await response.json();
        setPlatos(data);
      } catch (err) {
        setError(err.message);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const handleAddPlato = async (platoId) => {
    try {
      const response = await fetch('http://localhost:3000/api/reserva/agregar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platoID: platoId, cantidad: 1 }), 
      });
      
      const data = await response.json();

      if (!response.ok) throw new Error(data.mensaje);
      showToast("success", data.mensaje);
    } catch (err) {
      showToast("error", err.message);
    }
  };

  if (loading) return <Container className="mt-5"><p>Cargando menú...</p></Container>;
  if (error) return <Container className="mt-5"><p className="text-danger">Error: {error}</p></Container>;

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Catálogo del Menú</h2>
        <Button color="primary" onClick={() => navigate('/reserva')}>
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