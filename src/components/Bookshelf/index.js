import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import BookshelfItem from '../BookshelfItem'
import BookItem from '../BookItem'
import ContactUs from '../ContactUs'

import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const statusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Bookshelf extends Component {
  state = {
    activeBooksFilter: 'ALL',
    searchInput: '',
    apiStatus: statusConstants.initial,
    booksDetails: [],
  }

  componentDidMount() {
    this.getBooksDetails()
  }

  getUpdatedBookDetails = book => ({
    authorName: book.author_name,
    title: book.title,
    id: book.id,
    coverPic: book.cover_pic,
    rating: book.rating,
    readStatus: book.read_status,
  })

  getBooksDetails = async () => {
    this.setState({apiStatus: statusConstants.loading})
    const {activeBooksFilter, searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/book-hub/books?shelf=${activeBooksFilter}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const updatedBooksDetails = data.books.map(book =>
        this.getUpdatedBookDetails(book),
      )
      this.setState({
        apiStatus: statusConstants.success,
        booksDetails: updatedBooksDetails,
      })
    } else {
      this.setState({apiStatus: statusConstants.failure})
    }
  }

  onChangeFilter = value => {
    this.setState({activeBooksFilter: value}, this.getBooksDetails)
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchButton = () => {
    this.getBooksDetails()
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  onClickTryAgain = () => {
    this.getBooksDetails()
  }

  renderFailureView = () => (
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
  )

  renderSuccessView = () => {
    const {booksDetails, searchInput} = this.state
    if (booksDetails.length === 0) {
      return (
        <div className="failure-container">
          <img
            src="https://res.cloudinary.com/avk/image/upload/v1647189480/Group_kospbp.png"
            className="no-books-image"
            alt="no books"
          />
          <p className="failure-text">
            Your search for {searchInput} did not find any matches.
          </p>
        </div>
      )
    }
    return (
      <div className="books-and-contact-us-container">
        <ul className="books-display-container">
          {booksDetails.map(book => (
            <BookItem bookDetails={book} key={book.id} />
          ))}
        </ul>
        <ContactUs />
      </div>
    )
  }

  renderBooks = () => {
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
    const {activeBooksFilter, searchInput} = this.state
    const activeBookshelf = bookshelvesList.filter(
      book => book.value === activeBooksFilter,
    )
    return (
      <>
        <Header />
        <div className="bookshelf-background-container">
          <div className="bookshelf-main-container">
            <div className="side-bar">
              <h1 className="bookshelves-head">Bookshelves</h1>
              <ul className="bookshelf-list">
                {bookshelvesList.map(item => (
                  <BookshelfItem
                    itemDetails={item}
                    key={item.id}
                    onChangeFilter={this.onChangeFilter}
                    activeFilter={activeBooksFilter}
                  />
                ))}
              </ul>
            </div>
            <div className="bookshelf-container">
              <div className="head-and-input-container">
                <h1 className="all-books-head">
                  {activeBookshelf[0].label} Books
                </h1>
                <div className="search-input-container">
                  <input
                    type="search"
                    className="search-input"
                    placeholder="Search"
                    onChange={this.onChangeSearchInput}
                    value={searchInput}
                  />
                  <button
                    className="search-button"
                    type="button"
                    testid="searchButton"
                    onClick={this.onClickSearchButton}
                  >
                    <BsSearch className="search-icon" />
                  </button>
                </div>
              </div>
              <div className="mobile-filters-container">
                <h1 className="bookshelves-head">Bookshelves</h1>
                <ul className="bookshelf-list">
                  {bookshelvesList.map(item => (
                    <BookshelfItem
                      itemDetails={item}
                      key={item.id}
                      onChangeFilter={this.onChangeFilter}
                      activeFilter={activeBooksFilter}
                    />
                  ))}
                </ul>
              </div>
              <div className="books-container">{this.renderBooks()}</div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Bookshelf
