import React from 'react'
import Link from './Link'

export default class extends React.Component {
  constructor(props) {
    super(props);
    console.log('this from LeftNav 😍:', this);
  }

  render() {
    if (this.props.isLoggedIn !== undefined) {
      return (
        <div className="navbar-nav mr-auto">
          <Link activeClassName='active' href='/about'>
            <a className='nav-item nav-link'>About</a>
          </Link>
        </div>
      )
    } else {
      return (
        <div className="navbar-nav mr-auto">
          <Link activeClassName='active' href='/about'>
            <a className='nav-item nav-link'>About</a>
          </Link>
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