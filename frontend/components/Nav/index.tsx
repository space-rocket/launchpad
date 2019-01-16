import React from 'react'
import Link from './Link'
import LeftNav from './LeftNav'
import RightNav from './RightNav'
import { AuthContext, themes, user } from '../auth/AuthContext';

export default class extends React.Component {
  constructor(props) {
    super(props);
    console.log('this 😍:', this);
    this.state = {
      theme: themes.light,
      toggleTheme: this.toggleTheme,
      username: user.username
    };
  }

  render() {
    console.log('from nav index this.state: ', this.state)
    console.log('from nav index this 😍:', this);


    if (this.props.isLoggedIn !== undefined) {
      return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
          <Link activeClassName='active' href='/'>
            <a className='navbar-brand'>Launch Pad</a>
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <LeftNav {...this.props} />
            <RightNav {...this.props}/>
          </div>
        </nav>
      )   
    }
    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <Link activeClassName='active' href='/'>
          <a className='navbar-brand'>Launch Pad</a>
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <LeftNav {...this.props} />
        </div>
      </nav>
    )
  }
}
