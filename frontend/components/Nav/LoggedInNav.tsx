import Link from './Link'

export default () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <Link activeClassName='active' href='/'>
      <a className='navbar-brand'>Launch Pad</a>
    </Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <Link activeClassName='active' href='/about'>
          <a className='nav-item nav-link'>About</a>
        </Link>
        <Link activeClassName='active' href='/sign-in'>
          <a className='nav-item nav-link'>Sign In</a>
        </Link>
        <Link activeClassName='active' href='/sign-up'>
          <a className='nav-item nav-link'>Logged In</a>
        </Link>
      </div>
    </div>
  </nav>
)
