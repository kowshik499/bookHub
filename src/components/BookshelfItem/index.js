import './index.css'

const BookshelfItem = props => {
  const {itemDetails, onChangeFilter, activeFilter} = props
  const {value, label} = itemDetails
  const itemClassName =
    activeFilter === value
      ? 'bookshelf-list-item-button active'
      : 'bookshelf-list-item-button'
  const onClickButton = () => {
    onChangeFilter(value)
  }
  return (
    <li>
      <button className={itemClassName} type="button" onClick={onClickButton}>
        {label}
      </button>
    </li>
  )
}

export default BookshelfItem
