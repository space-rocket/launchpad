import * as React from 'react'
import Head from 'next/head'
import "../../styles/style.scss"

type Props = {
  title?: string
}

const Layout: React.SFC<Props> = ({ children, title = 'This is the default title' }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <script async defer src="https://buttons.github.io/buttons.js"></script>
    </Head>
    {children}
    <footer>
      Thanks for checking out {process.env.PROJECT_NAME}!
    </footer>
  </div>
)

export default Layout