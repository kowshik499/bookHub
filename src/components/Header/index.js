import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'

import './index.css'

class Header extends Component {
  state = {
    showMobileNavItems: false,
  }

  onClickLogoutButton = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  onClickHamburger = () => {
    this.setState(prevState => ({
      showMobileNavItems: !prevState.showMobileNavItems,
    }))
  }

  onClickCloseButton = () => {
    this.setState({showMobileNavItems: false})
  }

  renderMobileNavItems = () => (
    <div className="mobile-nav-items-background-container">
      <ul className="mobile-nav-items-container">
        <li>
          <Link to="/">
            <button className="nav-item-button" type="button">
              Home
            </button>
          </Link>
        </li>
        <li>
          <Link to="/shelf">
            <button className="nav-item-button" type="button">
              Bookshelves
            </button>
          </Link>
        </li>
        <li>
          <button
            type="button"
            className="logout-button"
            onClick={this.onClickLogoutButton}
          >
            Logout
          </button>
        </li>
        <li>
          <button
            className="mobile-nav-items-close-button"
            type="button"
            onClick={this.onClickCloseButton}
          >
            <AiFillCloseCircle className="mobile-nav-items-close-icon" />
          </button>
        </li>
      </ul>
    </div>
  )

  render() {
    const {showMobileNavItems} = this.state
    return (
      <div className="header-background-container">
        <ul className="header-container">
          <li className="image-list-item">
            <Link className="link" to="/">
              <img
                src="https://res.cloudinary.com/avk/image/upload/v1647007149/Group_7731_1_o2qnz1.png"
                className="website-logo"
                alt="website logo"
              />
            </Link>
          </li>
          <li>
            <button
              className="hamburger-button"
              type="button"
              onClick={this.onClickHamburger}
            >
              <GiHamburgerMenu className="hamburger-icon" />
            </button>
            <ul className="nav-items-container">
              <li>
                <Link to="/">
                  <button className="nav-item-button" type="button">
                    Home
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/shelf">
                  <button className="nav-item-button" type="button">
                    Bookshelves
                  </button>
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  className="logout-button"
                  onClick={this.onClickLogoutButton}
                >
                  Logout
                </button>
              </li>
            </ul>
          </li>
        </ul>
        {showMobileNavItems ? this.renderMobileNavItems() : null}
      </div>
    )
  }
}

export default withRouter(Header)
