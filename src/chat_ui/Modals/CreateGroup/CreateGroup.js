import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import avatar1 from "../../../assets/media/avatar/1.png";
import avatar2 from "../../../assets/media/avatar/2.png";
import avatar3 from "../../../assets/media/avatar/3.png";
import avatar4 from "../../../assets/media/avatar/4.png";
import avatar5 from "../../../assets/media/avatar/5.png";

import { ReactComponent as SearchSvg } from "../../../assets/media/icons/search.svg";

class CreateGroup extends Component {
  state = { isPublicGroup: true, selectedMembers: [] };
  setModalShow = () => {
    this.props.hideNewGroup();
  };
  setPublicGroup = (isPublic) => {
    this.setState({ isPublicGroup: isPublic });
  };

  toggleSelectedMembers = (Id) => {
    let selectedMembers = [...this.state.selectedMembers];
    if (selectedMembers.includes(Id))
      selectedMembers = selectedMembers.filter((x) => x !== Id);
    else selectedMembers.push(Id);
    this.setState({ selectedMembers: selectedMembers });
  };

  render() {
    return (
      <Modal show={true} scrollable={true} onHide={this.setModalShow} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>Create a New Group</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-0 hide-scrollbar">
          <div className="row pt-2">
            <div className="col-12">
              <div className="form-group">
                <label>Group name</label>
                <input
                  type="text"
                  className="form-control form-control-md"
                  id="groupName"
                  placeholder="Type group name here"
                ></input>
              </div>
            </div>
            <div className="col-12">
              <div className="form-group">
                <label>Choose profile picture</label>
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="profilePictureInput"
                    accept="image/*"
                  ></input>
                  <label className="custom-file-label">Choose file</label>
                </div>
              </div>
            </div>

            <div className="col-12">
              <div className="row">
                <div className="col-12">
                  <div className="form-group mb-0">
                    <label>Group privacy</label>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group rounded p-2 border">
                    <div className="custom-control custom-radio">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        value="option1"
                        checked={this.state.isPublicGroup}
                        onChange={() => {
                          this.setPublicGroup(true);
                        }}
                      ></input>
                      <label
                        className="form-check-label"
                        onClick={() => {
                          this.setPublicGroup(true);
                        }}
                      >
                        Public group
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group rounded p-2 border">
                    <div className="custom-control custom-radio">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        value="option2"
                        checked={this.state.isPublicGroup === false}
                        onChange={() => {
                          this.setPublicGroup(false);
                        }}
                      ></input>
                      <label
                        className="form-check-label"
                        onClick={() => {
                          this.setPublicGroup(false);
                        }}
                      >
                        Private group
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="row pt-2"
            data-step="2"
            data-title="Add Group Members"
          >
            <div className="col-12 px-0">
              <form className="form-inline w-100 px-2 pb-2 border-bottom">
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

            <div className="col-12 px-0">
              <ul className="list-group list-group-flush">
                <li
                  className="list-group-item"
                  onClick={() => this.toggleSelectedMembers(1)}
                >
                  <div className="media">
                    <div className="avatar avatar-online mr-2">
                      <img src={avatar1} alt=""></img>
                    </div>

                    <div className="media-body">
                      <h6 className="text-truncate">
                        <Link to="#" className="text-reset">
                          Catherine Richardson
                        </Link>
                      </h6>

                      <p className="text-muted mb-0">Online</p>
                    </div>

                    <div className="media-options">
                      <div className="custom-control custom-checkbox">
                        <input
                          className="custom-control-input"
                          type="checkbox"
                          checked={this.state.selectedMembers.includes(1)}
                          onChange={() => {}}
                        ></input>
                        <label className="custom-control-label"></label>
                      </div>
                    </div>
                  </div>
                  <label className="media-label"></label>
                </li>

                <li
                  className="list-group-item"
                  onClick={() => this.toggleSelectedMembers(2)}
                >
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

                    <div className="media-options">
                      <div className="custom-control custom-checkbox">
                        <input
                          className="custom-control-input"
                          type="checkbox"
                          checked={this.state.selectedMembers.includes(2)}
                          onChange={() => {}}
                        ></input>
                        <label className="custom-control-label"></label>
                      </div>
                    </div>
                  </div>
                  <label className="media-label"></label>
                </li>

                <li
                  className="list-group-item"
                  onClick={() => this.toggleSelectedMembers(3)}
                >
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
                    <div className="media-options">
                      <div className="custom-control custom-checkbox">
                        <input
                          className="custom-control-input"
                          type="checkbox"
                          checked={this.state.selectedMembers.includes(3)}
                          onChange={() => {}}
                        ></input>
                        <label className="custom-control-label"></label>
                      </div>
                    </div>
                  </div>
                  <label className="media-label"></label>
                </li>

                <li
                  className="list-group-item"
                  onClick={() => this.toggleSelectedMembers(4)}
                >
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
                    <div className="media-options">
                      <div className="custom-control custom-checkbox">
                        <input
                          className="custom-control-input"
                          type="checkbox"
                          checked={this.state.selectedMembers.includes(4)}
                          onChange={() => {}}
                        ></input>
                        <label className="custom-control-label"></label>
                      </div>
                    </div>
                  </div>
                  <label className="media-label"></label>
                </li>

                <li
                  className="list-group-item"
                  onClick={() => this.toggleSelectedMembers(5)}
                >
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
                    <div className="media-options">
                      <div className="custom-control custom-checkbox">
                        <input
                          className="custom-control-input"
                          type="checkbox"
                          checked={this.state.selectedMembers.includes(5)}
                          onChange={() => {}}
                        ></input>
                        <label className="custom-control-label"></label>
                      </div>
                    </div>
                  </div>
                  <label className="media-label"></label>
                </li>
              </ul>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="link"
            className="text-muted mr-auto"
            onClick={this.setModalShow}
          >
            Cancel
          </Button>
          <Button className="btn btn-success" onClick={this.setModalShow}>
            Create Group
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default CreateGroup;
