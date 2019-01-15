import cookies from 'next-cookies'
import { auth } from '../lib/auth'
// import LayoutDoc from '../components/layouts/LayoutDoc';

import Document, { Head, Main, NextScript } from 'next/document'


export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    const { token } = cookies(ctx)
    if (token !== undefined) {
      console.log('we have token')
      const isLoggedIn = await auth(token)
      return { ...initialProps, isLoggedIn }
    } else {
      console.log('we dont have token')
      return { ...initialProps }
    }
    
  }

  render() {

    return (
      <html>
        <Head>
        </Head>
        <body>
          {/* <LayoutDoc {...this.props}/> */}
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}