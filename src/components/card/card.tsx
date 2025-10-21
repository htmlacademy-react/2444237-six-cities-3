import { OfferCardClassNames, OFFER_URL } from '@/const'
import cn from 'classnames'
import FavoriteButton from '@/components/favorite-button/favorite-button'
import { Link } from 'react-router-dom'

type CardProps = {
  id: string
  image: string
  price: number
  name: string
  rating: number
  width: string
  height: string
  type: string
  className: OfferCardClassNames
  isPremium?: boolean
  onCardAction?: (id: string | null) => void
  view: 'list' | 'favorites' | 'near'
}

const Card = ({
  id,
  image,
  price,
  name,
  rating,
  width,
  height,
  type,
  className,
  isPremium,
  onCardAction,
  view,
}: CardProps): JSX.Element => {
  const handleOnMouseEnter = () => {
    onCardAction?.(id)
  }

  const handleOnMouseLeave = () => {
    onCardAction?.(null)
  }

  return (
    <article
      className={`${cn(className, 'place-card')}`}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    >
      {view === 'list' && (
        <div className="cities__image-wrapper place-card__image-wrapper">
          <Link to={`${OFFER_URL}${id}`}>
            <img
              className="place-card__image"
              src={image}
              width={width}
              height={height}
              alt="Place image"
            />
          </Link>
        </div>
      )}

      {view === 'near' && (
        <div className="near-places__image-wrapper place-card__image-wrapper">
          <Link to={`${OFFER_URL}${id}`}>
            <img
              className="place-card__image"
              src={image}
              width={width}
              height={height}
              alt="Place image"
            />
          </Link>
        </div>
      )}
      {view === 'favorites' && (
        <div className="place-card__mark">
          <span>{isPremium ? 'Premium' : ''}</span>
        </div>
      )}
      {view === 'favorites' && (
        <div className="favorites__image-wrapper place-card__image-wrapper">
          <Link to={`${OFFER_URL}${id}`}>
            <img
              className="place-card__image"
              src={image}
              width={width}
              height={height}
              alt="Place image"
            />
          </Link>
        </div>
      )}
      <div
        className={`${cn({
          'favorites__card-info': view === 'favorites',
          'cities__card-info': view === 'list',
          'place-card__info': true,
        })}`}
      >
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <FavoriteButton />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${rating}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{name}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  )
}

export default Card
