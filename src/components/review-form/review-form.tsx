import { reviewFormRating } from './const'
import { useForm } from 'react-hook-form'
import z from 'zod'
import cn from 'classnames'
import styles from './review-form.module.css'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppDispatch } from '@/hooks'
import { sentOfferComment } from '@/store/comments-slice/api-actions'
import { Fragment } from 'react'

type ReviewFormProps = {
  offerId: string | undefined
}

const userCommentSchema = z.object({
  rating: z.string().min(1).max(5),
  comment: z.string().min(50).max(300),
})

export type UserComment = z.infer<typeof userCommentSchema>

const ReviewForm = ({ offerId }: ReviewFormProps): JSX.Element => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<UserComment>({
    resolver: zodResolver(userCommentSchema),
    defaultValues: {
      comment: '',
      rating: '0',
    },
  })

  const dispatch = useAppDispatch()

  const onSubmit = ({ rating, comment }: UserComment) => {
    if (!offerId) {
      return
    }
    dispatch(
      sentOfferComment({
        offerId,
        comment: {
          rating: Number(rating),
          comment,
        },
      }),
    )

    reset()
  }

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={(evt) => {
        evt.preventDefault()
        handleSubmit(onSubmit)()
      }}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {reviewFormRating.map((item) => (
          <Fragment key={item.id}>
            <input
              key={item.id}
              className={cn('form__rating-input visually-hidden', {
                [styles.error]: !!errors.rating,
              })}
              value={item.value}
              id={item.id}
              type="radio"
              {...register('rating')}
            />
            <label
              htmlFor={item.id}
              className="reviews__rating-label form__rating-label"
              title={item.title}
            >
              <svg className="form__star-image" width={37} height={33}>
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      {errors.rating && (
        <div className={styles.error_text}>{errors.rating?.message}</div>
      )}
      <textarea
        className={cn('reviews__textarea form__textarea', {
          [styles.error]: errors.comment,
        })}
        id="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        defaultValue={''}
        {...register('comment')}
      />
      {errors.comment && (
        <div className={styles.error_text}>{errors.comment?.message}</div>
      )}
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit">
          Submit
        </button>
      </div>
    </form>
  )
}

export default ReviewForm
