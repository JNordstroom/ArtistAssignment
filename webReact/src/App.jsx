// Only import your sass in App (not every component)
import "./sass/main.scss";

// Import some Bootstrap components

import { Container, Row, Col, Button } from 'react-bootstrap';

export default function App() {
  return <>
    
    <Container className="mt-5">
      <Row>
        <Col>
          <h1>Start</h1>
          
        </Col>
      </Row>
    </Container>
  </>;
}