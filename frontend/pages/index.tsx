import Link from 'next/link'
import Layout from '../components/Layout';

export default () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <h1 className="title">Hello Next.js yo!👋</h1>
    <p><Link href='/about'><a>About</a></Link></p>
    <p>Custom environment variables process.env.NODE_ENV is "{process.env.NODE_ENV}"</p>
    <p>Custom environment variables process.env.ENV is "{process.env.ENV}"</p>
    <p>Custom environment variables process.env.API_URL is "{process.env.API_URL}"</p>
  </Layout>
)