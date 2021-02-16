import React, { Component } from "react";
import { Link } from "react-router-dom";

import avatar2 from "../../../assets/media/avatar/2.png";
import avatar3 from "../../../assets/media/avatar/3.png";
import avatar4 from "../../../assets/media/avatar/4.png";
import avatar5 from "../../../assets/media/avatar/5.png";
import avatar6 from "../../../assets/media/avatar/6.png";
import avatar7 from "../../../assets/media/avatar/7.png";
import avatar8 from "../../../assets/media/avatar/8.png";

import ChatAction from "../../ChatAction/ChatAction";
import ChatFilter from "../../ChatFilter/ChatFilter";

import { ReactComponent as UserGroupSvg } from "../../../assets/media/heroicons/outline/user-group.svg";
import { ReactComponent as LockSvg } from "../../../assets/media/icons/lock.svg";
import { ReactComponent as PhotoSvg } from "../../../assets/media/icons/photo.svg";
import { ReactComponent as DocsSvg } from "../../../assets/media/icons/docs.svg";
import { ReactComponent as MuteSvg } from "../../../assets/media/icons/mute.svg";
import { ReactComponent as MissedCallSvg } from "../../../assets/media/icons/missedcall.svg";

// Chat list component - To display list
class ChatList extends Component {
  state = { ChatUserId: "" };

  // Get userid from parameter to load perticular user chat history
  componentDidMount() {
    var params = window.location.href.split("/");
    this.setState({ ChatUserId: params[params.length - 1] });
  }

  handleChatClick = (id) => {
    this.setState({ ChatUserId: id });
    this.props.handleChatClick();
  };

