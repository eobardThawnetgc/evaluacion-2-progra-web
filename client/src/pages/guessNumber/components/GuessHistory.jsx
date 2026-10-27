import { useGuessNumberStore } from "../../../store/useGuessName";

import {
  Badge,
  Card,
  CardBody,
  ListGroup,
  ListGroupItem,
} from "reactstrap";

const GuessHistory = () => {

  const history = useGuessNumberStore(
    (state) => state.history
  );

  return (
    <Card className="border-0 shadow-sm rounded-4 h-100">
      <CardBody className="p-4">
        <div className="d-flex justify-content-between align-items-start gap-2 mb-4">
          <div>
            <p className="text-primary fw-semibold small mb-2">
              TU PROGRESO
            </p>

            <h2 className="h5 fw-bold mb-0">
              Historial de intentos
            </h2>
          </div>

          <Badge color="light" className="text-secondary">
            {history.length} intentos
          </Badge>
        </div>

        {/* Contenedor con scroll vertical */}
        <div
          style={{
            maxHeight: "250px",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <ListGroup flush>
            {history.map((guess, index) => (
              <ListGroupItem
                key={index}
                className="d-flex justify-content-between align-items-center px-0 py-3"
              >
                <div className="d-flex align-items-center gap-3">
                  <span className="text-secondary small">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="fw-bold fs-5">
                    {guess.number}
                  </span>
                </div>

                <Badge color={guess.color} pill>
                  {guess.result}
                </Badge>
              </ListGroupItem>
            ))}
          </ListGroup>
        </div>

        {history.length === 0 && (
          <div className="bg-light rounded-3 p-3 mt-3">
            <p className="text-secondary small mb-0">
              Aquí aparecerán tus intentos durante la partida.
            </p>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default GuessHistory;
