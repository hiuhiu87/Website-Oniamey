import React from "react";
import { useState } from "react";
import { Accordion, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

const SubMenu = (props) => {
  const title = props.title;
  const items = props.items;
  const icon = props.icon;
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Nav.Item className={classNames({ open: !collapsed })}>
      <Nav.Link onClick={toggleNavbar}>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0"></Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>{title}</Accordion.Header>
            {items.map((item, index) => (
              <Accordion.Body key={index}>
                <Nav.Link href="/" className="pl-5">
                  {item}
                </Nav.Link>
              </Accordion.Body>
            ))}
          </Accordion.Item>
        </Accordion>
      </Nav.Link>
    </Nav.Item>
  );
};

export default SubMenu;
