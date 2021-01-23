import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as AppIconSvg } from "../../assets/media/icons/appicon.svg";
import { ReactComponent as ChatsSvg } from "../../assets/media/icons/chats.svg";
import { ReactComponent as CallsSvg } from "../../assets/media/icons/calls.svg";
import { ReactComponent as FriendsSvg } from "../../assets/media/icons/friends.svg";
import { ReactComponent as AccountSvg } from "../../assets/media/icons/accounts.svg";

function NavBar(props) {
  return (
    <div className="navigation navbar navbar-light bg-primary">
      <Link className="d-none d-xl-block bg-light rounded p-1" to="/">
        <AppIconSvg />
      </Link>

      <ul
        className="nav nav-minimal flex-row flex-grow-1 justify-content-between flex-xl-column justify-content-xl-center"
        id="mainNavTab"
        role="tablist"
      >
        <li className="nav-item">
          <Link
            className={
              "nav-link p-0 py-xl-3 " +
              (props.activeMenu === "chat" ? "active" : "")
            }
            id="chats-tab"
            to="/Chats"
            title="Chats"
          >
            <ChatsSvg />
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={
              "nav-link p-0 py-xl-3 " +
              (props.activeMenu === "calls" ? "active" : "")
            }
            id="calls-tab"
            to="/Calls"
            title="Calls"
          >
            <CallsSvg />
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={
              "nav-link p-0 py-xl-3 " +
              (props.activeMenu === "friends" ? "active" : "")
            }
            id="friends-tab"
            to="/Friends"
            title="Friends"
          >
            <FriendsSvg />
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={
              "nav-link p-0 py-xl-3 " +
              (props.activeMenu === "account" ? "active" : "")
            }
            id="profile-tab"
            to="/Account"
            title="Account"
          >
            <AccountSvg />
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
