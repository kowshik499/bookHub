import {Link} from 'react-router-dom'

import './index.css'

const SliderItem = props => {
  const {bookDetails} = props
  const {id, authorName, title, coverPic} = bookDetails
  return (
    <Link to={`/books/${id}`} className="slider-item-link">
      <div className="slider-item-container">
        <img src={coverPic} alt={title} className="slider-item-cover-pic" />
        <h1 className="slider-item-title">{title}</h1>
        <p className="slider-item-author-name">{authorName}</p>
      </div>
    </Link>
  )
}

export default SliderItem
