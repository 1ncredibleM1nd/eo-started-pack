import React, { Component } from "react";
import avatar4 from "../../../assets/media/avatar/4.png";
import StartConversation from "../../Modals/StartConversation/StartConversation";

// Render when No chat history
class EmptyChat extends Component {
  state = {
    showNewChat: false,
  };
  toggleNewChat = () => {
    this.setState({ showNewChat: !this.state.showNewChat });
  };
  render() {
    return (
      <>
        {this.state.showNewChat ? (
          <StartConversation hideNewChat={this.toggleNewChat} />
        ) : null}
        <main className="main">
          <div className="chats">
            <div className="d-flex flex-column justify-content-center text-center h-100 w-100">
              <div className="container">
                <div className="avatar avatar-lg mb-2">
                  <img className="avatar-img" src={avatar4} alt=""></img>
                </div>
                <h5>Welcome, Christina!</h5>
                <p className="text-muted">
                  Please select a chat to start messaging.
                </p>
                <button
                  className="btn btn-outline-primary no-box-shadow"
                  type="button"
                  data-toggle="modal"
                  data-target="#startConversation"
                  onClick={this.toggleNewChat}
                >
                  Start a conversation
                </button>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }
}
export default EmptyChat;
