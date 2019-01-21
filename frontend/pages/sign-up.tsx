import React from 'react'
import cookies from 'next-cookies'
import Layout from '../components/layouts/Layout'
import Header from '../components/Header';
import { auth } from '../lib/auth'
import SignUpForm from '../components/forms/SignUpForm';


export default class extends React.Component {
  static async getInitialProps(ctx) {
    const { token } = cookies(ctx)
    console.log('token', token)
    if (typeof token !== "undefined" && typeof token !== "string") {
      const isLoggedIn = await auth(token)
      return { isLoggedIn }
    } else {
      const isLoggedIn = undefined
      console.log('token is undefined')
      return { isLoggedIn }
    }

  }

  render() {
    return (
      <Layout title='Sign Up'>
        <Header {...this.props} />
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 mx-auto">
          <h2>Create an account</h2>
          <SignUpForm />
          <p>Forgot password? <a href="/forgot-password">Reset password</a></p>
        </div>
      </Layout>
    )
  }


}
