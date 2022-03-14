import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsFillStarFill} from 'react-icons/bs'

import Header from '../Header'
import ContactUs from '../ContactUs'

import './index.css'

const statusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class BookDetails extends Component {
  state = {
    bookDetails: {},
    apiStatus: statusConstants.initial,
  }

  componentDidMount() {
    this.getBookDetails()
  }

  getBookDetails = async () => {
    this.setState({apiStatus: statusConstants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const updatedData = {
        aboutAuthor: data.book_details.about_author,
        aboutBook: data.book_details.about_book,
        authorName: data.book_details.author_name,
        coverPic: data.book_details.cover_pic,
        id: data.book_details.id,
        rating: data.book_details.rating,
        readStatus: data.book_details.read_status,
        title: data.book_details.title,
      }
      this.setState({
        bookDetails: updatedData,
        apiStatus: statusConstants.success,
      })
    } else {
      this.setState({apiStatus: statusConstants.failure})
    }
  }

  onClickTryAgain = () => {
    this.getBookDetails()
  }

  renderFailureView = () => (
    <div className="book-details-background-container">
      <div className="failure-container">
        <img
          src="https://res.cloudinary.com/avk/image/upload/v1647156978/Group_7522_kfhaca.png"
          alt="failure view"
          className="failure-image"
        />
        <p className="failure-text">Something went wrong, Please try again.</p>
        <button
          className="failure-button"
          type="button"
          onClick={this.onClickTryAgain}
        >
          Try Again
        </button>
      </div>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {bookDetails} = this.state
    const {
      coverPic,
      authorName,
      rating,
      readStatus,
      title,
      aboutBook,
      aboutAuthor,
    } = bookDetails
    return (
      <div className="book-details-background-container">
        <div className="book-details-and-contact-us-container">
          <div className="book-details-container">
            <div className="book-photo-and-details-container">
              <img
                src={coverPic}
                alt={title}
                className="book-details-cover-photo"
              />
              <div className="book-details-book-data">
                <h1 className="book-details-title">{title}</h1>
                <p className="book-details-author">{authorName}</p>
                <div className="flex-container">
                  <p className="book-details-other-text">Avg Rating</p>
                  <BsFillStarFill className="book-details-star-icon" />
                  <p className="book-details-other-text book-details-rating">
                    {rating}
                  </p>
                </div>
                <div className="flex-container">
                  <p className="book-details-other-text">Status:</p>
                  <p className="book-details-other-text book-details-status">
                    {readStatus}
                  </p>
                </div>
              </div>
            </div>
            <hr className="book-details-line" />
            <div>
              <h1 className="book-details-about-head">About Author</h1>
              <p className="book-details-about-para">{aboutAuthor}</p>
              <h1 className="book-details-about-head">About Book</h1>
              <p className="book-details-about-para">{aboutBook}</p>
            </div>
          </div>
        </div>
        <ContactUs />
      </div>
    )
  }

  renderBookDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case statusConstants.success:
        return this.renderSuccessView()
      case statusConstants.loading:
        return this.renderLoadingView()
      case statusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderBookDetails()}
      </>
    )
  }
}

export default BookDetails
