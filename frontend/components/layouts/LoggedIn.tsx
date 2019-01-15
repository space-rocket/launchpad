import * as React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import "../../styles/style.scss"
import LoggedInNav from '../Nav/LoggedInNav';

type Props = {
  title?: string,
  isLoggedIn?: any
}
console.log('LoggedIn component called')

const LoggedIn: React.SFC<Props> = ({ isLoggedIn, children, title = 'This is the default title' }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    </Head>
    <header>
      <nav>
        <LoggedInNav />
      </nav>
    </header>
    {children}
    <footer>
      I'm Logged In
    </footer>
  </div>
)

export default LoggedIn