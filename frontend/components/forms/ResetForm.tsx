import React, { Component } from 'react';
import Cookies from 'universal-cookie'
import 'isomorphic-unfetch'
import Router from 'next/router'

type ResetFormState = {
  confirm?: string,
  password?: string,
  message?: string,
  alert?: string,
  userid?: string,
  username?: string,
  token?: string
};

class ResetForm extends React.Component<ResetFormState, ResetFormState> {

  constructor(props) {
    console.log('props.json 🐱', props.json)
    const message = props.json.message;
    if (props.json.data) {
      const userid = props.json.data._id;
      const username = props.json.data.username;
    }
    super(props);
    this.state = {
      confirm: '',
      password: '',
      message,
      alert: '',
      userid: '',
      username: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('this.props.token :', this.props.token)
    fetch(process.env.API_URL + '/api/update-password', {
      method: 'POST',
      // eslint-disable-next-line no-undef
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.props.token,
      }),
      body: JSON.stringify(this.state)
    }).then(response => {
      let json = response.json()
      if (response.ok) {
        return json;
      }
      return json.then(Promise.reject.bind(Promise))
    }).then((response) => {
      const cookies = new Cookies()
      // set the cookie
      // https://www.npmjs.com/package/universal-cookie
      cookies.set('token', response.token, { path: '/' });
      console.log("cookies:", cookies)

      this.setState({
        message: response.message,
        alert: response.alert
      });

    }).catch(error => {
      this.setState({
        message: error.message,
        alert: error.alert
      });
    })
  }

  render() {
    const alertClasses = `alert alert-${this.state.alert}`
    return (
      <div className="login-form">
        <div className={alertClasses}>{this.state.message}</div>
        <form onSubmit={this.handleSubmit.bind(this)} className="login-container">
          <div className="form-group">
            <label htmlFor="password">New Password</label>
            <input
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
              id="inputPassword"
              type="password"
              placeholder="New password"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm">Confirm Password</label>
            <input
              name="confirm"
              value={this.state.confirm}
              onChange={this.handleInputChange}
              id="inputConfirm"
              type="password"
              placeholder="Confirm password"
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-outline-primary float-right">Update Password</button>
        </form>
      </div>
    );
  }
}

export default ResetForm;