import React, { Component } from "react";
import NavBar from "../NavBar/NavBar";

import CallList from "./CallList/CallList";
import CallHistory from "./CallHistory/CallHistory";
import { ThemeColor } from "../../Config/Config";

// Calls  Component to display call details
class Calls extends Component {
  state = {
    themeColor: Boolean(localStorage.getItem("theme"))
      ? parseInt(localStorage.getItem("theme"))
      : ThemeColor.Light,
    mainVisible: false,
  };

  // Set theme when component load
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

  // Load Call master component
  render() {
    return (
      <div className="chats-tab-open h-100">
        <div className={"main-layout h-100"}>
          <NavBar activeMenu="calls" />

          {/* Call list */}
          <CallList setMainVisible={this.handleMainVisible} />

          {/* Chat history with  */}
          <CallHistory
            showMain={this.state.mainVisible}
            hideMain={this.handleHideMain}
          />

          <div className="backdrop"></div>
        </div>
      </div>
    );
  }
}
export default Calls;
