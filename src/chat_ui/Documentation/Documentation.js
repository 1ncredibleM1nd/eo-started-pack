import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/media/logo.svg";
import { ThemeColor } from "../../Config/Config";

// Documentation component
class Documentation extends Component {
  state = { themeColor: localStorage.getItem("theme") };
  componentDidMount() {
    // Load light  screen only in documentation
    let classList = document.body.classList;
    if (classList.length === 0 && this.state.themeColor === ThemeColor.Dark) {
      document.body.classList.add("dark-skin");
    } else if (classList.length && this.state.themeColor === ThemeColor.Light) {
      document.body.classList.remove("dark-skin");
    }
  }
  render() {
    return (
      <div className="documentation-page">
        <nav className="navbar navbar-light bg-white border-bottom fixed-top">
          <div className="container">
            <Link
              className="navbar-brand"
              to="/"
              style={{ color: "#665dfe", fontWeight: 600 }}
            >
              <img
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt=""
                loading="lazy"
              ></img>
              Quicky
            </Link>
            <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center align-items-sm-start">
              <Link to="/Chats" className="btn btn-md btn-primary mx-2">
                View demo
              </Link>
              <Link to="#" className="btn btn-md btn-danger">
                Purchase now
              </Link>
            </div>
          </div>
        </nav>
        <div className="main pt-5">
          <section className="border-bottom py-5">
            <div className="container">
              <div className="row justify-content-center text-center">
                <div className="col-xxl-7 col-xl-8 col-lg-9 col-md-10">
                  <div className="badge badge-secondary">v1.0</div>
                  <h1 className="display-4 text-primary font-weight-semibold">
                    Quicky Documentation
                  </h1>
                  <div className="lead">
                    Thank you so much to see our template.
                    <br /> This is guide to understand how to compile, build and
                    customize and run project.
                  </div>
                  <img
                    className="img-fluid mt-3"
                    src="./../assets/media/tools.png"
                    alt=""
                  ></img>
                </div>
              </div>
            </div>
          </section>
          <section className="border-bottom py-5">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <h4>Introduction</h4>

                  <div className="lead mb-0">
                    Quicky, a modern and clean premium quality messaging
                    template based on React and Bootstrap 4 using concept driven
                    and minimal design. It's well optimized with mobile first
                    responsive approach.
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="border-bottom py-5">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <h4>File Structure</h4>
                  <p className="lead pb-3">
                    Learn more about file structure of Quicky.
                  </p>
                </div>

                <div className="col-lg-8">
                  <ul>
                    <li>
                      <strong>
                        <span role="img" aria-labelledby="folder">
                          📁
                        </span>{" "}
                        node_modules
                      </strong>{" "}
                      - Directory where <code>npm</code> installs dependencies.
                    </li>
                    <li>
                      <strong>
                        <span role="img" aria-labelledby="folder">
                          📁
                        </span>{" "}
                        public
                      </strong>
                      <ul>
                        <li>
                          <strong>
                            <span role="img" aria-labelledby="folder">
                              📁
                            </span>{" "}
                            index.html
                          </strong>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <strong>
                        <span role="img" aria-labelledby="folder">
                          📁
                        </span>{" "}
                        src
                      </strong>
                      <ul>
                        <li>
                          <strong>
                            <span role="img" aria-labelledby="folder">
                              📁
                            </span>{" "}
                            assets
                          </strong>
                          <ul>
                            <li>
                              <strong>
                                <span role="img" aria-labelledby="folder">
                                  📁
                                </span>{" "}
                                css
                              </strong>{" "}
                              - Compiled CSS
                            </li>
                            <li>
                              <strong>
                                <span role="img" aria-labelledby="folder">
                                  📁
                                </span>{" "}
                                js
                              </strong>{" "}
                              - Javascript file
                            </li>
                            <li>
                              <strong>
                                <span role="img" aria-labelledby="folder">
                                  📁
                                </span>{" "}
                                media
                              </strong>{" "}
                              - Image & icon assets
                            </li>
                            <li>
                              <strong>
                                <span role="img" aria-labelledby="folder">
                                  📁
                                </span>{" "}
                                vendors
                              </strong>{" "}
                              - Third party plugins
                            </li>
                            <li>
                              <strong>
                                <span role="img" aria-labelledby="folder">
                                  📁
                                </span>{" "}
                                webfonts
                              </strong>{" "}
                              - Webfonts
                            </li>
                          </ul>
                        </li>
                        <li>
                          <strong>
                            <span role="img" aria-labelledby="folder">
                              📁
                            </span>{" "}
                            components
                          </strong>{" "}
                          - React components
                        </li>
                        <li>
                          <strong>
                            <span role="img" aria-labelledby="folder">
                              📁
                            </span>{" "}
                            Config
                          </strong>{" "}
                          - Global configuration
                        </li>
                        <li>
                          <strong>
                            <span role="img" aria-labelledby="folder">
                              📁
                            </span>{" "}
                            Routing
                          </strong>{" "}
                          - React routing
                        </li>
                        <li>
                          <strong>
                            <span role="img" aria-labelledby="file">
                              📄
                            </span>{" "}
                            App.js
                          </strong>
                        </li>
                        <li>
                          <strong>
                            <span role="img" aria-labelledby="file">
                              📄
                            </span>{" "}
                            index.js
                          </strong>
                        </li>
                      </ul>
                    </li>

                    <li>
                      <strong>
                        <span role="img" aria-labelledby="file">
                          📄
                        </span>{" "}
                        package.json
                      </strong>{" "}
                      - List of dependencies and npm information
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="border-bottom py-5">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <h4>Quick start -Install</h4>

                  <div className="lead pb-3">
                    This template requires Node CLI. Please follow these steps
                    to install the required technologies:
                  </div>

                  <h5>1. Installing Node.js</h5>

                  <div className="mb-5">
                    If you do not have Node installed already, you can get it by
                    downloading the package installer from Node's website. You
                    need to have Node.js installed onto your computer.
                    <a
                      href="https://nodejs.org/en/download/"
                      className="link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download and install Node.js →
                    </a>
                  </div>

                  <h5>2. Installing Dependency</h5>
                  <ul className="mb-5">
                    <li>Go to Project directory with cmd or terminal.</li>
                    <li>
                      Run <code>npm i</code>
                      <ul>
                        <li>
                          This command will install necessary dependencies.
                        </li>
                      </ul>
                    </li>
                    <li>
                      Run <code>npm start</code>
                      <ul>
                        <li>
                          This command will start local server in web browser.
                        </li>
                        <li>
                          Hit <code>CTRL+C</code> to terminate the local server
                          from running.
                        </li>
                      </ul>
                    </li>
                  </ul>

                  <h5>3. Create a production build</h5>
                  <div>
                    You can change content according your requirements. When ypu
                    are done, you can run below command to generate build for
                    production upload.
                  </div>
                  <div className="highlight">
                    <code>npm run build </code>
                  </div>
                  <div>
                    Above command will generate <code>build</code> folder in
                    your project directory. You can upload content of{" "}
                    <code>build</code> folder to production server.
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
export default Documentation;
