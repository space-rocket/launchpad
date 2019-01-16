
import React from 'react'
import Nav from '../components/Nav';

type Props = {
  // Nav?: any,
};

export default class extends React.Component<Props> {

  render() {
    console.log('this.props.isLoggedIn', this.props.isLoggedIn)
    return (
      <header>
        <nav>
          <Nav {...this.props} />
        </nav>
      </header>
    )
  }

}


