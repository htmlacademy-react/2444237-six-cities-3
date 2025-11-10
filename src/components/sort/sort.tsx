import classNames from 'classnames'
import { SORT_TYPES } from './const'

type SortProps = {
  activeSortType: string
  onSortChange: (sortType: string) => void
}
const Sort = ({ activeSortType, onSortChange }: SortProps): JSX.Element => {
  const handleSortChange = (evt: React.MouseEvent<HTMLLIElement>) => {
    const selectedType = evt.currentTarget.textContent
    if (selectedType !== null) {
      onSortChange(selectedType)
    }
  }

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        {activeSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className="places__options places__options--custom places__options--opened">
        {SORT_TYPES.map((sortType) => (
          <li
            key={sortType}
            className={classNames('places__option', {
              'places__option--active': sortType === activeSortType,
            })}
            tabIndex={0}
            onClick={handleSortChange}
          >
            {sortType}
          </li>
        ))}
      </ul>
    </form>
  )
}

export default Sort
