import { AppRoute, AuthorizationStatus } from '@/const'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { router } from '@/router/router'
import { selectAuthorizationStatus } from '@/store/auth/selectors'
import { updateFavoriteOfferStatus } from '@/store/favorite-slice/api-actions'
import { selectFavoriteOffers } from '@/store/favorite-slice/selectors'
import cn from 'classnames'

type FavoriteButtonType = {
  id: string
  type?: 'place-card' | 'offer'
}

const sizes = {
  'place-card': {
    width: 18,
    height: 19,
  },
  offer: {
    width: 31,
    height: 33,
  },
}

const FavoriteButton = ({ id, type = 'place-card' }: FavoriteButtonType) => {
  const favoriteOffers = useAppSelector(selectFavoriteOffers)
  const currentOffer = favoriteOffers.find((offer) => offer.id === id)
  const authorizationStatus = useAppSelector(selectAuthorizationStatus)
  
  const {width, height} = sizes[type]

  const dispatch = useAppDispatch()

  const handleClick = () => {
  if (authorizationStatus !== AuthorizationStatus.Auth) {
    router.navigate(AppRoute.Login)
  }
    dispatch(updateFavoriteOfferStatus(id))
  }
  
  return (
    <>
    <button className={cn("button", `${type}__bookmark-button`, {
        [`${type}__bookmark-button--active`]: currentOffer?.isFavorite
    })}
          type="button"
          onClick={handleClick}
        >
          <svg className={`${type}__bookmark-icon`} width={width} height={height}>
            <use xlinkHref="#icon-bookmark" />
          </svg>
          <span className="visually-hidden">{currentOffer?.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
        </button>
    </>
  )
}

export default FavoriteButton
