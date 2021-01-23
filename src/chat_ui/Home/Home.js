import React, { Component } from "react";
import LightSkin from "../../assets/media/ui/light-skin.jpg";
import DarkSkin from "../../assets/media/ui/dark-skin.jpg";

import LigntSignIn from "../../assets/media/ui/ls-signin.jpg";
import DarkSignIn from "../../assets/media/ui/ds-signin.jpg";
import LightSignUp from "../../assets/media/ui/ls-signup.jpg";
import DarkSignUp from "../../assets/media/ui/ds-signup.jpg";
import LightResetPassword from "../../assets/media/ui/ls-reset-password.jpg";
import DarkResetPassword from "../../assets/media/ui/ds-reset-password.jpg";

import { ReactComponent as LogoSvg } from "../../assets/media/logo.svg";
import RefreshSvg from "../../assets/media/icons/refresh.svg";
import QuestionSvg from "../../assets/media/icons/question.svg";
import PencilSvg from "../../assets/media/icons/pencil.svg";
import ResponsiveSvg from "../../assets/media/icons/responsive.svg";

import { Link } from "react-router-dom";
import { ThemeColor } from "../../Config/Config";
import { Accordion, Card } from "react-bootstrap";

// Home page component
class Home extends Component {
  state = {
    themeColor: ThemeColor.Light,
  };

  // Load selected theme
  componentDidMount() {
    this.setState({ themeColor: ThemeColor.Light });
    let classList = document.body.classList;
    if (classList.length) document.body.classList.remove("dark-skin");
  }

