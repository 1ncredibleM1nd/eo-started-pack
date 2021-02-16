import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import Switch from "react-switch";

import { ReactComponent as BackToList } from "../../../assets/media/icons/backtolist.svg";

class Settings extends Component {
  state = {
    enableTwoFactor: false,
    readReceipt: false,
    unrecognisedLogins: false,
  };
  handleTwoFactorChange = () => {
    this.setState({ enableTwoFactor: !this.state.enableTwoFactor });
  };
  handleReadReceipt = () => {
    this.setState({ readReceipt: !this.state.readReceipt });
  };
  handleUnrecognisedLogins = () => {
    this.setState({ unrecognisedLogins: !this.state.unrecognisedLogins });
  };
  hideMainVisible = () => {
    this.props.hideMain();
  };
  render() {
    return (
      <main
        className={
          "main " + (this.props.showMain === true ? "main-visible" : "")
        }
      >
        <div className="profile flex-column">
          <div className="page-main-heading sticky-top py-2 px-3 mb-3">
            <button
              className="btn btn-secondary btn-icon btn-minimal btn-sm text-muted d-xl-none"
              type="button"
              onClick={this.hideMainVisible}
            >
              <BackToList />
            </button>
            <div className="pl-2 pl-xl-0">
              <h5 className="font-weight-semibold">Settings</h5>
              <p className="text-muted mb-0">
                Update Personal Information &amp; Settings
              </p>
            </div>
          </div>

          <div className="container-xl px-2 px-sm-3">
            <div className="row">
              <div className="col">
                <div className="card mb-3">
                  <div className="card-header">
                    <h6 className="mb-1">Account</h6>
                    <p className="mb-0 text-muted small">
                      Update personal &amp; contact information
                    </p>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6 col-12">
                        <div className="form-group">
                          <label>First Name</label>
                          <input
                            type="text"
                            className="form-control form-control-md"
                            id="firstName"
                            placeholder="Type your first name"
                            // value="Catherine"
                          ></input>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="form-group">
                          <label>Last Name</label>
                          <input
                            type="text"
                            className="form-control form-control-md"
                            id="lastName"
                            placeholder="Type your last name"
                            // value="Richardson"
                          ></input>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="form-group">
                          <label>Mobile number</label>
                          <input
                            type="text"
                            className="form-control form-control-md"
                            id="mobileNumber"
                            placeholder="Type your mobile number"
                            //value="+01-222-364522"
                          ></input>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="form-group">
                          <label>Birth date</label>
                          <input
                            type="date"
                            className="form-control form-control-md"
                            id="birthDate"
                            placeholder="dd/mm/yyyy"
                            // value="20/11/1992"
                          ></input>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="form-group">
                          <label>Email address</label>
                          <input
                            type="email"
                            className="form-control form-control-md"
                            id="emailAddress"
                            placeholder="Type your email address"
                            // value="catherine.richardson@gmail.com"
                          ></input>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="form-group">
                          <label>Website</label>
                          <input
                            type="text"
                            className="form-control form-control-md"
                            id="webSite"
                            placeholder="Type your website"
                            //value="www.catherichardson.com"
                          ></input>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group">
                          <label>Address</label>
                          <input
                            type="text"
                            className="form-control form-control-md"
                            id="Address"
                            placeholder="Type your address"
                            //value="1134 Ridder Park Road, San Fransisco, CA 94851"
                          ></input>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card-footer d-flex justify-content-end">
                    <button
                      type="button"
                      className="btn btn-link text-muted mx-1"
                    >
                      Reset
                    </button>
                    <button type="button" className="btn btn-primary">
                      Save Changes
                    </button>
                  </div>
                </div>

                <div className="card mb-3">
                  <div className="card-header">
                    <h6 className="mb-1">Social network profiles</h6>
                    <p className="mb-0 text-muted small">
                      Update personal &amp; contact information
                    </p>
                  </div>

                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6 col-12">
                        <div className="form-group">
                          <label>Facebook</label>
                          <input
                            type="text"
                            className="form-control form-control-md"
                            id="facebookId"
                            placeholder="Username"
                          ></input>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="form-group">
                          <label>Twitter</label>
                          <input
                            type="text"
                            className="form-control form-control-md"
                            id="twitterId"
                            placeholder="Username"
                          ></input>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="form-group">
                          <label>Instagram</label>
                          <input
                            type="text"
                            className="form-control form-control-md"
                            id="instagramId"
                            placeholder="Username"
                          ></input>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="form-group">
                          <label>Linkedin</label>
                          <input
                            type="text"
                            className="form-control form-control-md"
                            id="linkedinId"
                            placeholder="Username"
                          ></input>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card-footer d-flex justify-content-end">
                    <button
                      type="button"
                      className="btn btn-link text-muted mx-1"
                    >
                      Reset
                    </button>
                    <button type="button" className="btn btn-primary">
                      Save Changes
                    </button>
                  </div>
                </div>

                <div className="card mb-3">
                  <div className="card-header">
                    <h6 className="mb-1">Password</h6>
                    <p className="mb-0 text-muted small">
                      Update personal &amp; contact information
                    </p>
                  </div>

                  <div className="card-body">
                    <form>
                      <div className="row">
                        <div className="col-md-6 col-12">
                          <div className="form-group">
                            <label>Current Password</label>
                            <input
                              type="password"
                              className="form-control form-control-md"
                              id="current-password"
                              placeholder="Current password"
                              autoComplete="on"
                            ></input>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 col-12">
                          <div className="form-group">
                            <label>New Password</label>
                            <input
                              type="password"
                              className="form-control form-control-md"
                              id="new-password"
                              placeholder="New password"
                              autoComplete="on"
                            ></input>
                          </div>
                        </div>
                        <div className="col-md-6 col-12">
                          <div className="form-group">
                            <label>Repeat Password</label>
                            <input
                              type="password"
                              className="form-control form-control-md"
                              id="repeat-password"
                              placeholder="Repeat password"
                              autoComplete="on"
                            ></input>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>

                  <div className="card-footer d-flex justify-content-end">
                    <button
                      type="button"
                      className="btn btn-link text-muted mx-1"
                    >
                      Reset
                    </button>
                    <button type="button" className="btn btn-primary">
                      Save Changes
                    </button>
                  </div>
                </div>

                <div className="card mb-3">
                  <div className="card-header">
                    <h6 className="mb-1">Privacy</h6>
                    <p className="mb-0 text-muted small">
                      Update personal &amp; contact information
                    </p>
                  </div>

                  <div className="card-body p-0">
                    <ul className="list-group list-group-flush list-group-sm-column">
                      <li className="list-group-item py-2">
                        <div className="media align-items-center">
                          <div className="media-body">
                            <p className="mb-0">Profile Picture</p>
                            <p className="small text-muted mb-0">
                              Select who can see my profile picture
                            </p>
                          </div>
                          <div className="dropdown mr-2">
                            <Dropdown>
                              <Dropdown.Toggle
                                className="btn dropdown-toggle"
                                variant="outline-primary"
                              >
                                Public
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item>Public</Dropdown.Item>
                                <Dropdown.Item>Friends</Dropdown.Item>
                                <Dropdown.Item>Selected Friends</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>
                      </li>

                      <li className="list-group-item py-2">
                        <div className="media align-items-center">
                          <div className="media-body">
                            <p className="mb-0">Last Seen</p>
                            <p className="small text-muted mb-0">
                              Select who can see my last seen
                            </p>
                          </div>
                          <div className="dropdown mr-2">
                            <Dropdown>
                              <Dropdown.Toggle
                                className="btn dropdown-toggle"
                                variant="outline-primary"
                              >
                                Public
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item>Public</Dropdown.Item>
                                <Dropdown.Item>Friends</Dropdown.Item>
                                <Dropdown.Item>Selected Friends</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>
                      </li>

                      <li className="list-group-item py-2">
                        <div className="media align-items-center">
                          <div className="media-body">
                            <p className="mb-0">Groups</p>
                            <p className="small text-muted mb-0">
                              Select who can add you in groups
                            </p>
                          </div>
                          <div className="dropdown mr-2">
                            <Dropdown>
                              <Dropdown.Toggle
                                className="btn dropdown-toggle"
                                variant="outline-primary"
                              >
                                Public
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item>Public</Dropdown.Item>
                                <Dropdown.Item>Friends</Dropdown.Item>
                                <Dropdown.Item>Selected Friends</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>
                      </li>

                      <li className="list-group-item py-2">
                        <div className="media align-items-center">
                          <div className="media-body">
                            <p className="mb-0">Status</p>
                            <p className="small text-muted mb-0">
                              Select who can see my status updates
                            </p>
                          </div>
                          <div className="dropdown mr-2">
                            <Dropdown>
                              <Dropdown.Toggle
                                className="btn dropdown-toggle"
                                variant="outline-primary"
                              >
                                Public
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item>Public</Dropdown.Item>
                                <Dropdown.Item>Friends</Dropdown.Item>
                                <Dropdown.Item>Selected Friends</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>
                      </li>

                      <li className="list-group-item py-2">
                        <div className="media align-items-center">
                          <div className="media-body">
                            <p className="mb-0">Read receipts</p>
                            <p className="small text-muted mb-0">
                              If turn off this option you won't be able to see
                              read recipts
                            </p>
                          </div>
                          <Switch
                            className="mr-2"
                            uncheckedIcon={false}
                            height={20}
                            width={40}
                            onChange={this.handleReadReceipt}
                            checked={this.state.readReceipt}
                          />
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="card-footer d-flex justify-content-end">
                    <button
                      type="button"
                      className="btn btn-link text-muted mx-1"
                    >
                      Reset
                    </button>
                    <button type="button" className="btn btn-primary">
                      Save Changes
                    </button>
                  </div>
                </div>

                <div className="card mb-3">
                  <div className="card-header">
                    <h6 className="mb-1">Security</h6>
                    <p className="mb-0 text-muted small">
                      Update personal &amp; contact information
                    </p>
                  </div>

                  <div className="card-body p-0">
                    <ul className="list-group list-group-flush list-group-sm-column">
                      <li className="list-group-item py-2">
                        <div className="media align-items-center">
                          <div className="media-body">
                            <p className="mb-0">
                              Use two-factor authentication
                            </p>
                            <p className="small text-muted mb-0">
                              Ask for a code if attempted login from an
                              unrecognised device or browser.
                            </p>
                          </div>
                          <Switch
                            className="mr-2"
                            uncheckedIcon={false}
                            height={20}
                            width={40}
                            onChange={this.handleTwoFactorChange}
                            checked={this.state.enableTwoFactor}
                          />
                        </div>
                      </li>
                      <li className="list-group-item py-2">
                        <div className="media align-items-center">
                          <div className="media-body">
                            <p className="mb-0">
                              Get alerts about unrecognised logins
                            </p>
                            <p className="small text-muted mb-0">
                              You will be notified if anyone logs in from a
                              device or browser you don't usually use
                            </p>
                          </div>
                          <Switch
                            className="mr-2"
                            uncheckedIcon={false}
                            height={20}
                            width={40}
                            onChange={this.handleUnrecognisedLogins}
                            checked={this.state.unrecognisedLogins}
                          />
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="card-footer d-flex justify-content-end">
                    <button className="btn btn-link text-muted mx-1">
                      Reset
                    </button>
                    <button className="btn btn-primary" type="button">
                      Save Changes
                    </button>
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
export default Settings;
