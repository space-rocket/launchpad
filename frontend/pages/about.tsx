import Link from 'next/link'
import Layout from '../components/layouts/Layout';

export default () => (
  <Layout title="About | Next.js + TypeScript Example">
    <h1 className="title">About yo 👋</h1>
    <p><Link href='/'><a>Home</a></Link></p>
  </Layout>
)