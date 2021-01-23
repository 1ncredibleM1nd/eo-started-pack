import React from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

import { ReactComponent as HorizontalOptionDotsSvg } from "../../../../assets/media/icons/horizontaloptiondots.svg";
import { ReactComponent as CopySvg } from "../../../../assets/media/icons/copy.svg";
import { ReactComponent as ReplySvg } from "../../../../assets/media/icons/reply.svg";
import { ReactComponent as ForwardSvg } from "../../../../assets/media/icons/forward.svg";
import { ReactComponent as FavouriteSvg } from "../../../../assets/media/icons/favourite.svg";
import { ReactComponent as DeleteSvg } from "../../../../assets/media/icons/delete.svg";

const MessageDropdown = () => {
  return (
    <Dropdown>
      <Dropdown.Toggle
        className="text-muted hw-20"
        as={HorizontalOptionDotsSvg}
      ></Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-menu">
        <Link className="dropdown-item d-flex align-items-center" to="#">
          <CopySvg />
          <span>Copy</span>
        </Link>
        <Link className="dropdown-item d-flex align-items-center" to="#">
          <ReplySvg />
          <span>Replay</span>
        </Link>
        <Link className="dropdown-item d-flex align-items-center" to="#">
          <ForwardSvg />
          <span>Forward</span>
        </Link>
        <Link className="dropdown-item d-flex align-items-center" to="#">
          <FavouriteSvg />
          <span>Favourite</span>
        </Link>
        <Link
          className="dropdown-item d-flex align-items-center text-danger"
          to="#"
        >
          <DeleteSvg />
          <span>Delete</span>
        </Link>
      </Dropdown.Menu>
    </Dropdown>
  );
};
export default MessageDropdown;
