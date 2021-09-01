import { Fragment } from "react";
import { observer } from "mobx-react-lite";
import "./Header.scss";
import { useStore } from "@/stores";
import { Link, useHistory } from "react-router-dom";
import { IconArrowLeft, IconPaperClip } from "@/images/icons";

const Header = observer(() => {
  const { contactStore, appStore, schoolsStore, sidebarStore } = useStore();
  const history = useHistory();
  const activeContact = contactStore.activeContact;
  let chatTitle: any;
  let activeMsg: any;
  let linkSocialPage: any;

  if (activeContact) {
    chatTitle = activeContact.user.username;
    linkSocialPage = activeContact.linkSocialPage;
  }

  const closeContact = () => {
    if (appStore.layout === "contact") {
      appStore.setLayout("info");
    } else if (appStore.layout === "info") {
      appStore.setLayout("contact");
    } else if (appStore.layout === "chat") {
      appStore.setLayout("contact");
      history.replace("");
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
                  <Link
                    to={"/"}
                    onClick={() => closeContact()}
                    className="transparent"
                  >
                    <IconArrowLeft width={18} height={18} fill="#70acdd" />
                  </Link>
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
                  <div
                    className="trigger"
                    onClick={() => sidebarStore.toggle()}
                  >
                    <IconPaperClip
                      width={18}
                      height={18}
                      fill={sidebarStore.opened ? "#2a99ff" : "#a3a3a3"}
                    />
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
});

export default Header;
