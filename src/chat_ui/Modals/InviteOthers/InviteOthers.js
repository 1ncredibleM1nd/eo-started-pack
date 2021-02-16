import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";

// Invitation modal component
class InviteOthers extends Component {
  state = { isPublicGroup: true };
  setModalShow = () => {
    this.props.hideInviteOthers();
  };
  render() {
    return (
      <Modal
        show={true}
        scrollable={true}
        onHide={() => this.setModalShow(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>Invite Others</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="hide-scrollbar">
          <form>
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <label>Email address</label>
                  <input
                    type="email"
                    className="form-control form-control-md"
                    id="inviteEmailAddress"
                    placeholder="Type email address here"
                  ></input>
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <label>Invitation message</label>
                  <textarea
                    className="form-control form-control-md no-resize hide-scrollbar"
                    id="inviteMessage"
                    placeholder="Write your message here"
                    rows="3"
                  ></textarea>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="link"
            className="text-muted"
            onClick={() => {
              this.setModalShow(false);
            }}
          >
            Close
          </Button>
          <Button
            className="btn btn-success"
            onClick={() => {
              this.setModalShow(false);
            }}
          >
            Send Invitation
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default InviteOthers;
