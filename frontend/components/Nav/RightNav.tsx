import React from 'react'
import Link from './Link'

export default class extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const username = this.props.isLoggedIn.username;
    return (
      <div className="navbar-nav ml-auto">
        <Link activeClassName='active' href='/dashboard'>
          <a className='nav-item nav-link'>Dashboard</a>
        </Link>
        <Link activeClassName='active' href='/profile'>
          <a className='nav-item nav-link'>{username}</a>
        </Link>
      </div>
    )
  }
}