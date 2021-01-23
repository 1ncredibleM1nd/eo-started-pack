import React, { Component } from "react";
import NavBar from "../NavBar/NavBar";

import ChatList from "./ChatList/ChatList";
import ChatHistory from "./ChatHistory/ChatHistory";
import { ThemeColor } from "../../Config/Config";

// Chat master component
class Chats extends Component {
  state = {
    mainVisible: false,
    themeColor: Boolean(localStorage.getItem("theme"))
      ? parseInt(localStorage.getItem("theme"))
      : ThemeColor.Light,
  };

  // Load selected theme
  componentDidMount() {
    let classList = document.body.classList;
    if (classList.length === 0 && this.state.themeColor === ThemeColor.Dark) {
      document.body.classList.add("dark-skin");
    } else if (classList.length && this.state.themeColor === ThemeColor.Light) {
      document.body.classList.remove("dark-skin");
    }
  }

  handleChatClick = () => {
    this.setState({ mainVisible: true });
  };

  handleBackToList = () => {
    this.setState({ mainVisible: false });
  };

  render() {
    return (
      <div className="chats-tab-open h-100">
        <div className={"main-layout h-100"}>
          <NavBar activeMenu="chat" />

          <ChatList handleChatClick={this.handleChatClick} />

          <ChatHistory
            mainVisible={this.state.mainVisible}
            BackToListClicked={this.handleBackToList}
          />
          <div className="backdrop"></div>
        </div>
      </div>
    );
  }
}
export default Chats;
