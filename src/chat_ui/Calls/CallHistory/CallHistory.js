import React, { Component } from "react";
import avatar2 from "../../../assets/media/avatar/2.png";

import { ReactComponent as VerticalOptionDots } from "../../../assets/media/icons/verticaloptiondots.svg";
import { ReactComponent as BackToList } from "../../../assets/media/icons/backtolist.svg";
import { ReactComponent as CallNowSvg } from "../../../assets/media/icons/callnow.svg";
import { ReactComponent as PhoneOutgoingSvg } from "../../../assets/media/heroicons/solid/phone-outgoing.svg";
import { ReactComponent as PhoneIncomingSvg } from "../../../assets/media/heroicons/solid/phone-incoming.svg";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

// Child Component of Calls
class CallHistory extends Component {
  hideMainVisible = () => {
    this.setState({ toggleChatOption: false });
    this.props.hideMain();
  };

  // Load chat history for user
  render() {
    return (
      <main
        className={
          "main " + (this.props.showMain === true ? "main-visible" : "")
        }
      >
        <div className="calls px-0 py-2 p-xl-3">
          <div className="container-xl">
            <div className="row">
              <div className="col">
                <div className="card card-bg-1 mb-3">
                  <div className="card-body">
                    <div className="d-flex flex-column align-items-center">
                      <div className="avatar avatar-lg mb-3">
                        <img className="avatar-img" src={avatar2} alt=""></img>
                      </div>

                      <div className="d-flex flex-column align-items-center">
                        <h5 className="mb-1">Catherine Richardson</h5>
                        <p className="text-white rounded px-2 bg-primary">
                          +01-202-265462
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="card-options">
                    <Dropdown>
                      <Dropdown.Toggle
                        className="text-muted hw-20 mt-2"
                        as={VerticalOptionDots}
                      ></Dropdown.Toggle>
                      <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
                        <Link className="dropdown-item" to="#">
                          Clear Call Log
                        </Link>
                        <Link className="dropdown-item" to="#">
                          Block
                        </Link>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>

                  <div className="chat-closer d-xl-none">
                    <button
                      className="btn btn-secondary btn-icon btn-minimal btn-sm text-muted"
                      onClick={this.hideMainVisible}
                    >
                      <BackToList />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="row calls-log">
              <div className="col">
                <div className="card">
                  <div className="card-body">
                    <div className="media">
                      <div className="avatar avatar-primary mr-2">
                        <span>
                          <PhoneIncomingSvg className="hw-24" />
                        </span>
                      </div>

                      <div className="media-body">
                        <h6>Incoming Call</h6>

                        <div className="d-flex flex-column flex-sm-row align-items-sm-center align-items-start">
                          <p className="text-muted mb-0">Just now</p>
                          <span className="d-none d-sm-block text-muted mx-2">
                            •
                          </span>
                          <p className="text-muted mb-0">2m 35s</p>
                        </div>
                      </div>

                      <div className="media-options ml-1 d-none d-sm-block">
                        <button
                          className="btn btn-secondary btn-icon btn-minimal btn-sm text-muted"
                          type="button"
                        >
                          <CallNowSvg />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <div className="media">
                      <div className="avatar avatar-primary mr-2">
                        <span>
                          <PhoneOutgoingSvg className="hw-24" />
                        </span>
                      </div>

                      <div className="media-body">
                        <h6>Outgoing Call</h6>
                        <div className="d-flex flex-column flex-sm-row align-items-sm-center align-items-start">
                          <p className="text-muted mb-0">5 mins ago</p>
                          <span className="d-none d-sm-block text-muted mx-2">
                            •
                          </span>
                          <p className="text-muted mb-0">12m 25s</p>
                        </div>
                      </div>

                      <div className="media-options ml-1 d-none d-sm-block">
                        <button
                          className="btn btn-secondary btn-icon btn-minimal btn-sm text-muted"
                          type="button"
                        >
                          <CallNowSvg />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <div className="media">
                      <div className="avatar avatar-primary mr-2">
                        <span>
                          <PhoneIncomingSvg className="hw-24" />
                        </span>
                      </div>

                      <div className="media-body">
                        <h6 className="text-danger">Missed Call</h6>
                        <div className="d-flex flex-column flex-sm-row align-items-sm-center align-items-start">
                          <p className="text-muted mb-0">18 mins ago</p>
                        </div>
                      </div>

                      <div className="media-options ml-1 d-none d-sm-block">
                        <button
                          className="btn btn-secondary btn-icon btn-minimal btn-sm text-muted"
                          type="button"
                        >
                          <CallNowSvg />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <div className="media">
                      <div className="avatar avatar-primary mr-2">
                        <span>
                          <PhoneOutgoingSvg className="hw-24" />
                        </span>
                      </div>

                      <div className="media-body">
                        <h6>Outgoing Call</h6>
                        <div className="d-flex flex-column flex-sm-row align-items-sm-center align-items-start">
                          <p className="text-muted mb-0">
                            Yesterday at 10:45PM
                          </p>
                          <span className="d-none d-sm-block text-muted mx-2">
                            •
                          </span>
                          <p className="text-muted mb-0">25m 18s</p>
                        </div>
                      </div>

                      <div className="media-options ml-1 d-none d-sm-block">
                        <button
                          className="btn btn-secondary btn-icon btn-minimal btn-sm text-muted"
                          type="button"
                        >
                          <CallNowSvg />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <div className="media">
                      <div className="avatar avatar-primary mr-2">
                        <span>
                          <PhoneIncomingSvg className="hw-24" />
                        </span>
                      </div>

                      <div className="media-body">
                        <h6>Incoming Call</h6>

                        <div className="d-flex flex-column flex-sm-row align-items-sm-center align-items-start">
                          <p className="text-muted mb-0">
                            16/05/2020 at 11:49AM
                          </p>
                          <span className="d-none d-sm-block text-muted mx-2">
                            •
                          </span>
                          <p className="text-muted mb-0">0m 56s</p>
                        </div>
                      </div>

                      <div className="media-options ml-1 d-none d-sm-block">
                        <button
                          className="btn btn-secondary btn-icon btn-minimal btn-sm text-muted"
                          type="button"
                        >
                          <CallNowSvg />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <div className="media">
                      <div className="avatar avatar-primary mr-2">
                        <span>
                          <PhoneIncomingSvg className="hw-24" />
                        </span>
                      </div>

                      <div className="media-body">
                        <h6>Incoming Call</h6>

                        <div className="d-flex flex-column flex-sm-row align-items-sm-center align-items-start">
                          <p className="text-muted mb-0">
                            14/05/2020 at 11:49AM
                          </p>
                          <span className="d-none d-sm-block text-muted mx-2">
                            •
                          </span>
                          <p className="text-muted mb-0">24m 19s</p>
                        </div>
                      </div>

                      <div className="media-options ml-1 d-none d-sm-block">
                        <button
                          className="btn btn-secondary btn-icon btn-minimal btn-sm text-muted"
                          type="button"
                        >
                          <CallNowSvg />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
export default CallHistory;
