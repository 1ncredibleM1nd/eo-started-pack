import React, { Component } from "react";

import avatar2 from "../../../assets/media/avatar/2.png";
import avatar3 from "../../../assets/media/avatar/3.png";
import avatar4 from "../../../assets/media/avatar/4.png";
import avatar5 from "../../../assets/media/avatar/5.png";
import avatar6 from "../../../assets/media/avatar/6.png";
import avatar7 from "../../../assets/media/avatar/7.png";

import ChatAction from "../../ChatAction/ChatAction";
import ChatFilter from "../../ChatFilter/ChatFilter";

import { ReactComponent as MissedCallSvg } from "../../../assets/media/icons/missedcall.svg";
import { ReactComponent as CallsSvg } from "../../../assets/media/icons/calls.svg";
import { ReactComponent as PhoneOutgoingSvg } from "../../../assets/media/heroicons/solid/phone-outgoing.svg";
import { ReactComponent as PhoneIncomingSvg } from "../../../assets/media/heroicons/solid/phone-incoming.svg";
import { ReactComponent as CallNowSvg } from "../../../assets/media/icons/callnow.svg";
import { Link } from "react-router-dom";

// Call list Component
class CallList extends Component {
  setVisible = () => {
    this.props.setMainVisible();
  };

  render() {
    return (
      <aside className="sidebar">
        <div className="tab-content">
          <div className="tab-pane active" id="calls-content">
            <div className="d-flex flex-column h-100">
              <div className="hide-scrollbar h-100" id="callContactsList">
                <div className="sidebar-header sticky-top p-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="font-weight-semibold mb-0">Calls</h5>
                    <ChatAction />
                  </div>
                  <ChatFilter />
                </div>

                <ul className="contacts-list" id="callLogTab" data-call-list="">
                  <li className="contacts-item incoming active">
                    <Link
                      to="#"
                      className="media-link"
                      onClick={this.setVisible}
                    ></Link>
                    <div className="contacts-link">
                      <div className="avatar">
                        <img src={avatar2} alt=""></img>
                      </div>
                      <div className="contacts-content">
                        <div className="contacts-info">
                          <h6 className="chat-name text-truncate">
                            Catherine Richardson
                          </h6>
                        </div>
                        <div className="contacts-texts">
                          <MissedCallSvg className="hw-16 text-muted mr-1" />
                          <p className="text-muted mb-0">Just now</p>
                        </div>
                      </div>
                      <div className="contacts-action">
                        <button
                          className="btn btn-secondary btn-icon btn-minimal btn-sm text-muted"
                          type="button"
                        >
                          <CallsSvg className="hw-20" />
                        </button>
                      </div>
                    </div>
                  </li>

                  <li className="contacts-item outgoing">
                    <Link to="#" className="media-link"></Link>
                    <div className="contacts-link outgoing">
                      <div className="avatar bg-info text-light">
                        <span>EW</span>
                      </div>
                      <div className="contacts-content">
                        <div className="contacts-info">
                          <h6 className="chat-name text-truncate">
                            Eva Walker
                          </h6>
                        </div>
                        <div className="contacts-texts">
                          <PhoneOutgoingSvg className="hw-16 text-muted mr-1" />
                          <p className="text-muted mb-0">5 mins ago</p>
                        </div>
                      </div>
                      <div className="contacts-action">
                        <button
                          className="btn btn-secondary btn-icon btn-minimal btn-sm text-muted"
                          type="button"
                        >
                          <CallNowSvg />
                        </button>
                      </div>
                    </div>
                  </li>

                  <li className="contacts-item missed">
                    <Link to="#" className="media-link"></Link>
                    <div className="contacts-link missed">
                      <div className="avatar">
                        <img src={avatar3} alt=""></img>
                      </div>
                      <div className="contacts-content">
                        <div className="contacts-info">
                          <h6 className="chat-name text-truncate">
                            Christopher Garcia
                          </h6>
                        </div>
                        <div className="contacts-texts">
                          <MissedCallSvg className="hw-16 text-danger mr-1" />
                          <p className="text-danger mb-0">20 mins ago</p>
                        </div>
                      </div>
                      <div className="contacts-action">
                        <button
                          className="btn btn-secondary btn-icon btn-minimal btn-sm text-muted"
                          type="button"
                        >
                          <CallNowSvg />
                        </button>
                      </div>
                    </div>
                  </li>

                  <li className="contacts-item outgoing">
                    <Link to="#" className="media-link"></Link>
                    <div className="contacts-link outgoing">
                      <div className="avatar">
                        <img src={avatar4} alt=""></img>
                      </div>
                      <div className="contacts-content">
                        <div className="contacts-info">
                          <h6 className="chat-name text-truncate">
                            Christina Turner
                          </h6>
                        </div>
                        <div className="contacts-texts">
                          <PhoneOutgoingSvg className="hw-16 text-muted mr-1" />
                          <p className="text-muted mb-0">4 hour ago</p>
                        </div>
                      </div>
                      <div className="contacts-action">
                        <button
                          className="btn btn-secondary btn-icon btn-minimal btn-sm text-muted"
                          type="button"
                        >
                          <CallNowSvg />
                        </button>
                      </div>
                    </div>
                  </li>

                  <li className="contacts-item incoming">
                    <Link to="#" className="media-link"></Link>
                    <div className="contacts-link incoming">
                      <div className="avatar">
                        <img src={avatar5} alt=""></img>
                      </div>
                      <div className="contacts-content">
                        <div className="contacts-info">
                          <h6 className="chat-name text-truncate">
                            Tammy Martinez
                          </h6>
                        </div>
                        <div className="contacts-texts">
                          <PhoneIncomingSvg />
                          <p className="text-muted mb-0">Yesterday</p>
                        </div>
                      </div>
                      <div className="contacts-action">
                        <button
                          className="btn btn-secondary btn-icon btn-minimal btn-sm text-muted"
                          type="button"
                        >
                          <CallNowSvg />
                        </button>
                      </div>
                    </div>
                  </li>

                  <li className="contacts-item incoming">
                    <Link to="#" className="media-link"></Link>
                    <div className="contacts-link incoming">
                      <div className="avatar">
                        <img src={avatar6} alt=""></img>
                      </div>
                      <div className="contacts-content">
                        <div className="contacts-info">
                          <h6 className="chat-name text-truncate">
                            Bonnie Torres
                          </h6>
                        </div>
                        <div className="contacts-texts">
                          <PhoneIncomingSvg />
                          <p className="text-muted mb-0">12/06/2020</p>
                        </div>
                      </div>
                      <div className="contacts-action">
                        <button
                          className="btn btn-secondary btn-icon btn-minimal btn-sm text-muted"
                          type="button"
                        >
                          <CallNowSvg />
                        </button>
                      </div>
                    </div>
                  </li>

                  <li className="contacts-item outgoing">
                    <Link to="#" className="media-link"></Link>
                    <div className="contacts-link outgoing">
                      <div className="avatar">
                        <img src={avatar7} alt=""></img>
                      </div>
                      <div className="contacts-content">
                        <div className="contacts-info">
                          <h6 className="chat-name text-truncate">
                            Jacqueline James
                          </h6>
                        </div>
                        <div className="contacts-texts">
                          <PhoneOutgoingSvg />
                          <p className="text-muted mb-0">16/05/2020</p>
                        </div>
                      </div>
                      <div className="contacts-action">
                        <button
                          className="btn btn-secondary btn-icon btn-minimal btn-sm text-muted"
                          type="button"
                        >
                          <CallNowSvg />
                        </button>
                      </div>
                    </div>
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
export default CallList;
