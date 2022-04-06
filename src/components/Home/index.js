import {Component} from 'react'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import SliderItem from '../SliderItem'
import ContactUs from '../ContactUs'

import './index.css'

const statusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 2000,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1700,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 270,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
}

class Home extends Component {
  state = {
    booksDetails: [],
    apiStatus: statusConstants.initial,
  }

  componentDidMount() {
    this.getBooksDetails()
  }

  getUpdatedBookDetails = book => ({
    authorName: book.author_name,
    coverPic: book.cover_pic,
    id: book.id,
    title: book.title,
  })

  getBooksDetails = async () => {
    this.setState({apiStatus: statusConstants.loading})
    const apiUrl = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const jwtToken = Cookies.get('jwt_token')
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
      const updatedBooksDetails = data.books.map(book =>
        this.getUpdatedBookDetails(book),
      )
      console.log(updatedBooksDetails)
      this.setState({
        booksDetails: updatedBooksDetails,
        apiStatus: statusConstants.success,
      })
    } else {
      this.setState({apiStatus: statusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="home-loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {booksDetails} = this.state
    return (
      <Slider {...settings}>
        {booksDetails.map(book => (
          <SliderItem bookDetails={book} key={book.id} />
        ))}
      </Slider>
    )
  }

  onClickTryAgain = () => {
    this.getBooksDetails()
  }

  renderFailureView = () => (
    <div className="home-failure-container">
      <img
        src="https://res.cloudinary.com/avk/image/upload/v1647156978/Group_7522_kfhaca.png"
        alt="failure view"
        className="home-failure-image"
      />
      <p className="home-failure-text">
        Something went wrong, Please try again.
      </p>
      <button
        className="home-failure-button"
        type="button"
        onClick={this.onClickTryAgain}
      >
        Try Again
      </button>
    </div>
  )

  renderSlider = () => {
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
        <div className="home-background-container">
          <div className="home-details-container">
            <h1 className="home-head">Find Your Next Favorite Books</h1>
            <p className="home-description">
              You are in the right place. Tell us what titles or genres you have
              enjoyed in the past, and we will give you surprisingly insightful
              recommendations.
            </p>
            <Link className="link" to="/shelf">
              <button className="find-books-mobile-button" type="button">
                Find Books
              </button>
            </Link>
          </div>
          <div className="slider-main-container">
            <div className="slider-head-container">
              <h1 className="slider-head">Top Rated Books</h1>
              <Link className="link" to="/shelf">
                <button className="find-books-desktop-button" type="button">
                  Find Books
                </button>
              </Link>
            </div>
            <div className="slider-container">{this.renderSlider()}</div>
          </div>
          <ContactUs />
        </div>
      </>
    )
  }
}

export default Home
