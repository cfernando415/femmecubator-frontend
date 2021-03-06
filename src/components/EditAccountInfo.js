import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { updateUser } from "../thunks/accountThunks";
import { withRouter } from "react-router-dom";

class EditAccountInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      member_id: this.props.currentUser.id,
      first_name: this.props.currentUser.first_name,
      last_name: this.props.currentUser.last_name,
      email: this.props.currentUser.email,
      password: "",
      error: "",
      saved: false
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }
  render() {
    console.log();
    return (
      <Fragment>
        <div className="parent-div-edit-acct">
          <div className="child-div-edit-acct">
            <form className="login-form" onSubmit={this.submitHandler}>
              <h3 className="">Membership Level: Career-Switcher</h3>
              <p id="update-subtitle">Your account is free forever!</p>
              <label htmlFor="first_name">First name: </label>
              <div className="ui input form-input">
                <input
                  type="text"
                  name="first_name"
                  onChange={this.changeHandler}
                  value={this.state.first_name}
                />
              </div>
              <label htmlFor="last_name">Last name: </label>
              <div className="ui input form-input">
                <input
                  type="text"
                  name="last_name"
                  onChange={this.changeHandler}
                  value={this.state.last_name}
                />
              </div>
              <label htmlFor="email">E-mail: </label>
              <div className="ui input form-input">
                <input
                  type="email"
                  name="email"
                  onChange={this.changeHandler}
                  value={this.state.email}
                />
              </div>
              <label htmlFor="password">Password: </label>
              <div className="ui input form-input">
                <input
                  placeholder="type password..."
                  type="password"
                  name="password"
                  onChange={this.changeHandler}
                  value={this.state.password}
                />
              </div>
              <input
                type="submit"
                value="Update"
                className="positive huge ui button"
                id="update-registration-btn"
              />
            </form>
            <div className="error-message">{this.state.error}</div>
            <div
              id={
                this.state.saved ? "edit-acct-frm-show" : "edit-acct-frm-hide"
              }
            >
              Changes Saved
            </div>
          </div>
        </div>
      </Fragment>
    );
  }

  changeHandler(e) {
    if (e.target.name === "email") {
      this.setState({
        [e.target.name]: e.target.value.toLowerCase(),
        saved: false
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
        saved: false
      });
    }
  }

  submitHandler(e) {
    e.preventDefault();

    console.log("submit", this.props.currentUser);

    const userInfo = {
      member_id: this.props.currentUser.id,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password
    };

    if (
      this.state.first_name === "" ||
      this.state.last_name === "" ||
      this.state.email === "" ||
      this.state.password === ""
    ) {
      this.setState({ error: "All fields are required!" });
    } else if (
      this.state.first_name.length < 2 ||
      this.state.last_name.length < 2 ||
      this.state.email.length < 2 ||
      this.state.password.length < 2
    ) {
      this.setState({ error: "All fields must be more than one character! " });
    } else {
      this.props.updateUser(userInfo);
      this.setState({ ...userInfo, password: "", error: "", saved: true });
    }
  }
}

const mapDispatchToProps = dispatch => {
  return { updateUser: userInfo => dispatch(updateUser(userInfo)) };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(EditAccountInfo)
);
