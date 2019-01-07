import React from 'react'
import { withRouter } from 'next/router';
import Layout from '../components/Layout'
import ResetForm from '../components/forms/ResetForm';
import { checkJWT } from '../lib/checkJWT'

type ResetFormState = {
  confirm?: string,
  password?: string,
  message?: string,
  alert?: string,
  userid?: string,
  username?: string,
  token?: string,
};

class PasswordReset extends React.Component<any, ResetFormState> {
  static async getInitialProps({ query: { token } }) {
    const res = await checkJWT(token);
    console.log('res.status :', res.status)
    if (res.status == 200) {
      const json = await res.json();
      return { json, token } 
    } else {
      return {}
    }
  }

  render() {
    if (this.props.json) {
      return (
        <Layout title='Reset Password'>
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 mx-auto">
            <h2>Reset password</h2>
            <ResetForm {...this.props} />
            <p><a href="/sign-in">Back to login</a></p>
          </div>
        </Layout>
      )   
    } else {
        return (
          <Layout title='Reset Password'>
            <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 mx-auto">
              <h2>Reset password</h2>
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

export default withRouter(PasswordReset);