  // Change theme color
  selectThemeColor = (color) => {
    localStorage.setItem("theme", color);
    this.setState({ themeColor: color });
  };
  render() {
    return (
      <>
        <section className="bg-light theme-shadow card-bg-1 py-5">
          <div className="container">
            <div className="row justify-content-center text-center">
              <div className="col-xxl-7 col-xl-8 col-lg-9 col-md-10">
                <div className="badge badge-secondary">v1.0</div>

                <h1 className="display-4 font-weight-semibold text-primary">
                  Quicky Messanger
                </h1>

                <p>
                  The powerful React JS messaging framework that especially
                  build for developers and designer to help build messaging and
                  chat application fast and easily. It is a fully responsive
                  template.
                </p>

                <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center align-items-sm-start mt-4">
                  <Link
                    to="/Chats"
                    className="btn btn-md btn-primary mb-2 mx-2"
                    onClick={() => {
                      this.selectThemeColor(ThemeColor.Light);
                    }}
                  >
                    View demo
                  </Link>
                  <Link
                    to="https://themeforest.net/item/quicky-html-chat-template/27127279"
                    className="btn btn-md btn-danger mx-2"
                  >
                    Purchase now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          className="bg-white border-bottom theme-shadow py-5"
          id="demos"
        >
          <div className="container">
            <div className="row justify-content-center text-center">
              <div className="col-lg-8">
                <h2 className="font-weight-semibold pb-4">Demos</h2>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-sm-6">
                <Link
                  to="/Chats"
                  onClick={() => {
                    this.selectThemeColor(ThemeColor.Light);
                  }}
                  className="text-reset"
                  target="_blank"
                >
                  <div className="card">
                    <img
                      className="img-fluid rounded-top"
                      alt=""
                      src={LightSkin}
                    ></img>
                    <div className="card-body">
                      <h6 className="m-0 text-center">Light Skin</h6>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-sm-6">
                <Link
                  to="/Chats"
                  onClick={() => {
                    this.selectThemeColor(ThemeColor.Dark);
                  }}
                  className="text-reset"
                  target="_blank"
                >
                  <div className="card">
                    <img
                      className="img-fluid rounded-top"
                      src={DarkSkin}
                      alt=""
                    ></img>
                    <div className="card-body">
                      <h6 className="m-0 text-center">Dark Skin</h6>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6 col-md-4 col-lg-4 my-2">
                <Link
                  to="/SignIn"
                  className="border rounded d-block theme-shadow-sm overflow-hidden text-reset"
                  onClick={() => {
                    this.selectThemeColor(ThemeColor.Light);
                  }}
                  target="_blank"
                >
                  <img
                    src={LigntSignIn}
                    alt="light signin"
                    className="img-fluid border-bottom rounded-top"
                  ></img>
                  <div className="bg-light text-center py-2">Sign in</div>
                </Link>
              </div>
              <div className="col-sm-6 col-md-4 col-lg-4 my-2">
                <Link
                  to="/SignUp"
                  className="border rounded d-block theme-shadow-sm overflow-hidden text-reset"
                  onClick={() => {
                    this.selectThemeColor(ThemeColor.Light);
                  }}
                  target="_blank"
                >
                  <img
                    src={LightSignUp}
                    alt="light signup"
                    className="img-fluid border-bottom rounded-top"
                  ></img>
                  <div className="bg-light text-center py-2">Sign up</div>
                </Link>
              </div>
              <div className="col-sm-6 col-md-4 col-lg-4 my-2">
                <Link
                  to="/reset-password"
                  className="border rounded d-block theme-shadow-sm overflow-hidden text-reset"
                  onClick={() => {
                    this.selectThemeColor(ThemeColor.Light);
                  }}
                  target="_blank"
                >
                  <img
                    src={LightResetPassword}
                    alt="light reset password"
                    className="img-fluid border-bottom rounded-top"
                  ></img>
                  <div className="bg-light text-center  py-2">
                    Reset password
                  </div>
                </Link>
              </div>
              <div className="col-sm-6 col-md-4 col-lg-4 my-2">
                <Link
                  to="/SignIn"
                  className="border rounded d-block theme-shadow-sm overflow-hidden text-reset"
                  onClick={() => {
                    this.selectThemeColor(ThemeColor.Dark);
                  }}
                  target="_blank"
                >
                  <img
                    src={DarkSignIn}
                    alt="dark signin"
                    className="img-fluid border-bottom rounded-top"
                  ></img>
                  <div className="bg-light text-center  py-2">Sign in</div>
                </Link>
              </div>
              <div className="col-sm-6 col-md-4 col-lg-4 my-2">
                <Link
                  to="/SignUp"
                  className="border rounded d-block theme-shadow-sm overflow-hidden text-reset"
                  onClick={() => {
                    this.selectThemeColor(ThemeColor.Dark);
                  }}
                  target="_blank"
                >
                  <img
                    src={DarkSignUp}
                    alt="dark signup"
                    className="img-fluid border-bottom rounded-top"
                  ></img>
                  <div className="bg-light text-center py-2">Sign up</div>
                </Link>
              </div>
              <div className="col-sm-6 col-md-4 col-lg-4 my-2">
                <Link
                  to="/reset-password"
                  className="border rounded d-block theme-shadow-sm overflow-hidden text-reset"
                  onClick={() => {
                    this.selectThemeColor(ThemeColor.Dark);
                  }}
                  target="_blank"
                >
                  <img
                    src={DarkResetPassword}
                    alt="dark reset password"
                    className="img-fluid border-bottom rounded-top"
                  ></img>
                  <div className="bg-light text-center py-2">
                    Reset password
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section
          className="bg-white border-bottom theme-shadow py-5"
          id="features"
        >
          <div className="container">
            <div className="row justify-content-center text-center">
              <div className="col-xxl-7 col-xl-8 col-lg-9 col-md-10 pb-4">
                <h2 className="display-5 font-weight-semibold">
                  Features Overview
                </h2>
              </div>
              <div className="row row-eq-height">
                <div className="col-lg-3 col-md-4 col-sm-6">
                  <div className="feature text-center border rounded theme-shadow-sm p-3 mb-4 mb-lg-0">
                    <img src={ResponsiveSvg} alt=""></img>
                    <h6 className="mt-3">Responsive & User-Friendly</h6>
                    <p className="text-muted mb-0">
                      Complete responsive & user-friendly to pleasing your user
                    </p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6">
                  <div className="feature text-center border rounded theme-shadow-sm p-3 mb-4 mb-lg-0">
                    <img src={PencilSvg} alt=""></img>
                    <h6 className="mt-3">Easy Customizable</h6>
                    <p className="text-muted mb-0">
                      We offers highly scalable and endless customization
                    </p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6">
                  <div className="feature text-center border rounded theme-shadow-sm p-3 mb-4 mb-lg-0">
                    <img src={RefreshSvg} alt=""></img>
                    <h6 className="mt-3">Lifetime Updates</h6>
                    <p className="text-muted mb-0">
                      Every purchase entitled to free updates – for lifetime
                    </p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6">
                  <div className="feature text-center border rounded theme-shadow-sm p-3 mb-4 mb-lg-0">
                    <img src={QuestionSvg} alt=""></img>
                    <h6 className="mt-3">Premium Support</h6>
                    <p className="text-muted mb-0">
                      We offer six months of free support to every customer
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white border-bottom theme-shadow py-5" id="faq">
          <div className="container">
            <div className="row justify-content-center text-center mb-4">
              <div className="col-xxl-7 col-xl-8 col-lg-9 col-md-10">
                <h2 className="display-5 font-weight-semibold">
                  Frequently Asked Questions
                </h2>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <Accordion defaultActiveKey="1">
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="1">
                      Do you Charge for each Upgrade?
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                      <Card.Body>
                        Not at all. Once you purchase a license, you'll receive
                        all future releases for free.
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="2">
                      Do I need to purchase a license for each
                      product/website/webapp?
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="2">
                      <Card.Body>
                        Yes, you need to have a separate license for each
                        product/website/webapp. You might need to purchase
                        extended license for your web application.
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="3">
                      Which license is applicable for SAAS application?
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="3">
                      <Card.Body>
                        If you are charging your customer for using your SAAS
                        based application you must buy an Extended License for
                        each end product. If you aren't charging your customer
                        then purchase Regular License for each end product.
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="4">
                      What is regular license?
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="4">
                      <Card.Body>
                        <ul>
                          <li>
                            Regular license can be used for end products that do
                            not charge users for access or service (access is
                            free and there will be no monthly subscription fee).
                          </li>
                          <li>
                            Single regular license can be used for single end
                            product and end product can be used by you or your
                            client. If you want to sell end product to multiple
                            clients then you will need to purchase separate
                            license for each client. The same rule applies if
                            you want to use the same end product on multiple
                            domains (unique setup).
                          </li>
                          <li>
                            For more info on Themeforest licenses you can check{" "}
                            <Link
                              to="http://themeforest.net/licenses/standard?license=regular"
                              target="_blank"
                            >
                              http://themeforest.net/licenses/standard?license=regular
                            </Link>
                          </li>
                        </ul>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="5">
                      What is extended license?
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="5">
                      <Card.Body>
                        <ul>
                          <li>
                            Extended license can be used for end products (web
                            service or SAAS) that charges users for access or
                            service (e.g: monthly subscription fee).
                          </li>
                          <li>
                            Single extended license can be used for single end
                            product and end product can be used by you or your
                            client. If you want to sell end product to multiple
                            clients then you will need to purchase separate
                            extended license for each client. The same rule
                            applies if you want to use the same end product on
                            multiple domains (unique setup).
                          </li>
                          <li>
                            For more info on Theme forest licenses you can check{" "}
                            <Link
                              to="http://themeforest.net/licenses/terms/extended"
                              target="_blank"
                            >
                              http://themeforest.net/licenses/terms/extended
                            </Link>
                          </li>
                        </ul>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="6">
                      What happen if you misuse the licence?
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="6">
                      <Card.Body>
                        <ul>
                          <li>
                            If you had purchased 1 license that should be used
                            for only 1 domain . It should not be used for
                            multiple domains , if you used it for multiple
                            domains that should be a illegal
                          </li>
                          <li>
                            It’s a major risk for you and your brand to use
                            something that’s illegal and has serious issues.
                            Regular licence misuse can also result in data
                            theft, data loss or distribution of illegal
                            material. You’ll be using a piece of code without a
                            correct license. All of these can lead to legal
                            proceedings where you’ve to pay a massive chunk of
                            Money to Lawyers.
                          </li>
                          <li>
                            Therefore, it’s advisable not to make use of licence
                            misuse. If you are already misusing regular licence,
                            which is illegal. In this case, my company
                            background verification team catch you, they will
                            contact your web host provider and get your account
                            suspended. Also They will send legal notice to you
                            and your brand.
                          </li>
                        </ul>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </div>
            </div>
          </div>
        </section>
        <section
          className="bg-white border-bottom theme-shadow py-5"
          id="support"
        >
          <div className="container">
            <div className="row row-eq-height justify-content-center">
              <div className="col-md-6">
                <div className="card mb-2">
                  <div className="card-body text-center">
                    <img className="mb-3" src={QuestionSvg} alt=""></img>
                    <h4 className="display-6 mb-2">Need Support?</h4>
                    <p className="text-muted">
                      Email us on{" "}
                      <Link className="link" to="#">
                        design.frontendmatters@gmail.com
                      </Link>
                      . The support response time is 24-48 hours but normally we
                      tend to settle the questions earlier than 24 hours.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card mb-2">
                  <div className="card-body text-center">
                    <img className="mb-3" src={QuestionSvg} alt=""></img>
                    <h4 className="display-6 mb-2">Pre-Purchase Questions</h4>
                    <p className="text-muted">
                      Feel free to ask any questions before making purchase to
                      know more about the theme. We will clear all your
                      questions. Email us on{" "}
                      <Link className="link" to="#">
                        design.frontendmatters@gmail.com
                      </Link>
                      .{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-white">
          <div className="container py-5">
            <div className="row">
              <div className="col-12 text-center">
                <LogoSvg
                  width="80"
                  height="80"
                  className="d-inline-block mb-4"
                />

                <h4 className="display-6 font-weight-semibold">
                  Quicky - Complete Chat React JS Template
                </h4>

                <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center align-items-sm-start mt-4">
                  <Link
                    to="/Documentation"
                    className="btn btn-secondary mb-2 mx-2"
                  >
                    Documentation
                  </Link>
                  <Link
                    to="/Chats"
                    className="btn btn-primary mb-2 mx-2"
                    onClick={() => {
                      this.selectThemeColor(ThemeColor.Light);
                    }}
                  >
                    View demo
                  </Link>
                  <Link
                    to="https://themeforest.net/item/quicky-html-chat-template/27127279"
                    className="btn btn-danger mx-2"
                  >
                    Purchase now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}
export default Home;
