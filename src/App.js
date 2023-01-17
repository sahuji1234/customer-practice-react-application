import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from 'reactstrap';
import RightPanel from './Components/LeftPanel';
import LeftPanel from './Components/RightPanel';

function App() {
  return (
    <div className="App">
     <h1>Welcome to Webdirekt</h1>
    <Container>
    <Row>
       <Col>
       <RightPanel />
       </Col>
       {/* <Col md={8}>
        <LeftPanel />
       </Col> */}
     </Row>
    </Container>
    </div>
  );
}

export default App;
