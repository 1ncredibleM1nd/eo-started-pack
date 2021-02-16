import React, { Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import IStores, { IContactStore, IUserStore } from '@stores/interface';


type IProps = {
    contactStore?: IContactStore,
    userStore?: IUserStore,
}

const Settings = inject((stores: IStores) => ({}))(
    observer((props: IProps) => {



        return (
            <Fragment>
                <aside className="sidebar">
                    <div className="tab-content">
                        <div className="tab-pane active" id="profile-content">
                            <div className="d-flex flex-column h-100">
                                <div className="hide-scrollbar">


                                    <div className="sidebar-header sticky-top p-2 mb-3">
                                        <h5 className="font-weight-semibold">Profile</h5>
                                        <p className="text-muted mb-0">
                                            Personal Information & Settings
                  </p>
                                    </div>



                                    <div className="container-xl">
                                        <div className="row">
                                            <div className="col">
                                                <div className="card card-body card-bg-5">
                                                    <div className="d-flex flex-column align-items-center">
                                                        <div className="avatar avatar-lg mb-3">
                                                            <img className="avatar-img" src='https://via.placeholder.com/150' alt="" />
                                                        </div>
                                                        <div className="d-flex flex-column align-items-center">
                                                            <h5>Catherine Richardson</h5>
                                                        </div>
                                                        <div className="d-flex">

                                                        </div>
                                                    </div>

                                                    <div className="card-options">
                                                        {/* <Dropdown>
                                                            <Dropdown.Toggle
                                                                className="text-muted hw-20 mt-2"
                                                                as={VerticalOptionDots}
                                                            ></Dropdown.Toggle>
                                                            <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
                                                                <Link className="dropdown-item" to="#">
                                                                    Change Profile Picture
                              </Link>
                                                                <Link className="dropdown-item" to="#">
                                                                    Change Number
                              </Link>
                                                            </Dropdown.Menu>
                                                        </Dropdown> */}
                                                    </div>
                                                </div>
                                                <div className="card mt-3">
                                                    <ul className="list-group list-group-flush">
                                                        <li className="list-group-item py-2">
                                                            <div className="media align-items-center">
                                                                <div className="media-body">
                                                                    <p className="small text-muted mb-0">
                                                                        Local Time
                                </p>
                                                                    <p className="mb-0">10:25 PM</p>
                                                                </div>
                                                                Icon
                                                            </div>
                                                        </li>
                                                        <li className="list-group-item py-2">
                                                            <div className="media align-items-center">
                                                                <div className="media-body">
                                                                    <p className="small text-muted mb-0">
                                                                        Birthdate
                                </p>
                                                                    <p className="mb-0">20/11/1992</p>
                                                                </div>
                                                                Icon
                                                            </div>
                                                        </li>

                                                        <li className="list-group-item py-2">
                                                            <div className="media align-items-center">
                                                                <div className="media-body">
                                                                    <p className="small text-muted mb-0">Phone</p>
                                                                    <p className="mb-0">+01-222-364522</p>
                                                                </div>
                                                                Icon
                                                            </div>
                                                        </li>

                                                        <li className="list-group-item py-2">
                                                            <div className="media align-items-center">
                                                                <div className="media-body">
                                                                    <p className="small text-muted mb-0">Email</p>
                                                                    <p className="mb-0">
                                                                        catherine.richardson@gmail.com
                                </p>
                                                                </div>
                                                                Icon
                                                            </div>
                                                        </li>

                                                        <li className="list-group-item py-2">
                                                            <div className="media align-items-center">
                                                                <div className="media-body">
                                                                    <p className="small text-muted mb-0">Website</p>
                                                                    <p className="mb-0">www.catherichardson.com</p>
                                                                </div>
                                                                Icon
                                                            </div>
                                                        </li>

                                                        <li className="list-group-item pt-2">
                                                            <div className="media align-items-center">
                                                                <div className="media-body">
                                                                    <p className="small text-muted mb-0">Address</p>
                                                                    <p className="mb-0">
                                                                        1134 Ridder Park Road, San Fransisco, CA 94851
                                </p>
                                                                </div>
                                                                Icon
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>

                                                <div className="card my-3">
                                                    <ul className="list-group list-group-flush">
                                                        <li className="list-group-item py-2">
                                                            <div className="media align-items-center">
                                                                <div className="media-body">
                                                                    <p className="small text-muted mb-0">
                                                                        Facebook
                                </p>

                                                                </div>
                                                                Icon
                                                            </div>
                                                        </li>

                                                        <li className="list-group-item py-2">
                                                            <div className="media align-items-center">
                                                                <div className="media-body">
                                                                    <p className="small text-muted mb-0">Twitter</p>
                                                                </div>
                                                                Icon
                                                            </div>
                                                        </li>

                                                        <li className="list-group-item py-2">
                                                            <div className="media align-items-center">
                                                                <div className="media-body">
                                                                    <p className="small text-muted mb-0">
                                                                        Instagram
                                </p>
                                                                </div>
                                                                Icon
                                                            </div>
                                                        </li>

                                                        <li className="list-group-item py-2">
                                                            <div className="media align-items-center">
                                                                <div className="media-body">
                                                                    <p className="small text-muted mb-0">
                                                                        Linkedin
                                </p>

                                                                </div>
                                                                Icon
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
                    </div>
                </aside>
            </Fragment >

        );
    }));

export default Settings;
