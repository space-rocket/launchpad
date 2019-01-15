import React from 'react'
import Link from 'next/link';
import cookies from 'next-cookies'
import { withRouter } from 'next/router';
import { auth } from '../lib/auth'
import LoggedIn from '../components/layouts/LoggedIn';
import LayoutDoc from '../components/layouts/LayoutDoc';

class dashboard extends React.Component {
  // @ TODO: Make this into hoc? 
  // see _hoc-sheet-page.tsx.
  static async getInitialProps(ctx) {
    console.log('get intial props called from dashboard')
    const { token } = cookies(ctx)
    if (token !== undefined ) {
      const isLoggedIn = await auth(token)
      console.log('we have cookies(ctx)')
      console.log('cookies(ctx) :', cookies(ctx))
      return { isLoggedIn }
    } else {
      console.log('we dont have cookies(ctx)');
      console.log('cookies(ctx) :', cookies(ctx))
      return {}
    }
  
  }
  

  render() {
    const {router} = this.props
    const isLoggedIn = this.props.isLoggedIn
    if (isLoggedIn) {
      return (
        <LoggedIn title="Home | Next.js + TypeScript Example" {...isLoggedIn}>
          <LayoutDoc {...this.props} />
          <h1 className="title">Dashboard 👋</h1>
          <p><Link href='/about'><a>About</a></Link></p>
          <p>Custom environment variables process.env.NODE_ENV is "{process.env.NODE_ENV}"</p>
          <p>Custom environment variables process.env.ENV is "{process.env.ENV}"</p>
          <p>Custom environment variables process.env.API_URL is "{process.env.API_URL}"</p>
        </LoggedIn>
      )
    } else {
      return (
        <div>
        </div>
      )
    }

  }
}

export default withRouter(dashboard)