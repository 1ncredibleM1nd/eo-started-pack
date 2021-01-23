import React, { Component } from "react";
import avatar3 from "../../../assets/media/avatar/3.png";

import { ReactComponent as ChatSvg } from "../../../assets/media/heroicons/outline/chat.svg";
import { ReactComponent as CallsSvg } from "../../../assets/media/icons/calls.svg";
import { ReactComponent as VerticalOptionDots } from "../../../assets/media/icons/verticaloptiondots.svg";
import { ReactComponent as BackToList } from "../../../assets/media/icons/backtolist.svg";
import { ReactComponent as ClockSvg } from "../../../assets/media/heroicons/outline/clock.svg";
import { ReactComponent as CalendarSvg } from "../../../assets/media/heroicons/outline/calendar.svg";
import { ReactComponent as MailSvg } from "../../../assets/media/heroicons/outline/mail.svg";
import { ReactComponent as GlobeSvg } from "../../../assets/media/heroicons/outline/globe.svg";
import { ReactComponent as HomeSvg } from "../../../assets/media/heroicons/outline/home.svg";
import { ReactComponent as FacebookSvg } from "../../../assets/media/icons/facebook.svg";
import { ReactComponent as TwitterSvg } from "../../../assets/media/icons/twitter.svg";
import { ReactComponent as InstagramSvg } from "../../../assets/media/icons/instagram.svg";
import { ReactComponent as LinkedinSvg } from "../../../assets/media/icons/linkedin.svg";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

// Friend profile detail
class FriendProfile extends Component {
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
        <div className="friends px-0 py-2 p-xl-3">
          <div className="container-xl">
            <div className="row">
              <div className="col">
                <div className="card card-body card-bg-1 mb-3">
                  <div className="d-flex flex-column align-items-center">
                    <div className="avatar avatar-lg mb-3">
                      <img className="avatar-img" src={avatar3} alt=""></img>
                    </div>

                    <div className="d-flex flex-column align-items-center">
                      <h5 className="mb-1">Catherine Richardson</h5>
                      <div className="d-flex mt-2">
                        <div className="btn btn-primary btn-icon rounded-circle text-light mx-2">
                          <ChatSvg />
                        </div>
                        <div className="btn btn-success btn-icon rounded-circle text-light mx-2">
                          <CallsSvg />
                        </div>
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
                          Remove
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
                      type="button"
                      data-close=""
                      onClick={this.hideMainVisible}
                    >
                      <BackToList />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="row friends-info">
              <div className="col">
                <div className="card">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <div className="media align-items-center">
                        <div className="media-body">
                          <p className="small text-muted mb-0">Local Time</p>
                          <p className="mb-0">10:25 PM</p>
                        </div>
                        <ClockSvg className="text-muted hw-20" />
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="media align-items-center">
                        <div className="media-body">
                          <p className="small text-muted mb-0">Birthdate</p>
                          <p className="mb-0">20/11/1992</p>
                        </div>
                        <CalendarSvg className="text-muted hw-20" />
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="media align-items-center">
                        <div className="media-body">
                          <p className="small text-muted mb-0">Phone</p>
                          <p className="mb-0">+01-222-364522</p>
                        </div>
                        <CallsSvg className="text-muted hw-20" />
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="media align-items-center">
                        <div className="media-body">
                          <p className="small text-muted mb-0">Email</p>
                          <p className="mb-0">catherine.richardson@gmail.com</p>
                        </div>
                        <MailSvg className="text-muted hw-20" />
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="media align-items-center">
                        <div className="media-body">
                          <p className="small text-muted mb-0">Website</p>
                          <p className="mb-0">www.catherichardson.com</p>
                        </div>
                        <GlobeSvg className="text-muted hw-20" />
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="media align-items-center">
                        <div className="media-body">
                          <p className="small text-muted mb-0">Address</p>
                          <p className="mb-0">
                            1134 Ridder Park Road, San Fransisco, CA 94851
                          </p>
                        </div>
                        <HomeSvg className="text-muted hw-20" />
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="card">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <div className="media align-items-center">
                        <div className="media-body">
                          <p className="small text-muted mb-0">Facebook</p>
                          <Link
                            className="font-size-sm font-weight-medium"
                            to="#"
                          >
                            @cathe.richardson
                          </Link>
                        </div>
                        <FacebookSvg className="text-muted hw-20" />
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="media align-items-center">
                        <div className="media-body">
                          <p className="small text-muted mb-0">Twitter</p>
                          <Link
                            className="font-size-sm font-weight-medium"
                            to="#"
                          >
                            @cathe.richardson
                          </Link>
                        </div>
                        <TwitterSvg className="text-muted hw-20" />
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="media align-items-center">
                        <div className="media-body">
                          <p className="small text-muted mb-0">Instagram</p>
                          <Link
                            className="font-size-sm font-weight-medium"
                            to="#"
                          >
                            @cathe.richardson
                          </Link>
                        </div>
                        <InstagramSvg className="text-muted hw-20" />
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="media align-items-center">
                        <div className="media-body">
                          <p className="small text-muted mb-0">Linkedin</p>
                          <Link
                            className="font-size-sm font-weight-medium"
                            to="#"
                          >
                            @cathe.richardson
                          </Link>
                        </div>
                        <LinkedinSvg className="text-muted hw-20" />
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
export default FriendProfile;
