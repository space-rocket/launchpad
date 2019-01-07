import React from 'react';
import Cookies from 'universal-cookie'
import 'isomorphic-unfetch'
import Router from 'next/router'

type SignInFormState = {
  username?: string,
  email?: string,
  password?: string,
  message?: string,
  alert?: string
};

class SignInForm extends React.Component<{}, SignInFormState> {
  state: SignInFormState;
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      message: '',
      alert: ''
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
    fetch(process.env.API_URL + '/authenticate', {
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
      const cookies = new Cookies()
      // set the cookie
      // https://www.npmjs.com/package/universal-cookie
      cookies.set('token', response.token, { path: '/' });
      // Router.push('/user/profile')
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
            <input
              name="username"
              value={this.state.username}
              onChange={this.handleInputChange}
              type="text"
              placeholder="username"
              id="inputUsername"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}
              type="text"
              placeholder="email"
              id="inputEmail"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
              id="inputPassword"
              type="password"
              placeholder="****"
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-outline-primary float-right">Log In</button>
        </form>
      </div>
    );
  }
}

export default SignInForm;