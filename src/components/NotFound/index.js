import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-app-container">
    <img
      src="https://res.cloudinary.com/avk/image/upload/v1646975270/Group_7484_m0j4bu.png"
      alt="not found"
      className="not-found-image"
    />
    <h1 className="not-found-head">PAGE NOT FOUND</h1>
    <p className="not-found-details">
      we are sorry, the page you requested could not be found, Please go back to
      the homepage.
    </p>
    <Link className="not-found-button-link" to="/">
      <button className="not-found-button" type="button">
        Go Back to Home
      </button>
    </Link>
  </div>
)

export default NotFound
