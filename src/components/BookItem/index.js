import {Link} from 'react-router-dom'

import {BsFillStarFill} from 'react-icons/bs'

import './index.css'

const BookItem = props => {
  const {bookDetails} = props
  const {coverPic, title, id, rating, authorName, readStatus} = bookDetails
  return (
    <li className="book-container">
      <Link to={`/books/${id}`} className="book-item-link">
        <img src={coverPic} className="book-cover-pic" alt={title} />
        <div className="book-details">
          <h1 className="title">{title}</h1>
          <p className="author">{authorName}</p>
          <div className="flex-container">
            <p className="book-item-other-text">Avg Rating</p>
            <BsFillStarFill className="star-icon" />
            <p className="book-item-rating">{rating}</p>
          </div>
          <div className="flex-container">
            <p className="book-item-other-text">status: </p>
            <p className="book-item-other-text book-item-status">
              {readStatus}
            </p>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default BookItem
