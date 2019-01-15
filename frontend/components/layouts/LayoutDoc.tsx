import * as React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import "../../styles/style.scss"
import Nav from '../Nav';

// type Props = {
//   title?: string
// }


// const LayoutDoc: React.SFC<Props> = ({isLoggedIn}) => (
//   <div>
//     <h1>Hey LayoutDoc {isLoggedIn}</h1>
//   </div>
// )

// export default LayoutDoc


export default class extends React.Component {
  static async getInitialProps(ctx) {
    console.log('LayoutDoc GetInital props called!')
    const token = ctx.query.token;
    console.log('token 😍:', token);
    return { token }

  }

  componentDidUpdate(prevProps) {
    if (this.props.dashboard !== prevProps.dashboard) {
      console.log('hey there 😆')
    }
  }

  componentDidMount() {
    console.log('😆 😆 component did mount')
  }

  render() {
    if (this.props.isLoggedIn !== undefined) {
      const isLoggedIn = this.props.isLoggedIn;
      console.log('isLoggedIn: ', isLoggedIn)
      return (
        <div>
          <h1>Logged in {isLoggedIn}</h1>
        </div>
      )
    } else {
      return (
        <div>
          <h1>Not logged in</h1>
        </div>
      )
    }


  }


}