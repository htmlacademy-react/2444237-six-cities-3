import { AuthorizationStatus } from '@/const'
import { useAppSelector } from '@/hooks'
import { getFormatedDate, getRatingPercent } from '@/pages/offer/utils'
import { selectAuthorizationStatus } from '@/store/auth/selectors'
import { selectComments } from '@/store/comments-slice/selectors'
import ReviewForm from '../review-form/review-form'

type OfferReviewsType = {
  offerId: string | undefined
}

const OfferReviews = ({ offerId }: OfferReviewsType) => {
  const comments = useAppSelector(selectComments)
  const authorizationStatus = useAppSelector(selectAuthorizationStatus)

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{comments.length}</span>
      </h2>
      <ul className="reviews__list">
        {comments.map((comment) => (
          <li key={comment.date + comment.user.name} className="reviews__item">
            <div className="reviews__user user">
              <div className="reviews__avatar-wrapper user__avatar-wrapper">
                <img
                  className="reviews__avatar user__avatar"
                  src={comment.user.avatarUrl}
                  width={54}
                  height={54}
                  alt="Reviews avatar"
                />
              </div>
              <span className="reviews__user-name">{comment.user.name}</span>
            </div>
            <div className="reviews__info">
              <div className="reviews__rating rating">
                <div className="reviews__stars rating__stars">
                  <span
                    style={{
                      width: `${getRatingPercent(comment.rating)}%`,
                    }}
                  />
                  <span className="visually-hidden">Rating</span>
                </div>
              </div>
              <p className="reviews__text">{comment.comment}</p>
              <time className="reviews__time" dateTime="2019-04-24">
                {getFormatedDate(comment.date)}
              </time>
            </div>
          </li>
        ))}
      </ul>
      {authorizationStatus === AuthorizationStatus.Auth && (
        <ReviewForm offerId={offerId} />
      )}
    </section>
  )
}

export default OfferReviews
