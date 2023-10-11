import React from "react";
import { Container, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faSquareInstagram,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <Container>
      <footer
        className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top"
      >
        <Col md={4} className="d-flex align-items-center">
          <a
            href="/"
            className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
          >
          </a>
          <span className="text-muted">© 2021 Oniamey Fashion, Inc</span>
        </Col>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <a className="text-muted" href="/">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
          </li>
          <li className="ms-3">
            <a className="text-muted" href="/">
              <FontAwesomeIcon icon={faSquareInstagram} />
            </a>
          </li>
          <li className="ms-3">
            <a className="text-muted" href="/">
              <FontAwesomeIcon icon={faTelegram} />
            </a>
          </li>
        </ul>
      </footer>
    </Container>
  );
}

export default Footer;
