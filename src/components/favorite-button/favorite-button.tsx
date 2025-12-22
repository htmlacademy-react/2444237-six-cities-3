import { useAppDispatch } from '@/hooks'
import { updateFavoriteOfferStatus } from '@/store/favorite-slice/api-actions'

type FavoriteButtonType = {
  id: string
  type?: 'place' | 'offer'
}

const FavoriteButton = ({ id, type = 'place' }: FavoriteButtonType) => {
  const dispatch = useAppDispatch()
  const handleClick = () => {
    dispatch(updateFavoriteOfferStatus(id))
  }
  return (
    <>
      {type === 'offer' && (
        <button
          className="offer__bookmark-button button"
          type="button"
          onClick={handleClick}
        >
          <svg className="offer__bookmark-icon" width={31} height={33}>
            <use xlinkHref="#icon-bookmark" />
          </svg>
          <span className="visually-hidden">To bookmarks</span>
        </button>
      )}
      {type === 'place' && (
        <button
          className="place-card__bookmark-button button"
          type="button"
          onClick={handleClick}
        >
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">To bookmarks</span>
        </button>
      )}
    </>
  )
}

export default FavoriteButton
