import React, { Fragment } from "react";
import { observer } from "mobx-react-lite";
import { Button } from "antd";
import "./Header.scss";
import { Icon } from "@/ui";
import { useStore } from "@/stores";

const Header = observer(() => {
  const { contactStore, appStore, schoolsStore } = useStore();
  const activeContact = contactStore.activeContact;
  let chatTitle: any;
  let activeMsg: any;
  let linkSocialPage: any;

  if (activeContact) {
    chatTitle = activeContact.user.username;
    linkSocialPage = activeContact.linkSocialPage;
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

  const school = schoolsStore.getById(contactStore?.activeContact?.schoolId);

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
                <div className={"header_info"}>
                  <div className={`header_title`}>
                    <p>
                      {linkSocialPage ? (
                        <Fragment>
                          <a
                            href={linkSocialPage}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {chatTitle}
                          </a>
                        </Fragment>
                      ) : (
                        <Fragment>{chatTitle}</Fragment>
                      )}
                    </p>
                  </div>
                  <div className={"header_school"}>
                    <div className={"header_school_logo"}>
                      <img src={school.logo} className="school-logo" alt={""} />
                    </div>
                    <p>{school.name}</p>
                  </div>
                </div>
                <div className={"header_settings"}>
                  <div className="trigger"></div>
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
});

export default Header;
