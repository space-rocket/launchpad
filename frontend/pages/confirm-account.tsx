import React from 'react'
import { withRouter } from 'next/router';
import Layout from '../components/layouts/Layout'

interface State {
  message: string,
  alert: string
}

interface Props {
  isLoggedIn: { username: string; },
  token: string
}

class ConfirmAccount extends React.Component<Props, State> {
  static async getInitialProps({ query: { token } }) {
    console.log('token :', token);
    return { token }
  }

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      alert: ''
    };
  }
  componentDidMount() {
    console.log('this.props.token 👊:', this.props.token)
    const backend_url = process.env.API_URL + '/api/confirm-account';
    fetch(backend_url, {
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + this.props.token,
      } 
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          message: data.message,
          alert: data.alert,
        })
      })
      .catch(err => console.error(err));
  }
  render() {

    console.log('this.state :', this.state)
    const alertClasses = `alert alert-${this.state.alert}`
    return (
      <Layout title='Confirm Account'>
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 mx-auto">
          <h2>Confirm Account</h2>
          <div className={alertClasses}>{this.state.message}</div>
          <p><a href="/sign-in">Back to login</a></p>
        </div>
      </Layout>
    )
  }
}

export default withRouter(ConfirmAccount);
