import React from 'react'
import Link from './Link'

interface Props {
  isLoggedIn: { username: string; }
}

export default class extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.isLoggedIn !== undefined) {
      const username = this.props.isLoggedIn.username;
      return (
        <div className="navbar-nav mr-auto">
          <Link activeClassName='active' href='/dashboard'>
            <a className='nav-item nav-link'>Dashboard</a>
          </Link>
          <Link activeClassName='active' href='/profile'>
            <a className='nav-item nav-link'>{username}</a>
          </Link>
        </div>
      )
    } else {
      return (
        <div className="navbar-nav mr-auto">
          <Link activeClassName='active' href='/sign-in'>
            <a className='nav-item nav-link'>Sign In</a>
          </Link>
          <Link activeClassName='active' href='/sign-up'>
            <a className='nav-item nav-link'>Sign Up</a>
          </Link>
        </div>
      )
    }

  }
}