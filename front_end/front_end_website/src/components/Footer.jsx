import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {

  const styleFooter = {
    position: "absolute",
    left: 0,
    bottom: 0,
    right: 0,
  };

  return (
    <div class="container" style={styleFooter}>
      <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div class="col-md-4 d-flex align-items-center">
          <a
            href="/"
            class="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
          >
            <FontAwesomeIcon icon="fa-brands fa-facebook" />
          </a>
          <span class="text-muted">© 2021 Oniamey Fashion, Inc</span>
        </div>

        <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li class="ms-3">
            <a class="text-muted" href="#">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
          </li>
          <li class="ms-3">
            <a class="text-muted" href="#">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </li>
          <li class="ms-3">
            <a class="text-muted" href="#">
              <FontAwesomeIcon icon={faTelegram} />
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Footer;
