import { observer } from "mobx-react-lite";
import { Layout } from "antd";
import "@/styles/index.scss";

const NavBarLayout = observer(() => {
  const activeMenu = "chat";
  return (
    <Layout className="navbar_layout">
      <div className="navigation navbar navbar-light bg-primary">
        <ul
          className="nav nav-minimal flex-row flex-grow-1 justify-content-between flex-xl-column justify-content-xl-center"
          id="mainNavTab"
          role="tablist"
        >
          <li className="nav-item">
            <div
              className={`nav-link p-0 py-xl-3 ${
                activeMenu === "chat" ? "active" : ""
              }`}
              id="chats-tab"
            >
              ICON
            </div>
          </li>
          <li className="nav-item">
            <div
              className={`nav-link p-0 py-xl-3 ${
                activeMenu === "chat" ? "active" : ""
              }`}
              id="chats-tab"
            >
              ICON
            </div>
          </li>
          <li className="nav-item">
            <div
              className={`nav-link p-0 py-xl-3 ${
                activeMenu === "chat" ? "active" : ""
              }`}
              id="chats-tab"
            >
              ICON
            </div>
          </li>
        </ul>
      </div>
    </Layout>
  );
});

export default NavBarLayout;
