import { AppRoute, OfferCardClassNames } from '@/const'
import cn from 'classnames'
import FavoriteButton from '@/components/favorite-button/favorite-button'
import { generatePath, Link } from 'react-router-dom'
import { ImageClassWrapper } from './const'
import { memo } from 'react'

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

const Card = memo(({
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
      <div className={`${ImageClassWrapper[view]} place-card__image-wrapper`}>
        <Link to={generatePath(AppRoute.Offer, { id: `${id}` })}>
          <img
            className="place-card__image"
            src={image}
            width={width}
            height={height}
            alt="Place image"
          />
        </Link>
      </div>

      {view === 'favorites' && isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
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
          <FavoriteButton id={id} />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${rating}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={generatePath(AppRoute.Offer, {id: `${id}`})}>
            {name}
          </Link>
        </h2>
        <p className="place-card__type">
          {type[0].toUpperCase() + type.slice(1)}
        </p>
      </div>
    </article>
  )
})

export default Card
