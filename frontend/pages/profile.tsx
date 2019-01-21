import React from 'react'
import Link from 'next/link';
import cookies from 'next-cookies'
import Router from 'next/router';
import { auth } from '../lib/auth'
import Layout from '../components/layouts/Layout';
import Header from '../components/Header';

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
      return {}
    }

  }

  render() {
    console.log('this.props: ', this.props)
    return (
      <Layout title="Profile | Next.js + TypeScript Example">
        <Header {...this.props} />
        <h1 className="title">Profile page coming soon!👋</h1>
      </Layout>
    )
  }


}