import React from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

import { ReactComponent as VerticalOptionDots } from "../../../../assets/media/icons/verticaloptiondots.svg";

const DocumentOptionDropdown = () => {
  return (
    <Dropdown>
      <Dropdown.Toggle      
        className="text-muted hw-20 "
        as={VerticalOptionDots}
      ></Dropdown.Toggle>
      <Dropdown.Menu>
        <Link className="dropdown-item" to="#">
          View
        </Link>
        <Link className="dropdown-item" to="#">
          Share
        </Link>
        <Link className="dropdown-item" to="#">
          Delete
        </Link>
      </Dropdown.Menu>
    </Dropdown>
  );
};
export default DocumentOptionDropdown;
