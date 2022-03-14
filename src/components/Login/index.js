import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    usernameInput: '',
    passwordInput: '',
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {usernameInput, passwordInput} = this.state
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {
      username: usernameInput,
      password: passwordInput,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const {history} = this.props
      this.setState({errorMsg: ''})
      Cookies.set('jwt_token', data.jwt_token, {
        expires: 3,
      })
      history.replace('/')
    } else {
      this.setState({errorMsg: data.error_msg})
    }
  }

  displayErrorMsg = () => {
    const {errorMsg} = this.state
    if (errorMsg !== '') {
      return <p className="error-msg">*{errorMsg}</p>
    }
    return null
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-app-container">
        <div className="website-image-container">
          <img
            src="https://res.cloudinary.com/avk/image/upload/v1646891120/Rectangle_1467_qigmh6.png"
            alt="website login"
            className="website-image"
          />
        </div>
        <div className="website-mobile-image-container">
          <img
            src="https://res.cloudinary.com/avk/image/upload/v1646968484/Ellipse_99_va1erd.png"
            alt="website login"
            className="website-mobile-image"
          />
        </div>
        <div className="login-background-container">
          <form className="login-container" onSubmit={this.onSubmitForm}>
            <img
              src="https://res.cloudinary.com/avk/image/upload/v1646893214/Group_7731_fvd8un.png"
              alt="login website logo"
              className="login-website-logo"
            />
            <div className="inputs-container">
              <label htmlFor="username" className="label">
                Username*
              </label>
              <input
                id="username"
                type="text"
                className="input"
                placeholder="Enter Username"
                onChange={this.onChangeUsername}
              />
              <label htmlFor="password" className="label">
                Password*
              </label>
              <input
                id="password"
                type="password"
                className="input"
                placeholder="Enter Password"
                onChange={this.onChangePassword}
              />
              {this.displayErrorMsg()}
              <button type="submit" className="login-button">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