  render() {
    return (
      <aside className="sidebar">
        <div className="tab-content">
          <div className="tab-pane active" id="chats-content">
            <div className="d-flex flex-column h-100">
              <div className="hide-scrollbar h-100" id="chatContactsList">
                <div className="sidebar-header sticky-top p-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="font-weight-semibold mb-0">Chats</h5>
                    <ChatAction />
                  </div>
                  <ChatFilter />
                </div>

                <ul
                  className="contacts-list"
                  id="chatContactTab"
                  data-chat-list=""
                >
                  <li
                    className={
                      "contacts-item friends " +
                      (this.state.ChatUserId === "user1" ? "active" : "")
                    }
                  >
                    <Link
                      className="contacts-link"
                      to="/Chats/user1"
                      onClick={() => {
                        this.handleChatClick("user1");
                      }}
                    >
                      <div className="avatar avatar-online">
                        <img src={avatar2} alt=""></img>
                      </div>
                      <div className="contacts-content">
                        <div className="contacts-info">
                          <h6 className="chat-name text-truncate">
                            Catherine Richardson
                          </h6>
                          <div className="chat-time">Just now</div>
                        </div>
                        <div className="contacts-texts">
                          <p className="text-truncate">
                            I’m sorry, I didn’t catch that. Could you please
                            repeat?
                          </p>
                        </div>
                      </div>
                    </Link>
                  </li>

                  <li
                    className={
                      "contacts-item groups " +
                      (this.state.ChatUserId === "group1" ? "active" : "")
                    }
                  >
                    <Link
                      className="contacts-link"
                      to="/Chats/group1"
                      onClick={() => {
                        this.handleChatClick("group1");
                      }}
                    >
                      <div className="avatar bg-success text-light">
                        <span>
                          <UserGroupSvg />
                        </span>
                      </div>
                      <div className="contacts-content">
                        <div className="contacts-info">
                          <h6 className="chat-name">Themeforest Group</h6>
                          <div className="chat-time">
                            <span>10:20 pm</span>
                          </div>
                        </div>
                        <div className="contacts-texts">
                          <p className="text-truncate">
                            <span>Jeny: </span>That’s pretty common. I heard
                            that a lot of people had the same experience.
                          </p>
                          <div className="d-inline-flex align-items-center ml-1">
                            <LockSvg />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>

                  <li className="contacts-item friends unread">
                    <Link to="#" className="contacts-link">
                      <div className="avatar avatar-offline bg-info text-light">
                        <span>EW</span>
                      </div>
                      <div className="contacts-content">
                        <div className="contacts-info">
                          <h6 className="chat-name">Eva Walker</h6>
                          <div className="chat-time">09:36 am</div>
                        </div>
                        <div className="contacts-texts">
                          <p className="text-truncate">
                            You’re kidding! I drive a motorcycle as well. What
                            type of bike do you have?
                          </p>
                          <div className="badge badge-rounded badge-primary ml-1">
                            2
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>

                  <li className="contacts-item friends">
                    <Link to="#" className="contacts-link">
                      <div className="avatar avatar-busy">
                        <img src={avatar3} alt=""></img>
                      </div>
                      <div className="contacts-content">
                        <div className="contacts-info">
                          <h6 className="chat-name">Christopher Garcia</h6>
                          <div className="chat-time">
                            <span>Yesterday</span>
                          </div>
                        </div>
                        <div className="contacts-texts">
                          <PhotoSvg />
                          <p className="text-truncate">Photo</p>
                        </div>
                      </div>
                    </Link>
                  </li>

                  <li className="contacts-item unread">
                    <Link to="#" className="contacts-link">
                      <div className="avatar avatar-online">
                        <img src={avatar4} alt=""></img>
                      </div>
                      <div className="contacts-content">
                        <div className="contacts-info">
                          <h6 className="chat-name">Christina Turner</h6>
                          <div className="chat-time">
                            <span>31/05/20</span>
                          </div>
                        </div>
                        <div className="contacts-texts">
                          <p className="text-truncate">
                            I’m working hard in Maths, Physics and Chemistry. I
                            have planning to appear in I.I.T. after XII.
                          </p>
                          <div className="badge badge-rounded badge-primary ml-1">
                            10
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>

                  <li className="contacts-item friends">
                    <Link to="#" className="contacts-link">
                      <div className="avatar avatar-offline">
                        <img src={avatar5} alt=""></img>
                      </div>
                      <div className="contacts-content">
                        <div className="contacts-info">
                          <h6 className="chat-name">Tammy Martinez</h6>
                          <div className="chat-time">
                            <span>24/04/20</span>
                          </div>
                        </div>
                        <div className="contacts-texts">
                          <DocsSvg />
                          <p className="text-truncate">
                            project_guidelines.docs
                          </p>
                        </div>
                      </div>
                    </Link>
                  </li>

                  <li className="contacts-item friends">
                    <Link to="#" className="contacts-link">
                      <div className="avatar avatar-online">
                        <img src={avatar6} alt=""></img>
                      </div>
                      <div className="contacts-content">
                        <div className="contacts-info">
                          <h6 className="chat-name">Bonnie Torres</h6>
                          <div className="chat-time">
                            <span>20/04/20</span>
                          </div>
                        </div>
                        <div className="contacts-texts">
                          <p className="text-truncate">
                            Catch you later! Bye-bye!
                          </p>
                          <div className="d-inline-flex align-items-center ml-1">
                            <MuteSvg />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>

                  <li className="contacts-item friends">
                    <Link to="#" className="contacts-link">
                      <div className="avatar avatar-offline">
                        <img src={avatar7} alt=""></img>
                      </div>
                      <div className="contacts-content">
                        <div className="contacts-info">
                          <h6 className="chat-name">Jacqueline James</h6>
                          <div className="chat-time">
                            <span>15/02/20</span>
                          </div>
                        </div>
                        <div className="contacts-texts">
                          <MissedCallSvg />

                          <p className="text-truncate">Missed call</p>
                        </div>
                      </div>
                    </Link>
                  </li>

                  <li className="contacts-item archived">
                    <Link to="#" className="contacts-link">
                      <div className="avatar avatar-away">
                        <img src={avatar8} alt=""></img>
                      </div>
                      <div className="contacts-content">
                        <div className="contacts-info">
                          <h6 className="chat-name">Annie Richardson</h6>
                          <div className="chat-time">
                            <span>26/12/19</span>
                          </div>
                        </div>
                        <div className="contacts-texts">
                          <p className="text-truncate">
                            I think I have everything I need, thank you!
                          </p>
                        </div>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </aside>
    );
  }
}
export default ChatList;
