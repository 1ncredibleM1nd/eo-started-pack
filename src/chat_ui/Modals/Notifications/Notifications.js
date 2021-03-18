import React, { Component } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/SettingsModal";

import { ReactComponent as AddContactSvg } from "../../../assets/media/icons/addcontact.svg";
import { ReactComponent as CheckCircleSvg } from "../../../assets/media/heroicons/outline/check-circle.svg";
import { ReactComponent as PhotographSvg } from "../../../assets/media/heroicons/outline/photograph.svg";
import { Link } from "react-router-dom";

// Notification list component
class Notifications extends Component {
  setModalShow = () => {
    this.props.hideNotification();
  };
  render() {
    return (
      <Modal
        show={true}
        scrollable={true}
        onHide={() => this.setModalShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>Notifications</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0 hide-scrollbar">
          <div className="row">
            <div className="col-12">
              <ul className="list-group list-group-flush  py-2">
                <li className="list-group-item">
                  <div className="media">
                    <div className="btn btn-primary btn-icon rounded-circle text-light mr-2">
                      <AddContactSvg />
                    </div>

                    <div className="media-body">
                      <h6>
                        <Link to="#">Catherine richardson</Link> send you a
                        friend request
                      </h6>
                      <p className="text-muted mb-0">5 mins ago</p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center mt-2">
                    <button
                      type="button"
                      className="btn btn-outline-danger mx-1"
                    >
                      Reject
                    </button>
                    <button type="button" className="btn btn-primary mx-1">
                      Accept
                    </button>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="media">
                    <div className="btn btn-primary btn-icon rounded-circle text-light mr-2">
                      <CheckCircleSvg />
                    </div>

                    <div className="media-body">
                      <h6>
                        <Link to="#">Katelyn Valdez</Link> accepted your friend
                        request
                      </h6>
                      <p className="text-muted mb-0">25 mins ago</p>
                    </div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="media">
                    <div className="btn btn-primary btn-icon rounded-circle text-light mr-2">
                      <PhotographSvg />
                    </div>
                    <div className="media-body">
                      <h6>
                        <Link to="#">Eva Walker</Link> updated profile picture
                      </h6>
                      <p className="text-muted mb-0">5 mins ago</p>
                    </div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="media">
                    <div className="btn btn-primary btn-icon rounded-circle text-light mr-2">
                      <CheckCircleSvg />
                    </div>
                    <div className="media-body">
                      <h6>
                        <Link to="#">Bonnie Torres</Link> accepted your friend
                        request
                      </h6>
                      <p className="text-muted mb-0">5 mins ago</p>
                    </div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="media">
                    <div className="btn btn-primary btn-icon rounded-circle text-light mr-2">
                      <PhotographSvg />
                    </div>
                    <div className="media-body">
                      <h6>
                        <Link to="#">Christopher Garcia</Link> updated profile
                        picture
                      </h6>
                      <p className="text-muted mb-0">5 mins ago</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button
            variant="link"
            className="text-muted"
            onClick={() => this.setModalShow(false)}
          >
            Clear all
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default Notifications;
