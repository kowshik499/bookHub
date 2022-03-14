import {FaGoogle, FaYoutube, FaTwitter, FaInstagram} from 'react-icons/fa'

import './index.css'

const ContactUs = () => (
  <div className="contact-us-section">
    <div className="contact-us-icons-container">
      <button className="contact-us-icon-button" type="button">
        <FaGoogle className="contact-us-icon" />
      </button>
      <button className="contact-us-icon-button" type="button">
        <FaTwitter className="contact-us-icon" />
      </button>
      <button className="contact-us-icon-button" type="button">
        <FaInstagram className="contact-us-icon" />
      </button>
      <button className="contact-us-icon-button" type="button">
        <FaYoutube className="contact-us-icon" />
      </button>
    </div>
    <p className="contact-us-text">Contact Us</p>
  </div>
)

export default ContactUs
