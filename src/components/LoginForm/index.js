import {Component} from 'react'
import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitErr: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state

    const apiUrl = 'https://apis.ccbp.in/login'

    const userDetails = {
      username,
      password,
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok) {
      const jwtToken = data.jwt_token

      Cookies.set('jwt_token', jwtToken, {expires: 30})

      const {history} = this.props
      history.replace('/')
    } else {
      const errorMsg = data.error_msg

      this.setState({errorMsg, showSubmitErr: true})
    }

    // console.log(data)
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    const {username, password, showSubmitErr, errorMsg} = this.state

    return (
      <div className="login-route-container">
        <form className="login-form-container" onSubmit={this.onSubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-website-logo"
          />
          <label htmlFor="username" className="input-label">
            USERNAME
          </label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            className="input-field"
            onChange={this.onChangeUsername}
            value={username}
          />
          <label htmlFor="password" className="input-label">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="input-field"
            onChange={this.onChangePassword}
            value={password}
          />
          <button type="submit" className="login-submit-button">
            Login
          </button>
          {showSubmitErr ? <p className="error-msg">*{errorMsg}</p> : ''}
        </form>
      </div>
    )
  }
}

export default LoginForm
