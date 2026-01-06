import { SORT_TYPES, SortKeys } from '@/const'
import { useAppDispatch } from '@/hooks'
import { setSortType } from '@/store/app-slice/app-slice'
import { useClickAway } from '@uidotdev/usehooks'
import cn from 'classnames'
import { useState } from 'react'

type SortProps = {
  activeSortType: string
}

const Sort = ({ activeSortType }: SortProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)

  const dispatch = useAppDispatch()

  const ref = useClickAway(() => {
    setIsOpen(false)
  })

  const handleSortChange = (sortType: SortKeys) => {
    dispatch(setSortType(sortType))
  }

  return (
    <form
      className="places__sorting"
      action="#"
      method="get"
      ref={ref as React.RefObject<HTMLFormElement>}
    >
      <span className="places__sorting-caption">Sort by </span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}
      >
        {activeSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}>
         {(Object.keys(SORT_TYPES) as SortKeys[]).map((key) => (
            <li
              key={key}
              className={cn('places__option', {
                'places__option--active': SORT_TYPES[key] === activeSortType,
              })}
              tabIndex={0}
              onClick={() => {
                setIsOpen(false)
                handleSortChange(key)
              }}
            >
              {SORT_TYPES[key]}
            </li>
          ))}
      </ul>
    </form>
  )
}

export default Sort
