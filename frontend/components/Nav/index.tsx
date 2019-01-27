import React from 'react'
import Link from './Link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LeftNav from './LeftNav'
import RightNav from './RightNav'


interface Props {
  isLoggedIn: { username: string; },
  toggleTheme
}

export default class extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {

    if (this.props.isLoggedIn !== undefined) {
      return (
        <nav className="navbar navbar-default navbar-expand-sm navbar-light">
          <Link activeClassName='active' href='/'>
            <a className='navbar-brand'>
              <FontAwesomeIcon icon="rocket" />
            </a>
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
