import { Fragment } from "react";
import { observer } from "mobx-react-lite";
import "./Header.scss";
import { useStore } from "@/stores";
import { useHistory } from "react-router-dom";
import { Icon } from "@/ui/Icon/Icon";
import AvatarThumb from "../AvatarThumb";

const Header = observer(() => {
  const { contactStore, layoutStore, schoolsStore, sidebarStore } = useStore();
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
    if (layoutStore.layout === "chat") {
      layoutStore.setLayout("contact");
      history.replace("");
      contactStore.setActiveContact(undefined);
    }
  };

  const school = schoolsStore.getById(
    contactStore.activeContact?.schoolId ?? -1
  );

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
                    layoutStore.layout !== "contact" ? "active" : ""
                  }`}
                >
                  <Icon
                    name={"icon_arrow_left"}
                    fill="#70acdd"
                    onClick={() => closeContact()}
                  />
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
                    <AvatarThumb
                      size={18}
                      img={school?.logo}
                      name={school?.name}
                      round={true}
                      textSizeRatio={2}
                      textLength={1}
                      className="header_school_logo"
                    />
                    <a className="header_school_name" title={school?.name}>
                      {school?.name}
                    </a>
                  </div>
                </div>
                <div className={"header_settings"}>
                  <div
                    className="trigger"
                    onClick={() => sidebarStore.toggle()}
                  >
                    <Icon
                      name={"icon_paper_clip"}
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
