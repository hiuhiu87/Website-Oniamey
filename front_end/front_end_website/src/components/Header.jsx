import React from "react";
import { Navbar, Container, Form, Button } from "react-bootstrap";
import Image from "react-bootstrap/Image";

import "../assets/style/Header.css";
import logoShop from "../assets/img/ONIEMAY.png";

const Header = () => {
  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">
          <Image src={logoShop} roundedCircle id="image-shop" />
        </Navbar.Brand>
        <Navbar href="#home">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-success">Search</Button>
        </Navbar>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login">Mark Otto</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
