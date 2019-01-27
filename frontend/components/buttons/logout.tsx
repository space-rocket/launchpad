import React from 'react'
import Cookies from 'universal-cookie'
import Router from 'next/router'

export default class extends React.Component {
  render() {
    const logout = (e) => {
      e.preventDefault()
      const cookies = new Cookies()
      cookies.remove('token');
      Router.push('/sign-in')
    }
    return (
      <a href="#" onClick={logout}>Logout</a>
    )

  }
}