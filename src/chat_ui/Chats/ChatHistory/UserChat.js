import React, { Component } from "react";
import { Link } from "react-router-dom";
import avatar2 from "../../../assets/media/avatar/2.png";
import avatar6 from "../../../assets/media/avatar/6.png";
import photo1 from "../../../assets/media/shared-photos/01.jpg";
import photo2 from "../../../assets/media/shared-photos/02.jpg";
import photo3 from "../../../assets/media/shared-photos/03.jpg";

import { ReactComponent as BackToList } from "../../../assets/media/icons/backtolist.svg";
import { ReactComponent as SearchSvg } from "../../../assets/media/icons/search.svg";
import { ReactComponent as CallNowSvg } from "../../../assets/media/icons/callnow.svg";
import { ReactComponent as VerticalOptionDots } from "../../../assets/media/icons/verticaloptiondots.svg";
import { ReactComponent as InfoSvg } from "../../../assets/media/icons/infosvg.svg";
import { ReactComponent as MuteNotificationsSvg } from "../../../assets/media/icons/mutenotifications.svg";
import { ReactComponent as WallpaperSvg } from "../../../assets/media/icons/wallpaper.svg";
import { ReactComponent as ArchiveSvg } from "../../../assets/media/icons/archive.svg";
import { ReactComponent as DeleteSvg } from "../../../assets/media/icons/delete.svg";
import { ReactComponent as BlockSvg } from "../../../assets/media/icons/block.svg";
import { ReactComponent as ChatDocFileSvg } from "../../../assets/media/icons/chatdocmessage.svg";

import { ReactComponent as ChatPlusSvg } from "../../../assets/media/icons/chatplus.svg";
import { ReactComponent as GallarySvg } from "../../../assets/media/icons/gallary.svg";
import { ReactComponent as AudioSvg } from "../../../assets/media/icons/audio.svg";
import { ReactComponent as ContactSvg } from "../../../assets/media/icons/contact.svg";
import { ReactComponent as LocationSvg } from "../../../assets/media/icons/location.svg";
import { ReactComponent as PollSvg } from "../../../assets/media/icons/poll.svg";
import { ReactComponent as SendMessageSvg } from "../../../assets/media/icons/sendmessage.svg";
import { ReactComponent as AddContactSvg } from "../../../assets/media/icons/addcontact.svg";
import { ReactComponent as HeartSvg } from "../../../assets/media/icons/heart.svg";
import { ReactComponent as CloseSvg } from "../../../assets/media/icons/close.svg";

import { ReactComponent as DocumentsSvg } from "../../../assets/media/icons/documents.svg";
import { ReactComponent as ProfileDocumentsSvg } from "../../../assets/media/icons/profiledocuments.svg";
import { Dropdown } from "react-bootstrap";
import MessageDropdown from "./Dropdowns/MessageDropdown";
import DocumentOptionDropdown from "./Dropdowns/DocumentOptionDropdown";

// User  chat detail component - chat with users
class UserChat extends Component {
  state = {
    showProfileDetail: false,
    chatSearchBox: false,
    showUserInformation: true,
    showLastMedia: true,
    showDocuments: true,
  };

  constructor() {
    super();
    this.messagesEndRef = React.createRef();
  }

  toggleShowProfileDetail = () => {
    this.setState({ showProfileDetail: !this.state.showProfileDetail });
    document.body.click();
  };

  toggleChatSearchBox = () => {
    this.setState({ chatSearchBox: !this.state.chatSearchBox });
    document.body.click();
  };

  toggleShowUserInformation = () => {
    this.setState({ showUserInformation: !this.state.showUserInformation });
  };

  toggleShowLastMedia = () => {
    this.setState({ showLastMedia: !this.state.showLastMedia });
  };

  toggleShowDocuments = () => {
    this.setState({ showDocuments: !this.state.showDocuments });
  };

