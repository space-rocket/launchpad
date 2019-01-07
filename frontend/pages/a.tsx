
import React from 'react'

export default class extends React.Component {
  static async getInitialProps(ctx) {
    const token = ctx.query.token;
    console.log('token 😍:', token);
    return { token }

  }

  render() {
    console.log('this.props: ', this.props)
    return (
      <div>
        hello a
      </div>
    )
  }


}