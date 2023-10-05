import React from "react";
import Header from "../components/Header";
import { Container, Row, Col } from "react-bootstrap";
import SideMenu from "../components/SideMenu";

const Home = () => {

    return (
        <Container className="home-container">
        <Header />
        <Row>
          <Col sm={2}>
            <SideMenu isOpen/>
          </Col>
          <Col >2 of 3 (wider)</Col>
        </Row>
      </Container>
    );

};

export default Home;