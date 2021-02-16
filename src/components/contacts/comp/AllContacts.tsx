
import React, { Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import IStores, { IContactStore, IUserStore } from '@stores/interface';



type IProps = {
    contactStore?: IContactStore,
    userStore?: IUserStore,
}

const AllContacts = inject((stores: IStores) => ({}))(
    observer((props: IProps) => {

        return (
            <Fragment>
                <aside className="sidebar">
                    <div className="tab-content">
                        <div className="tab-pane active" id="friends-content">
                            <div className="d-flex flex-column h-100">
                                <div className="hide-scrollbar" id="friendsList">
                                    <div className="sidebar-header sticky-top p-2">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <h5 className="font-weight-semibold mb-0">Friends</h5>
                                            ICon
                                        </div>
ICon
                                    </div>

                                    <ul className="contacts-list" id="friendsTab">
                                        <li>
                                            <small className="font-weight-medium text-uppercase text-muted">
                                                A
                    </small>
                                        </li>

                                        <li className="all_contacts_item active">

                                            <div className="avatar">
                                                <img src={'https://via.placeholder.com/150'} alt="" />
                                            </div>
                                            <div className="contacts-content">
                                                <div className="contacts-info">
                                                    <h6 className="chat-name text-truncate">
                                                        Albert K. Johansen
                          </h6>
                                                </div>
                                                <div className="contacts-texts">
                                                    ICon
                                                        <p className="text-muted mb-0">San Fransisco, CA</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li className="all_contacts_item">
                                            <div className="avatar">
                                                <img src={'https://via.placeholder.com/150'} alt="" />
                                            </div>
                                            <div className="contacts-content">
                                                <div className="contacts-info">
                                                    <h6 className="chat-name text-truncate">
                                                        Alice R. Botello
                          </h6>
                                                </div>
                                                <div className="contacts-texts">
                                                    ICon
                                                        <p className="text-muted mb-0">Brentwood, NY</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <small className="font-weight-medium text-uppercase text-muted">
                                                b
                    </small>
                                        </li>
                                        <li className="all_contacts_item">
                                            <div className="avatar">
                                                <img src={'https://via.placeholder.com/150'} alt="" />
                                            </div>
                                            <div className="contacts-content">
                                                <div className="contacts-info">
                                                    <h6 className="chat-name text-truncate">
                                                        Brittany K. Williams
                          </h6>
                                                </div>
                                                <div className="contacts-texts">
                                                    ICon
                                                    <p className="text-muted mb-0">Scranton, PA</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <small className="font-weight-medium text-uppercase text-muted">
                                                C
                    </small>
                                        </li>
                                        <li className="all_contacts_item">
                                            <div className="avatar">
                                                <img src={'https://via.placeholder.com/150'} alt="" />

                                            </div>
                                            <div className="contacts-content">
                                                <div className="contacts-info">
                                                    <h6 className="chat-name text-truncate">
                                                        Christopher Garcia
                          </h6>
                                                </div>
                                                <div className="contacts-texts">
                                                    ICon
                                                    <p className="text-muted mb-0">Riverside, CA</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li className="all_contacts_item">
                                            <div className="avatar">
                                                <img src={'https://via.placeholder.com/150'} alt="" />

                                            </div>
                                            <div className="contacts-content">
                                                <div className="contacts-info">
                                                    <h6 className="chat-name text-truncate">
                                                        Casey Mcbride
                          </h6>
                                                </div>
                                                <div className="contacts-texts">
                                                    ICon
                                                    <p className="text-muted mb-0">Zephyr, NC</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <small className="font-weight-medium text-uppercase text-muted">
                                                G
                    </small>
                                        </li>

                                        <li className="all_contacts_item">
                                            <div className="avatar">
                                                <img src={'https://via.placeholder.com/150'} alt="" />

                                            </div>
                                            <div className="contacts-content">
                                                <div className="contacts-info">
                                                    <h6 className="chat-name text-truncate">
                                                        Gemma Mendez
                          </h6>
                                                </div>
                                                <div className="contacts-texts">
                                                    ICon
                                                    <p className="text-muted mb-0">Frederick, MD</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <small className="font-weight-medium text-uppercase text-muted">
                                                k
                    </small>
                                        </li>

                                        <li className="all_contacts_item">
                                            <div className="avatar">
                                            </div>
                                            <div className="contacts-content">
                                                <div className="contacts-info">
                                                    <h6 className="chat-name text-truncate">
                                                        Katelyn Valdez
                          </h6>
                                                </div>
                                                <div className="contacts-texts">
                                                    ICon

                                                    <p className="text-muted mb-0">Jackson, TN</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li className="all_contacts_item">
                                            <div className="avatar">
                                                <img src={'https://via.placeholder.com/150'} alt="" />
                                            </div>
                                            <div className="contacts-content">
                                                <div className="contacts-info">
                                                    <h6 className="chat-name text-truncate">
                                                        Katherine Schneider
                          </h6>
                                                </div>
                                                <div className="contacts-texts">
                                                    ICon
                                                    <p className="text-muted mb-0">Saginaw, MI</p>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <small className="font-weight-medium text-uppercase text-muted">

                                            </small>
                                        </li>

                                        <li className="all_contacts_item">
                                            <div className="avatar">
                                                <img src={'https://via.placeholder.com/150'} alt="" />
                                            </div>
                                            <div className="contacts-content">
                                                <div className="contacts-info">
                                                    <h6 className="chat-name text-truncate">
                                                        Maizie Edwards
                          </h6>
                                                </div>
                                                <div className="contacts-texts">
                                                    ICon

                                                    <p className="text-muted mb-0">Greensboro, NC</p>
                                                </div>
                                            </div>

                                        </li>

                                        <li>
                                            <small className="font-weight-medium text-uppercase text-muted">
                                                s
                    </small>
                                        </li>

                                        <li className="all_contacts_item">
                                            <div className="avatar">
                                                <img src={'https://via.placeholder.com/150'} alt="" />
                                            </div>
                                            <div className="contacts-content">
                                                <div className="contacts-info">
                                                    <h6 className="chat-name text-truncate">
                                                        Susan K. Taylor
                          </h6>
                                                </div>
                                                <div className="contacts-texts">
                                                    ICon
                                                    <p className="text-muted mb-0">Centerville, VA</p>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
            </Fragment >

        );
    }));

export default AllContacts;

