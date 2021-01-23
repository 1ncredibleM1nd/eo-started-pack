import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import avatar1 from "../../../assets/media/avatar/1.png";
import avatar2 from "../../../assets/media/avatar/2.png";
import avatar3 from "../../../assets/media/avatar/3.png";
import avatar4 from "../../../assets/media/avatar/4.png";
import avatar5 from "../../../assets/media/avatar/5.png";

import { ReactComponent as SearchSvg } from "../../../assets/media/icons/search.svg";

// Start a conversion
class StartConversation extends Component {
  setModalShow = () => {
    this.props.hideNewChat();
  };

  render() {
    return (
      <Modal show={true} scrollable={true} onHide={this.setModalShow} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>New Chat</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0 hide-scrollbar">
          <div className="row">
            <div className="col-12">
              <form className="form-inline w-100 p-2 border-bottom">
                <div className="input-group w-100 bg-light">
                  <input
                    type="text"
                    className="form-control form-control-md search border-right-0 transparent-bg pr-0"
                    placeholder="Search..."
                  ></input>
                  <div className="input-group-append">
                    <div
                      className="input-group-text transparent-bg border-left-0"
                      role="button"
                    >
                      <SearchSvg />
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="col-12">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <div className="media">
                    <div className="avatar avatar-online mr-2">
                      <img src={avatar1} alt="avatar1"></img>
                    </div>

                    <div className="media-body">
                      <h6 className="text-truncate">
                        <Link className="text-reset" to="#">
                          Catherine Richardson
                        </Link>
                      </h6>
                      <p className="text-muted mb-0">Online</p>
                    </div>
                  </div>
                </li>

                <li className="list-group-item">
                  <div className="media">
                    <div className="avatar avatar-online mr-2">
                      <img src={avatar2} alt=""></img>
                    </div>

                    <div className="media-body">
                      <h6 className="text-truncate">
                        <Link to="#" className="text-reset">
                          Katherine Schneider
                        </Link>
                      </h6>
                      <p className="text-muted mb-0">Online</p>
                    </div>
                  </div>
                </li>

                <li className="list-group-item">
                  <div className="media">
                    <div className="avatar avatar-offline mr-2">
                      <img src={avatar3} alt=""></img>
                    </div>

                    <div className="media-body">
                      <h6 className="text-truncate">
                        <Link to="#" className="text-reset">
                          Brittany K. Williams
                        </Link>
                      </h6>

                      <p className="text-muted mb-0">Offline</p>
                    </div>
                  </div>
                </li>

                <li className="list-group-item">
                  <div className="media">
                    <div className="avatar avatar-busy mr-2">
                      <img src={avatar4} alt=""></img>
                    </div>
                    <div className="media-body">
                      <h6 className="text-truncate">
                        <Link to="#" className="text-reset">
                          Christina Turner
                        </Link>
                      </h6>
                      <p className="text-muted mb-0">Busy</p>
                    </div>
                  </div>
                </li>

                <li className="list-group-item">
                  <div className="media">
                    <div className="avatar avatar-away mr-2">
                      <img src={avatar5} alt=""></img>
                    </div>

                    <div className="media-body">
                      <h6 className="text-truncate">
                        <Link to="#" className="text-reset">
                          Annie Richardson
                        </Link>
                      </h6>
                      <p className="text-muted mb-0">Away</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}
export default StartConversation;
