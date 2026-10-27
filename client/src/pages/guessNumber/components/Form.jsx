import { useState } from "react";

import { useGuessNumberStore } from "../../../store/useGuessName";

import {
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";

const GameForm = () => {

  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("¿Podrás descubrir el número secreto?");

  const addTry = useGuessNumberStore(
    (state) => state.addNumber
  );

  const cleanTries = useGuessNumberStore(
    (state) => state.cleanHistory
  );

  const sendNumber = async (e) => {
    e.preventDefault();
    try {
      if (number === "") {
        setMessage("Debes ingresar un número");
        return;
      }
      const response = await fetch("http://localhost:3000/guessNumber", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          number: number
        })
      })

      const data = await response.json();
      setMessage(data.message);
      addTry(number, data.result);
      setNumber("");
    } catch (error) {
      console.log("Hubo un errr en el servidor: ", error);
    }
  }

  const reset = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/guessNumber/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      })

      const data = await response.json();
      setMessage(data.message);
      cleanTries();
    } catch (error) {
      console.log("Hubo un error en el servidor: ", error);
    }
  }

  return (
    <Card className="border-0 shadow-sm rounded-4 h-100">
      <CardBody className="p-4 p-md-5">
        <div className="d-flex align-items-center gap-3 mb-4">
          <div>
            <h2 className="h4 fw-bold mb-1">
              {message}
            </h2>
          </div>
        </div>

        <Form onSubmit={sendNumber}>
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
              placeholder="Escribe tu número..."
              className="py-3"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />

            <p className="text-secondary small mt-2 mb-0">
              Introduce un número entero entre 1 y 100.
            </p>
          </FormGroup>

          <div className="d-flex flex-column gap-3">
            <Button
              type="submit"
              color="primary"
              size="lg"
              className="rounded-3 fw-semibold flex-grow-1"
            >
              Adivinar número
            </Button>

            <Button
              type="button"
              color="secondary"
              outline
              size="lg"
              className="rounded-3 fw-semibold flex-grow-1"
              onClick={reset}
            >
              Reiniciar
            </Button>
          </div>
        </Form>

        <hr className="my-4" />
      </CardBody>
    </Card>
  );
}

export default GameForm;