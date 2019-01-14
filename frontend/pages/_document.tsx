import cookies from 'next-cookies'
import { auth } from '../lib/auth'

import Document, { Head, Main, NextScript } from 'next/document'


export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    const { token } = cookies(ctx)
    if (token !== undefined) {
      console.log('we have token')
      const isLoggedIn = await auth(token)
      console.log('isLoggedIn :', isLoggedIn)
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
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}