import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'

import {AiFillHome} from 'react-icons/ai'
import {BsBriefcase} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const NavBar = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')

    const {history} = props
    history.replace('/login')
  }

  //   const onClickHome = () => {
  //     const {history} = props
  //     history.push('/home')
  //   }

  //   const onClickJobs = () => {
  //     const {history} = props
  //     history.push('/jobs')
  //   }

  //   const onClickLogo = () => {
  //     onClickHome()
  //   }

  return (
    <nav className="nav-bar-container">
      <div className="responsive-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="navbar-logo"
          />
        </Link>

        <ul className="mobile-nav-items-container">
          <li className="mobile-nav-item">
            <Link className="mobile-nav-item-button" to="/">
              <AiFillHome />
            </Link>
          </li>
          <li className="mobile-nav-item">
            <Link className="mobile-nav-item-button" to="/jobs">
              <BsBriefcase />
            </Link>
          </li>
          <li className="mobile-nav-item">
            <button
              type="button"
              className="mobile-nav-item-button"
              onClick={onClickLogout}
            >
              <FiLogOut />
            </button>
          </li>
        </ul>
        <ul className="nav-items-container">
          <li className="nav-item">
            <Link className="nav-item-button" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-item-button" to="/jobs">
              Jobs
            </Link>
          </li>
        </ul>
        <button
          type="button"
          className="navbar-logout-button"
          onClick={onClickLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(NavBar)
