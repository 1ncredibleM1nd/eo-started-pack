import React, { Component } from "react";
import { ThemeColor } from "../../Config/Config";
import NavBar from "../NavBar/NavBar";

import Profile from "./Profile/Profile";
import Settings from "./Settings/Settings";

// Account Component - Manage Account Details
class Account extends Component {
  state = {
    themeColor: Boolean(localStorage.getItem("theme"))
      ? parseInt(localStorage.getItem("theme"))
      : ThemeColor.Light,
    mainVisible: false,
  };

  // Set theme when component mount
  componentDidMount() {
    let classList = document.body.classList;
    if (classList.length === 0 && this.state.themeColor === ThemeColor.Dark) {
      document.body.classList.add("dark-skin");
    } else if (classList.length && this.state.themeColor === ThemeColor.Light) {
      document.body.classList.remove("dark-skin");
    }
  }

  handleMainVisible = () => {
    this.setState({ mainVisible: true });
  };

  handleHideMain = () => {
    this.setState({ mainVisible: false });
  };
  render() {
    return (
      <div className="chats-tab-open h-100">
        <div className={"main-layout h-100"}>
          {/* Left Side Nav Bar */}
          <NavBar activeMenu="account" />

          {/* Profile Detail Section */}
          <Profile setMainVisible={this.handleMainVisible} />

          {/* Profile Settings  Section */}
          <Settings
            showMain={this.state.mainVisible}
            hideMain={this.handleHideMain}
          />

          <div className="backdrop"></div>
        </div>
      </div>
    );
  }
}
export default Account;
