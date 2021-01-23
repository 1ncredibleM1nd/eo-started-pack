import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ThemeColor } from "../../Config/Config";

// Reset password component
class ResetPassword extends Component {
  state = {
    themeColor: Boolean(localStorage.getItem("theme"))
      ? parseInt(localStorage.getItem("theme"))
      : ThemeColor.Light,
  };
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
              <h1 className="font-weight-bold">Password Reset</h1>
              <p className="text-dark mb-3">
                Enter your email address to reset password.
              </p>
              <div className="form-group">
                <label className="sr-only">Email Address</label>
                <input
                  type="email"
                  className="form-control form-control-md"
                  placeholder="Enter your email"
                ></input>
              </div>
              <button className="btn btn-lg btn-block btn-primary text-uppercase font-weight-semibold mb-3">
                Send Reset Link
              </button>
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

export default ResetPassword;
