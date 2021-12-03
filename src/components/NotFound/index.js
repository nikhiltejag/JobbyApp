import NavBar from '../NavBar'

import './index.css'

const NotFound = () => (
  <div className="not-found-route-container">
    <NavBar />
    <div className="not-found-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
        className="not-found-image"
      />
      <h1 className="not-found-head">Page Not Found</h1>
      <p className="not-found-description">
        we’re sorry, the page you requested could not be found
      </p>
    </div>
  </div>
)

export default NotFound
