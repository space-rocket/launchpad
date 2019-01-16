import React from 'react'
import cookies from 'next-cookies'
import Layout from '../components/layouts/Layout'
import Header from '../components/Header';
import { auth } from '../lib/auth'
import SignInForm from '../components/forms/SignInForm';

// export default () =>
//   <Layout title='Sign In'>
//     <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 mx-auto">
//       <h2>Login into account</h2>
//       <ThemeContext.Provider value={this.state}>
//         <SignInForm />
//       </ThemeContext.Provider>
//       <p>Forgot password? <a href="/forgot-password">Reset password</a></p>
//     </div>
//   </Layout>

export default class extends React.Component {
  static async getInitialProps(ctx) {
    console.log('get intial props called from dashboard')
    const { token } = cookies(ctx)
    if (token !== undefined) {
      const isLoggedIn = await auth(token)
      console.log('we have cookies(ctx)')
      console.log('cookies(ctx) :', cookies(ctx))
      return { isLoggedIn }
    } else {
      const isLoggedIn = undefined
      return { isLoggedIn }
    }

  }

  render() {
    console.log('this.props: ', this.props)
    return (
      <Layout title='Sign In'>
        <Header {...this.props}/>
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 mx-auto">
          <h2>Login into account</h2>
          <SignInForm />
          <p>Forgot password? <a href="/forgot-password">Reset password</a></p>
        </div>
      </Layout>
    )
  }


}
