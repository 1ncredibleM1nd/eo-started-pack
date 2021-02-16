import React from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ReactComponent as VerticalOptionDots } from "../../../../assets/media/icons/verticaloptiondots.svg";
const GroupParticipantOptionDropdown = () => {
  return (
    <Dropdown>
      <Dropdown.Toggle
        className="text-muted hw-20"
        as={VerticalOptionDots}
      ></Dropdown.Toggle>
      <Dropdown.Menu>
        <Link className="dropdown-item" to="#">
          Make admin
        </Link>
        <Link className="dropdown-item" to="#">
          Remove from group
        </Link>
        <Link className="dropdown-item text-red" to="#">
          Block
        </Link>
      </Dropdown.Menu>
    </Dropdown>
  );
};
export default GroupParticipantOptionDropdown;
