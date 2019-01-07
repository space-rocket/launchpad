import React from 'react'
import { withRouter } from 'next/router';
import Layout from '../components/Layout'
import { confirmJWT } from '../lib/confirmJWT'

class ConfirmAccount extends React.Component<any> {
  static async getInitialProps({ query: { token } }) {
    const res = await confirmJWT(token);
    if (res.status == 200) {
      const json = await res.json();
      return { json, token }
    } else {
      return {}
    }
  }

  render() {
    if (this.props.json) {
      const alertClasses = `alert alert-${this.props.json.alert}`
      return (
        <Layout title='Confirm Account'>
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 mx-auto">
            <h2>Confirm Account</h2>
            <div className={alertClasses}>{this.props.json.message}</div>
            <p><a href="/sign-in">Back to login</a></p>
          </div>
        </Layout>
      )
    } else {
      return (
        <Layout title='Invalid Token'>
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 mx-auto">
            <h2>Confirm Account</h2>
            <div className="alert alert-danger">
              Invalid token
            </div>
            <p><a href="/sign-in">Back to login</a></p>
          </div>
        </Layout>
      )
    }
  }
}




export default withRouter(ConfirmAccount);