  componentDidMount() {
    this.messagesEndRef.current.scrollIntoView({
      behavior: "smooth",
    });
  }
  render() {
    return (
      <main className={"main main-visible"}>
        <div className="chats">
          <div className="chat-body">
            <div className="chat-header">
              <Link className="contacts-link" to="/Chats">
                <button
                  className="btn btn-secondary btn-icon btn-minimal btn-sm text-muted d-xl-none"
                  type="button"
                >
                  <BackToList />
                </button>
              </Link>
              <div className="media chat-name align-items-center text-truncate">
                <div className="avatar avatar-online d-none d-sm-inline-block mr-3">
                  <img src={avatar2} alt=""></img>
                </div>
                <div className="media-body align-self-center ">
                  <h6 className="text-truncate mb-0">Catherine Richardson</h6>
                  <small className="text-muted">Online</small>
                </div>
              </div>
              <ul className="nav flex-nowrap">
                <li className="nav-item list-inline-item d-none d-sm-block mr-1">
                  <Link
                    className="nav-link text-muted px-1"
                    onClick={this.toggleChatSearchBox}
                    to="#"
                  >
                    <SearchSvg />
                  </Link>
                </li>
                <li className="nav-item list-inline-item d-none d-sm-block mr-1">
                  <Link
                    className="nav-link text-muted px-1"
                    to="#"
                    title="Call Now"
                  >
                    <CallNowSvg />
                  </Link>
                </li>
                <li className="nav-item list-inline-item d-none d-sm-block mr-0">
                  <Dropdown>
                    <Dropdown.Toggle
                      className="text-muted hw-20 mt-2"
                      as={VerticalOptionDots}
                    ></Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
                      <Link
                        className="dropdown-item align-items-center d-flex"
                        onClick={this.toggleChatSearchBox}
                        to="#"
                      >
                        <SearchSvg className="hw-20 mr-2" />
                        <span>Search</span>
                      </Link>

                      <Link
                        className="dropdown-item align-items-center d-flex"
                        to="#"
                        onClick={this.toggleShowProfileDetail}
                      >
                        <InfoSvg className="hw-20 mr-2" />
                        <span>View Info</span>
                      </Link>
                      <Link
                        className="dropdown-item align-items-center d-flex"
                        to="#"
                      >
                        <MuteNotificationsSvg className="hw-20 mr-2" />
                        <span>Mute Notifications</span>
                      </Link>
                      <Link
                        className="dropdown-item align-items-center d-flex"
                        to="#"
                      >
                        <WallpaperSvg className="hw-20 mr-2" />
                        <span>Wallpaper</span>
                      </Link>
                      <Link
                        className="dropdown-item align-items-center d-flex"
                        to="#"
                      >
                        <ArchiveSvg className="hw-20 mr-2" />
                        <span>Archive</span>
                      </Link>
                      <Link
                        className="dropdown-item align-items-center d-flex"
                        to="#"
                      >
                        <DeleteSvg className="hw-20 mr-2" />
                        <span>Delete</span>
                      </Link>
                      <Link
                        className="dropdown-item align-items-center d-flex text-danger"
                        to="#"
                      >
                        <BlockSvg className="hw-20 mr-2" />
                        <span>Block</span>
                      </Link>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
                <li className="nav-item list-inline-item d-sm-none mr-0">
                  <Dropdown>
                    <Dropdown.Toggle
                      className="text-muted hw-20"
                      as={VerticalOptionDots}
                    ></Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
                      <Link
                        className="dropdown-item align-items-center d-flex"
                        to="#"
                      >
                        <CallNowSvg className="hw-20 mr-2" />
                        <span>Call</span>
                      </Link>
                      <Link
                        className="dropdown-item align-items-center d-flex"
                        onClick={this.toggleChatSearchBox}
                        to="#"
                      >
                        <SearchSvg className="hw-20 mr-2" />
                        <span>Search</span>
                      </Link>
                      <Link
                        className="dropdown-item align-items-center d-flex"
                        to="#"
                        onClick={this.toggleShowProfileDetail}
                      >
                        <InfoSvg className="hw-20 mr-2" />
                        <span>View Info</span>
                      </Link>
                      <Link
                        className="dropdown-item align-items-center d-flex"
                        to="#"
                      >
                        <MuteNotificationsSvg className="hw-20 mr-2" />
                        <span>Mute Notifications</span>
                      </Link>
                      <Link
                        className="dropdown-item align-items-center d-flex"
                        to="#"
                      >
                        <WallpaperSvg className="hw-20 mr-2" />
                        <span>Wallpaper</span>
                      </Link>
                      <Link
                        className="dropdown-item align-items-center d-flex"
                        to="#"
                      >
                        <ArchiveSvg className="hw-20 mr-2" />
                        <span>Archive</span>
                      </Link>
                      <Link
                        className="dropdown-item align-items-center d-flex"
                        to="#"
                      >
                        <DeleteSvg className="hw-20 mr-2" />
                        <span>Delete</span>
                      </Link>
                      <Link
                        className="dropdown-item align-items-center d-flex text-danger"
                        to="#"
                      >
                        <BlockSvg className="hw-20 mr-2" />
                        <span>Block</span>
                      </Link>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
              </ul>
            </div>
            <div
              className={
                "border-bottom px-3 collapse " +
                (this.state.chatSearchBox ? "show" : "")
              }
            >
              <div className="container-xl py-2 px-0 px-md-3">
                <div className="input-group bg-light ">
                  <input
                    type="text"
                    className="form-control form-control-md border-right-0 transparent-bg pr-0"
                    placeholder="Search..."
                  ></input>
                  <div className="input-group-append">
                    <span className="input-group-text transparent-bg border-left-0">
                      <SearchSvg className="hw-20 text-muted" />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="chat-content p-2" id="messageBody">
              <div className="container">
                <div className="message-day">
                  <div
                    className="message-divider sticky-top pb-2"
                    data-label="Yesterday"
                  >
                    &nbsp;
                  </div>
                  <div className="message">
                    <div className="message-wrapper">
                      <div className="message-content">
                        <span>
                          I have to give a presentation on global warming on
                          Friday, and I am so nervous.
                        </span>
                      </div>
                    </div>
                    <div className="message-options">
                      <div className="avatar avatar-sm">
                        <img alt="" src={avatar6}></img>
                      </div>
                      <span className="message-date">9:12am</span>
                      <MessageDropdown />
                    </div>
                  </div>
                  <div className="message self">
                    <div className="message-wrapper">
                      <div className="message-content">
                        <span>
                          First of all, you need to understand the subject
                          matter thoroughly. You need to know what is global
                          warming, what causes global warming, and what people
                          should do to abate the effects of global warming.
                        </span>
                      </div>
                    </div>
                    <div className="message-options">
                      <div className="avatar avatar-sm">
                        <img alt="" src={avatar6}></img>
                      </div>
                      <span className="message-date">9:12am</span>
                      <span className="message-status">Edited</span>
                      <MessageDropdown />
                    </div>
                  </div>
                  <div className="message">
                    <div className="message-wrapper">
                      <div className="message-content">
                        <span>
                          I have done a lot of research on the subject, and I
                          know I can answer any questions I will receive from
                          the audience.
                        </span>
                      </div>
                    </div>
                    <div className="message-options">
                      <div className="avatar avatar-sm">
                        <img alt="" src={avatar6}></img>
                      </div>
                      <span className="message-date">9:12am</span>
                      <MessageDropdown />
                    </div>
                  </div>

                  <div className="message">
                    <div className="message-wrapper">
                      <div className="message-content">
                        <span>
                          I should talk about more precisely the sequence of my
                          presentation?
                        </span>
                      </div>
                    </div>
                    <div className="message-options">
                      <div className="avatar avatar-sm">
                        <img alt="" src={avatar6}></img>
                      </div>
                      <span className="message-date">9:12am</span>
                      <MessageDropdown />
                    </div>
                  </div>
                  <div className="message self">
                    <div className="message-wrapper">
                      <div className="message-content">
                        <span>
                          Yes, what you should present first, second and third…
                        </span>
                      </div>
                    </div>
                    <div className="message-options">
                      <div className="avatar avatar-sm">
                        <img alt="" src={avatar6}></img>
                      </div>
                      <span className="message-date">9:12am</span>
                      <MessageDropdown />
                    </div>
                  </div>
                  <div className="message">
                    <div className="message-wrapper">
                      <div className="message-content">
                        <div className="document">
                          <div className="btn btn-primary btn-icon rounded-circle text-light mr-2">
                            <ChatDocFileSvg />
                          </div>

                          <div className="document-body">
                            <h6>
                              <Link
                                to="#"
                                className="text-reset"
                                title="global-warming-data-2020.xlxs"
                              >
                                global-warming-data-2020.xlxs
                              </Link>
                            </h6>
                            <ul className="list-inline small mb-0">
                              <li className="list-inline-item">
                                <span className="text-muted">79.2 KB</span>
                              </li>
                              <li className="list-inline-item">
                                <span className="text-muted text-uppercase">
                                  xlxs
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="message-options">
                      <div className="avatar avatar-sm">
                        <img alt="" src={avatar6}></img>
                      </div>
                      <span className="message-date">9:12am</span>
                      <MessageDropdown />
                    </div>
                  </div>

                  <div className="message">
                    <div className="message-wrapper">
                      <div className="message-content">
                        <span>
                          If that is the case, then I already have an outline.
                          To make it easy for my audience to follow the
                          presentation, I intend to post the outline on the
                          board at all time during my speech.
                        </span>
                      </div>
                    </div>
                    <div className="message-options">
                      <div className="avatar avatar-sm">
                        <img alt="" src={avatar6}></img>
                      </div>
                      <span className="message-date">9:12am</span>
                      <MessageDropdown />
                    </div>
                  </div>
                </div>

                <div className="message-day">
                  <div
                    className="message-divider sticky-top pb-2"
                    data-label="Today"
                  >
                    &nbsp;
                  </div>

                  <div className="message self">
                    <div className="message-wrapper">
                      <div className="message-content">
                        <span>
                          Good idea! By the way, do you have any facts to back
                          you up? For example, change of climate, yearly
                          disasters…
                        </span>
                      </div>
                    </div>
                    <div className="message-options">
                      <div className="avatar avatar-sm">
                        <img alt="" src={avatar6}></img>
                      </div>

                      <span className="message-date">9:12am</span>
                      <span className="message-status">Edited</span>

                      <MessageDropdown />
                    </div>
                  </div>
                  <div className="message">
                    <div className="message-wrapper">
                      <div className="message-content">
                        <h6>I have shared some photos, Please have a look.</h6>
                        <div className="form-row">
                          <div className="col">
                            <Link to="#" className="popup-media">
                              <img
                                className="img-fluid rounded"
                                src={photo1}
                                alt=""
                              ></img>
                            </Link>
                          </div>
                          <div className="col">
                            <Link to="#" className="popup-media">
                              <img
                                className="img-fluid rounded"
                                src={photo2}
                                alt=""
                              ></img>
                            </Link>
                          </div>
                          <div className="col">
                            <Link to="#" className="popup-media">
                              <img
                                className="img-fluid rounded"
                                src={photo3}
                                alt=""
                              ></img>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="message-options">
                      <div className="avatar avatar-sm">
                        <img alt="" src={avatar6}></img>
                      </div>
                      <span className="message-date">9:12am</span>
                      <MessageDropdown />
                    </div>
                  </div>

                  <div className="message">
                    <div className="message-wrapper">
                      <div className="message-content">
                        <span>
                          No, I have not thought about that. I better get some
                          statistics from the Internet. I should not have any
                          problems since the Internet has all kinds of data.
                        </span>
                      </div>
                    </div>
                    <div className="message-options">
                      <div className="avatar avatar-sm">
                        <img alt="" src={avatar6}></img>
                      </div>
                      <span className="message-date">9:12am</span>
                      <MessageDropdown />
                    </div>
                  </div>
                  <div className="message self">
                    <div className="message-wrapper">
                      <div className="message-content">
                        <span>
                          Pictures will keep your audience from being bored. In
                          order for you to succeed, you need to keep them
                          interested and involved.
                        </span>
                      </div>
                    </div>
                    <div className="message-options">
                      <div className="avatar avatar-sm">
                        <img alt="" src={avatar6}></img>
                      </div>
                      <span className="message-date">9:12am</span>
                      <MessageDropdown />
                    </div>
                  </div>

                  <div className="message">
                    <div className="message-wrapper">
                      <div className="message-content">
                        <span>
                          You are absolutely right. I will take time to practice
                          and to learn to relax and express myself really well.
                          Wish me luck, Catherine!
                        </span>
                      </div>
                    </div>
                    <div className="message-options">
                      <div className="avatar avatar-sm">
                        <img alt="" src={avatar6}></img>
                      </div>
                      <span className="message-date">9:12am</span>
                      <MessageDropdown />
                    </div>
                  </div>

                  <div className="message self">
                    <div className="message-wrapper">
                      <div className="message-content">
                        <span>
                          I know you. You can do it. Good luck, Jennifer!
                        </span>
                      </div>
                    </div>
                    <div className="message-options">
                      <div className="avatar avatar-sm">
                        <img alt="" src={avatar6}></img>
                      </div>
                      <span className="message-date" ref={this.messagesEndRef}>
                        Just now
                      </span>
                      <MessageDropdown />
                    </div>
                  </div>
                </div>
              </div>
              <div className="chat-finished" id="chat-finished"></div>
            </div>
            <div className="chat-footer">
              <div className="form-row align-items-center">
                <div className="col">
                  <div className="input-group">
                    <div className="input-group-prepend mr-sm-2 mr-1">
                      <Dropdown>
                        <Dropdown.Toggle
                          className="text-muted hw-20"
                          as={ChatPlusSvg}
                        ></Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu">
                          <Link className="dropdown-item" to="#">
                            <GallarySvg className="hw-20 mr-2" />
                            <span>Gallery</span>
                          </Link>
                          <Link className="dropdown-item" to="#">
                            <AudioSvg />
                            <span>Audio</span>
                          </Link>
                          <Link className="dropdown-item" to="#">
                            <ChatDocFileSvg className="hw-20 mr-2" />
                            <span>Document</span>
                          </Link>
                          <Link className="dropdown-item" to="#">
                            <ContactSvg />
                            <span>Contact</span>
                          </Link>
                          <Link className="dropdown-item" to="#">
                            <LocationSvg />
                            <span>Location</span>
                          </Link>
                          <Link className="dropdown-item" to="#">
                            <PollSvg />
                            <span>Poll</span>
                          </Link>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                    <textarea
                      className="form-control transparent-bg border-0 no-resize hide-scrollbar"
                      placeholder="Write your message..."
                      rows="1"
                    ></textarea>
                  </div>
                </div>
                <div className="col-auto">
                  <div
                    className="btn btn-primary btn-icon rounded-circle text-light mb-1"
                    role="button"
                  >
                    <SendMessageSvg />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={
              "chat-info " +
              (this.state.showProfileDetail ? "chat-info-visible" : "")
            }
          >
            <div className="d-flex h-100 flex-column">
              <div className="chat-info-header px-2">
                <div className="container-fluid">
                  <ul className="nav justify-content-between align-items-center">
                    <li className="text-center">
                      <h5 className="text-truncate mb-0">Profile Details</h5>
                    </li>
                    <li className="nav-item list-inline-item">
                      <Link
                        className="nav-link text-muted px-0"
                        to="#"
                        onClick={this.toggleShowProfileDetail}
                      >
                        <CloseSvg />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="hide-scrollbar flex-fill">
                <div className="text-center p-3">
                  <div className="avatar avatar-xl mx-5 mb-3">
                    <img className="avatar-img" src={avatar2} alt=""></img>
                  </div>
                  <h5 className="mb-1">Catherine Richardson</h5>
                  <p className="text-muted d-flex align-items-center justify-content-center">
                    <LocationSvg />
                    <span>San Fransisco, CA</span>
                  </p>

                  <div className="d-flex align-items-center justify-content-center">
                    <div className="btn btn-outline-default btn-icon rounded-circle mx-1">
                      <AddContactSvg />
                    </div>
                    <div className="btn btn-primary btn-icon rounded-circle text-light mx-1">
                      <HeartSvg />
                    </div>
                    <div className="btn btn-danger btn-icon rounded-circle text-light mx-1">
                      <BlockSvg />
                    </div>
                  </div>
                </div>
                <div className="chat-info-group">
                  <Link
                    className="chat-info-group-header"
                    data-toggle="collapse"
                    to="#"
                    onClick={this.toggleShowUserInformation}
                  >
                    <h6 className="mb-0">User Information</h6>
                    <InfoSvg className="hw-20 text-muted" />
                  </Link>

                  <div
                    className={
                      "chat-info-group-body collapse " +
                      (this.state.showUserInformation ? "show" : "")
                    }
                  >
                    <div className="chat-info-group-content list-item-has-padding">
                      <ul className="list-group list-group-flush ">
                        <li className="list-group-item border-0">
                          <p className="small text-muted mb-0">Phone</p>
                          <p className="mb-0">+01-222-364522</p>
                        </li>
                        <li className="list-group-item border-0">
                          <p className="small text-muted mb-0">Email</p>
                          <p className="mb-0">catherine.richardson@gmail.com</p>
                        </li>
                        <li className="list-group-item border-0">
                          <p className="small text-muted mb-0">Address</p>
                          <p className="mb-0">
                            1134 Ridder Park Road, San Fransisco, CA 94851
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="chat-info-group">
                  <Link
                    className="chat-info-group-header"
                    data-toggle="collapse"
                    to="#"
                    onClick={this.toggleShowLastMedia}
                  >
                    <h6 className="mb-0">Last Media</h6>
                    <GallarySvg className="hw-20 text-muted" />
                  </Link>

                  <div
                    className={
                      "chat-info-group-body collapse " +
                      (this.state.showLastMedia ? "show" : "")
                    }
                    id="shared-media"
                  >
                    <div className="chat-info-group-content">
                      <div className="form-row">
                        <div className="col-4 col-md-2 col-xl-4">
                          <Link to="#">
                            <img
                              src={photo1}
                              className="img-fluid rounded border"
                              alt=""
                            ></img>
                          </Link>
                        </div>
                        <div className="col-4 col-md-2 col-xl-4">
                          <Link to="#">
                            <img
                              src={photo2}
                              className="img-fluid rounded border"
                              alt=""
                            ></img>
                          </Link>
                        </div>
                        <div className="col-4 col-md-2 col-xl-4">
                          <Link to="#">
                            <img
                              src={photo3}
                              className="img-fluid rounded border"
                              alt=""
                            ></img>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="chat-info-group">
                  <Link
                    className="chat-info-group-header"
                    data-toggle="collapse"
                    to="#"
                    onClick={this.toggleShowDocuments}
                  >
                    <h6 className="mb-0">Documents</h6>
                    <DocumentsSvg className="hw-20 text-muted" />
                  </Link>

                  <div
                    className={
                      "chat-info-group-body collapse " +
                      (this.state.showDocuments ? "show" : "")
                    }
                    id="shared-files"
                  >
                    <div className="chat-info-group-content list-item-has-padding">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                          <div className="document">
                            <div className="btn btn-primary btn-icon rounded-circle text-light mr-2">
                              <ProfileDocumentsSvg />
                            </div>

                            <div className="document-body">
                              <h6 className="text-truncate">
                                <Link
                                  to="#"
                                  className="text-reset"
                                  title="effects-of-global-warming.docs"
                                >
                                  Effects-of-global-warming.docs
                                </Link>
                              </h6>

                              <ul className="list-inline small mb-0">
                                <li className="list-inline-item">
                                  <span className="text-muted">79.2 KB</span>
                                </li>
                                <li className="list-inline-item">
                                  <span className="text-muted text-uppercase">
                                    docs
                                  </span>
                                </li>
                              </ul>
                            </div>

                            <div className="document-options ml-1">
                              <DocumentOptionDropdown />
                            </div>
                          </div>
                        </li>
                        <li className="list-group-item">
                          <div className="document">
                            <div className="btn btn-primary btn-icon rounded-circle text-light mr-2">
                              <ProfileDocumentsSvg />
                            </div>

                            <div className="document-body">
                              <h6 className="text-truncate">
                                <Link
                                  to="#"
                                  className="text-reset"
                                  title="global-warming-data-2020.xlxs"
                                >
                                  Global-warming-data-2020.xlxs
                                </Link>
                              </h6>

                              <ul className="list-inline small mb-0">
                                <li className="list-inline-item">
                                  <span className="text-muted">79.2 KB</span>
                                </li>
                                <li className="list-inline-item">
                                  <span className="text-muted text-uppercase">
                                    xlxs
                                  </span>
                                </li>
                              </ul>
                            </div>

                            <div className="document-options ml-1">
                              <DocumentOptionDropdown />
                            </div>
                          </div>
                        </li>
                        <li className="list-group-item">
                          <div className="document">
                            <div className="btn btn-primary btn-icon rounded-circle text-light mr-2">
                              <ProfileDocumentsSvg />
                            </div>

                            <div className="document-body">
                              <h6 className="text-truncate">
                                <Link
                                  to="#"
                                  className="text-reset"
                                  title="great-presentation-on global-warming-2020.ppt"
                                >
                                  Great-presentation-on global-warming-2020.ppt
                                </Link>
                              </h6>
                              <ul className="list-inline small mb-0">
                                <li className="list-inline-item">
                                  <span className="text-muted">79.2 KB</span>
                                </li>
                                <li className="list-inline-item">
                                  <span className="text-muted text-uppercase">
                                    ppt
                                  </span>
                                </li>
                              </ul>
                            </div>

                            <div className="document-options ml-1">
                              <DocumentOptionDropdown />
                            </div>
                          </div>
                        </li>
                      </ul>
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
export default UserChat;
