import React, { Component } from 'react';
import Cookies from 'universal-cookie'
import 'isomorphic-unfetch'
import Router from 'next/router'

type ForgotFormState = {
  username?: string,
  email?: string,
  message?: string,
  alert?: string
};

class ForgotForm extends React.Component<{}, ForgotFormState> {
  state: ForgotFormState;
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      message: '',
      alert: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = (event) => {
    console.log('this.state :', this.state)
    event.preventDefault();
    fetch(process.env.API_URL + '/api/forgot-password', {
      method: 'POST',
      // eslint-disable-next-line no-undef
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(this.state)
    }).then(response => {

      let json = response.json()
      if (response.ok) {
        return json;
      }
      return json.then(Promise.reject.bind(Promise))
    }).then((response) => {
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
      <div className="forgot-email-form">
        <div className={alertClasses}>{this.state.message}</div>
        <form onSubmit={this.handleSubmit.bind(this)} className="forgot-email-container">
          <div className="form-group">
            <input
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}
              type="email"
              placeholder="email"
              id="inputEmail"
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-outline-primary float-right">Reset Password</button>
        </form>
      </div>
    );
  }
}

export default ForgotForm;