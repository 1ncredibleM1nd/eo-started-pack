import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";

import { ReactComponent as SearchSvg } from "../../assets/media/icons/search.svg";

// Top chat filter
function ChatFilter() {
  const [selectedOption, setselectedOption] = useState("All Chats");
  return (
    <div className="sidebar-sub-header">
      <Dropdown className="mr-2">
        <Dropdown.Toggle variant="outline-default">
          {selectedOption}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onSelect={() => setselectedOption("All Chats")}>
            All Chats
          </Dropdown.Item>
          <Dropdown.Item onSelect={() => setselectedOption("Friends")}>
            Friends
          </Dropdown.Item>
          <Dropdown.Item onSelect={() => setselectedOption("Groups")}>
            Groups
          </Dropdown.Item>
          <Dropdown.Item onSelect={() => setselectedOption("Unread")}>
            Unread
          </Dropdown.Item>
          <Dropdown.Item onSelect={() => setselectedOption("Archived")}>
            Archived
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <form className="form-inline">
        <div className="input-group">
          <input
            type="text"
            className="form-control search border-right-0 transparent-bg pr-0"
            placeholder="Search users..."
          ></input>
          <div className="input-group-append">
            <div
              className="input-group-text transparent-bg border-left-0"
              role="button"
            >
              <SearchSvg className="text-muted hw-20" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
export default ChatFilter;
