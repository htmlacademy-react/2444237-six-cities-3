import { ClassNames } from '@/const'
import cn from 'classnames'
import FavoriteButton from '@/components/favorite-button/favorite-button'

type CardProps = {
  image: string
  price: number
  name: string
  rating: number
  width: string
  height: string
  type: string
  className: ClassNames
  isPremium?: boolean
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  view: 'list' | 'favorites' | 'near'
}

const Card = (props: CardProps): JSX.Element => {
  return (
    <article
      className={`${cn(props.className, 'place-card')}`}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    >
      {props.view === 'list' && (
        <div className="cities__image-wrapper place-card__image-wrapper">
          <a href="#">
            <img
              className="place-card__image"
              src={props.image}
              width={props.width}
              height={props.height}
              alt="Place image"
            />
          </a>
        </div>
      )}

      {props.view === 'near' && (
        <div className="near-places__image-wrapper place-card__image-wrapper">
          <a href="#">
            <img
              className="place-card__image"
              src={props.image}
              width={props.width}
              height={props.height}
              alt="Place image"
            />
          </a>
        </div>
      )}
      {props.view === 'favorites' && (
        <div className="place-card__mark">
          <span>{props.isPremium ? 'Premium' : ''}</span>
        </div>
      )}
      {props.view === 'favorites' && (
        <div className="favorites__image-wrapper place-card__image-wrapper">
          <a href="#">
            <img
              className="place-card__image"
              src={props.image}
              width={props.width}
              height={props.height}
              alt="Place image"
            />
          </a>
        </div>
      )}
      <div
        className={`${cn({
          'favorites__card-info': props.view === 'favorites',
          'cities__card-info': props.view === 'list',
          'place-card__info': true,
        })}`}
      >
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{props.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <FavoriteButton />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${props.rating}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{props.name}</a>
        </h2>
        <p className="place-card__type">{props.type}</p>
      </div>
    </article>
  )
}

export default Card
