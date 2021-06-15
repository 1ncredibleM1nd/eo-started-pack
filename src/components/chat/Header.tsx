import React, { Fragment } from "react";
import { inject, observer } from "mobx-react";
import IStores, { IAppStore, IContactStore } from "@stores/interface";
import { Button } from "antd";
import "./Header.scss";
import { Icon } from "@ui";
import { ChatStore } from "@stores/implementation/ChatStore";

import MoonLoader from "react-spinners/MoonLoader";

type IProps = {
  contactStore?: IContactStore;
  appStore?: IAppStore;
  chatStore?: ChatStore;
};

const Header = inject((stores: IStores) => ({
  appStore: stores.appStore,
  contactStore: stores.contactStore,
  chatStore: stores.chatStore,
}))(
  observer((props: IProps) => {
    const { contactStore, appStore, chatStore } = props;
    const activeContact = contactStore.activeContact;
    let chatTitle: any;
    let activeMsg: any;

    if (activeContact) {
      chatTitle = activeContact.user.username;
    }

    const closeConctact = () => {
      if (appStore.layout === "contact") {
        appStore.setLayout("info");
      } else if (appStore.layout === "info") {
        appStore.setLayout("contact");
      } else if (appStore.layout === "chat") {
        appStore.setLayout("contact");
        contactStore.setActiveContact(null);
      }
    };

    return (
      <div className="chat_header">
        {activeMsg ? (
          <Fragment></Fragment>
        ) : (
          <Fragment>
            {chatTitle ? (
              <Fragment>
                <div className="header_content">
                  <div
                    className={`back_trigger ${
                      appStore.layout !== "contact" ? "active" : ""
                    }`}
                  >
                    <Button
                      onClick={() => closeConctact()}
                      className="transparent"
                    >
                      <Icon
                        className="icon_s blue-lite"
                        name={`solid_arrow-left`}
                      />
                    </Button>
                  </div>
                  <div className={`header_title`}>
                    <div className="title">
                      <p>{chatTitle}</p>
                    </div>

                    <div className="header_settings">
                      <div className="trigger">
                        {chatStore.isPageLoading ? (
                          <Fragment>
                            <MoonLoader color="#3498db" size={18} />
                          </Fragment>
                        ) : (
                          <Fragment />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            ) : (
              <Fragment></Fragment>
            )}
          </Fragment>
        )}
      </div>
    );
  })
);

export default Header;
