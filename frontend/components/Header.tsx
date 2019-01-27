
import React from 'react'
import Nav from '../components/Nav';

type Props = {
  // Nav?: any,
};

export default class extends React.Component<Props> {

  render() {
    return (
      <header className="site-header">
        <div className="container">
          <Nav {...this.props} />
        </div>
      </header>
    )
  }

}


