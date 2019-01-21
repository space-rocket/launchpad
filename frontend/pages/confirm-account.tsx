import React from 'react'
import { withRouter } from 'next/router';
import Layout from '../components/layouts/Layout'
import { confirmJWT } from '../lib/confirmJWT'

type ConfirmAccountState = {
  username?: string,
  email?: string,
  password?: string,
  message?: string,
  alert?: string
};

class ConfirmAccount extends React.Component<{}, ConfirmAccountState> {
  static async getInitialProps({ query: { token } }) {
    console.log('token :', token);
    // const res = await confirmJWT(token);
    // if (res.status == 200) {
    //   const json = await res.json();
    //   console.log('json 👊:', json)
    //   return { json, token }
    // } else {
    //   return {token}
    // }
    return { token }
  }
  state: ConfirmAccountState;
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

    // const json = this.props.json;
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
    // if (json) {
    //   const alertClasses = `alert alert-${this.props.json.alert}`
    //   return (
    //     <Layout title='Confirm Account'>
    //       <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 mx-auto">
    //         <h2>Confirm Account</h2>
    //         <div className={alertClasses}>{this.props.json.message}</div>
    //         <p><a href="/sign-in">Back to login</a></p>
    //       </div>
    //     </Layout>
    //   )
    // } else {
    //   return (
    //     <Layout title='Invalid Token'>
    //       <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 mx-auto">
    //         <h2>Confirm Account</h2>
    //         <div className="alert alert-danger">
    //           Invalid token
    //         </div>
    //         <p><a href="/sign-in">Back to login</a></p>
    //       </div>
    //     </Layout>
    //   )
    // }
  }
}




export default withRouter(ConfirmAccount);
