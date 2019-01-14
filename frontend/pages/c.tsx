
import React from 'react'
import Link from 'next/link'
import Layout from '../components/layouts/Layout';

type Props = {
  token?: string,
};

export default class extends React.Component<Props> {
  static async getInitialProps({ query: {token} }) {
    return {token}
  }

  render() {
    const token = this.props.token;
    return (
      <Layout title="Home | Next.js + TypeScript Example">
        <h1 className="title">C {token} yo 👋</h1>
        <p><Link href='/about'><a>About</a></Link></p>
      </Layout>
    )
  }

}