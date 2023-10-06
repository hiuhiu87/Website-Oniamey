// import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./layout/Home";
import ManageUser from "./layout/ManageUser";
import Header from "./components/Header";
import SideMenu from "./components/SideMenu";
import { Container, Row, Col } from "react-bootstrap";

function App() {
  return (
    <Router>
    <Container className="home-container">
      <Header />
      <Row>
        <Col xs={2}>
          <SideMenu />
        </Col>
        <Col lg={10}>
          
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route exact path="/home" element={<Home />} />
              <Route path="/manage-customer" element={<ManageUser />} />
            </Routes>
          
        </Col>
      </Row>
    </Container>
    </Router>
  );
}

export default App;
