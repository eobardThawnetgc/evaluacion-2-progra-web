import { Container, Row, Col } from "reactstrap";

import GameHeader from "./components/GameHeader";
import GameForm from "./components/Form";
import GuessHistory from "./components/GuessHistory";

const GuessNumber = () => {
  return (
    <main className="bg-light min-vh-100 py-5">
      <Container>
        <Row className="justify-content-center">
          <Col xs="12" lg="10" xl="9">
            <GameHeader />

            <Row className="g-4">
              <Col xs="12" lg="7">
                <GameForm />
              </Col>

              <Col xs="12" lg="5">
                <GuessHistory />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default GuessNumber;