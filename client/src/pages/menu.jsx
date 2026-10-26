import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    CardText,
    Button,
    Badge,
} from 'reactstrap';

import { Link } from 'react-router-dom';

const MenuPage = () => {
    const ejercicios = [
        {
            id: 1,
            numero: '01',
            titulo: 'Adivina el número',
            descripcion:
                'Pon a prueba tu intuición y descubre el número secreto entre 1 y 100.',
            ruta: '/guessNumber',
            color: '#1769FF',
            fondo: '#E8F0FF',
        },
        {
            id: 2,
            numero: '02',
            titulo: 'Food DEI S.A. de R.L.',
            descripcion:
                'Explora el menú del restaurante, selecciona tus platillos y administra tu reserva.',
            ruta: '/food-dei',
            color: '#198754',
            fondo: '#E5F6EC',
        },
    ]

    return (
        <div
            style={{
                minHeight: '100vh',
                backgroundColor: '#F5F7FA',
                fontFamily: 'Segoe UI, sans-serif',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Container className="py-5">
                <div className="text-center mb-5">
                    <Badge color="primary" pill className="mb-3 px-3 py-2">
                        Evaluación 2
                    </Badge>

                    <h1
                        style={{
                            fontSize: 'clamp(32px, 5vw, 48px)',
                            fontWeight: 750,
                            color: '#212529',
                            letterSpacing: '-1.5px',
                            marginBottom: '14px',
                        }}
                    >
                        ¿Qué ejercicio deseas abrir?
                    </h1>
                </div>

                <Row className="g-4 justify-content-center">
                    {ejercicios.map((ejercicio) => (
                        <Col xs="12" md="6" lg="5" key={ejercicio.id}>
                            <Card
                                className="h-100"
                                style={{
                                    border: '1px solid #EEF0F3',
                                    borderRadius: '20px',
                                    boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                                    overflow: 'hidden',
                                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)'
                                    e.currentTarget.style.boxShadow =
                                        '0 12px 28px rgba(0,0,0,0.09)'
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)'
                                    e.currentTarget.style.boxShadow =
                                        '0 4px 16px rgba(0,0,0,0.04)'
                                }}
                            >
                                <CardBody className="p-4 p-lg-5 d-flex flex-column">
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <span
                                            style={{
                                                fontSize: '14px',
                                                fontWeight: 700,
                                                color: ejercicio.color,
                                                backgroundColor: ejercicio.fondo,
                                                padding: '8px 12px',
                                                borderRadius: '9px',
                                            }}
                                        >
                                            {ejercicio.numero}
                                        </span>
                                    </div>

                                    <div className="mb-3">
                                        <CardTitle
                                            tag="h2"
                                            style={{
                                                fontSize: '25px',
                                                fontWeight: 750,
                                                color: '#212529',
                                                lineHeight: 1.3,
                                                minHeight: '65px',
                                            }}
                                        >
                                            {ejercicio.titulo}
                                        </CardTitle>

                                        <CardText
                                            className="text-secondary"
                                            style={{
                                                fontSize: '15px',
                                                lineHeight: 1.8,
                                                minHeight: '80px',
                                            }}
                                        >
                                            {ejercicio.descripcion}
                                        </CardText>
                                    </div>

                                    <div className="mt-auto pt-3">
                                        <Button
                                            tag={Link}
                                            to={ejercicio.ruta}
                                            block
                                            style={{
                                                width: '100%',
                                                backgroundColor: ejercicio.color,
                                                borderColor: ejercicio.color,
                                                borderRadius: '10px',
                                                padding: '14px',
                                                fontWeight: 650,
                                                fontSize: '16px',
                                            }}
                                        >
                                            Abrir
                                        </Button>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    )
}

export default MenuPage;