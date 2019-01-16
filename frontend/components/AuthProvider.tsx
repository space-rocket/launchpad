import React, { Component } from 'react';


const UserContext = React.createContext(defaultValue);

class MyClass extends React.Component {
  state = {
    name: 'Michael'
  }
  componentDidMount() {
    let value = this.context;
    /* perform a side-effect at mount using the value of UserContext */
  }
  componentDidUpdate() {
    let value = this.context;
    /* ... */
  }
  componentWillUnmount() {
    let value = this.context;
    /* ... */
  }
  render() {
    let value = this.context;
    /* render something based on the value of UserContext */
    return (
      <UserContext.Provider
        value={{
          token: this.state.token,
          user: this.state.user,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
      )
  }
}
MyClass.contextType = UserContext;