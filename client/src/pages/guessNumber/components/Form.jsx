import {
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Badge
} from "reactstrap";

const GameForm = () => {
  return (
    <Card className="border-0 shadow-sm rounded-4 h-100">
      <CardBody className="p-4 p-md-5">
        <div className="d-flex align-items-center gap-3 mb-4">
          <div className="bg-primary bg-opacity-10 text-primary rounded-3 p-3 fw-bold">
            01
          </div>

          <div>
            <h2 className="h4 fw-bold mb-1">
              Tu próximo intento
            </h2>

            <p className="text-secondary small mb-0">
              Elegí un número del 1 al 100.
            </p>
          </div>
        </div>

        <Form>
          <FormGroup className="mb-4">
            <Label for="guessNumber" className="fw-semibold">
              Tu número
            </Label>

            <Input
              id="guessNumber"
              name="guessNumber"
              type="number"
              min="1"
              max="100"
              placeholder="Escribí tu número..."
              className="py-3"
            />

            <p className="text-secondary small mt-2 mb-0">
              Introducí un número entero entre 1 y 100.
            </p>
          </FormGroup>

          <Button
            type="button"
            color="primary"
            size="lg"
            block
            className="rounded-3 fw-semibold"
          >
            Adivinar número →
          </Button>
        </Form>

        <hr className="my-4" />

        <div className="d-flex justify-content-between align-items-center">
          <span className="text-secondary small">
            Rango permitido
          </span>

          <Badge color="light" className="text-primary px-3 py-2">
            01 — 100
          </Badge>
        </div>
      </CardBody>
    </Card>
  );
}

export default GameForm;