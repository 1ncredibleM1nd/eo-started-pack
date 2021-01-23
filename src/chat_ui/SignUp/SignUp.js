import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import { ThemeColor } from "../../Config/Config";

// SignUp component
class SignUp extends Component {
  state = {
    themeColor: Boolean(localStorage.getItem("theme"))
      ? parseInt(localStorage.getItem("theme"))
      : ThemeColor.Light,
  };

  // Load selected theme
  componentDidMount() {
    let classList = document.body.classList;
    if (classList.length === 0 && this.state.themeColor === ThemeColor.Dark) {
      document.body.classList.add("dark-skin");
    } else if (classList.length && this.state.themeColor === ThemeColor.Light) {
      document.body.classList.remove("dark-skin");
    }
  }
  render() {
    return (
      <div className={"main-layout card-bg-1"}>
        <div className="container d-flex flex-column">
          <div className="row no-gutters text-center align-items-center justify-content-center min-vh-100">
            <div className="col-12 col-md-6 col-lg-5 col-xl-4">
              <h1 className="font-weight-bold">Sign up</h1>
              <p className="text-dark mb-3">
                We are Different, We Make You Different.
              </p>
              <form className="mb-3">
                <div className="form-group">
                  <label className="sr-only">Name</label>
                  <input
                    type="text"
                    className="form-control form-control-md"
                    id="name"
                    placeholder="Enter your name"
                  ></input>
                </div>
                <div className="form-group">
                  <label className="sr-only">Email Address</label>
                  <input
                    type="email"
                    className="form-control form-control-md"
                    placeholder="Enter your email"
                  ></input>
                </div>
                <div className="form-group">
                  <label className="sr-only">Password</label>
                  <input
                    type="password"
                    className="form-control form-control-md"
                    placeholder="Enter your password"
                  ></input>
                </div>
                <Link
                  to="/Chats"
                  className="btn btn-primary btn-lg btn-block text-uppercase font-weight-semibold"
                >
                  Sign up
                </Link>
              </form>
              <p>
                Already have an account?{" "}
                <Link className="font-weight-semibold" to="/SignIn">
                  Sign in
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
