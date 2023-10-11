import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import DashBoard from "./layout/DashBoard";
import ManageCustomer from "./layout/ManageCustomer";
import ManageUser from "./layout/ManageUser";
import Header from "./components/Header";
import SideMenu from "./components/SideMenu";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "./components/Footer";
import "../src/assets/style/GlobalStyle.css";

function App() {
  const style = {
    flex: 1,
  };

  return (
    <Router>
      <Container className="home-container">
        <Container style={style}>
          <Row>
            <Header />
            <Col xs={2}>
              <SideMenu />
            </Col>
            <Col lg={10}>
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route exact path="/dashboard" element={<DashBoard />} />
                <Route path="/manage-customer" element={<ManageCustomer />} />
                <Route path="/manage-user" element={<ManageUser />} />
              </Routes>
            </Col>
          </Row>
        </Container>
        <Footer />
      </Container>
    </Router>
  );
}

export default App;
