import React from "react";
import { Navbar, Container, Form, Button } from "react-bootstrap";
import Image from "react-bootstrap/Image";

import "../assets/style/Header.css";
import logoShop from "../assets/img/ONIEMAY_1.png";

const Header = () => {
  return (
    <Navbar className="bg-link-body-emphasis nav-header">
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
        <Navbar className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login">Nghĩa Pé Oniemay</a>
            <Image src="#" id="user-avatar" roundedCircle/>
          </Navbar.Text>
        </Navbar>
      </Container>
    </Navbar>
  );
};

export default Header;
