import { Badge } from "reactstrap";

const GameHeader = () => {
  return (
    <header className="text-center mb-5">
      <Badge color="primary" pill className="mb-3 px-3 py-2">
          Evaluación 2
      </Badge>

      <h1 className="display-5 fw-bold text-dark mb-3">
        Adivina el número
      </h1>

      <p className="text-secondary mx-auto mb-0">
        ¿Podrás descubrir el número secreto entre 1 y 100?
      </p>
    </header>
  );
}

export default GameHeader;