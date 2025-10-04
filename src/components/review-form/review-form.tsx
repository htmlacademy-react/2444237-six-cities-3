import { useState } from 'react'

const ReviewForm = (): JSX.Element => {
  const [rating, setRating] = useState<number>(0)
  const [comment, setComment] = useState<string>('')

  const handleCommentTextChange = (
    evt: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    evt.preventDefault()
    setComment(evt.target.value)
  }

  const handleFormSubmit = (evt: React.FormEvent<HTMLButtonElement>) => {
    evt.preventDefault()
  }

  const handleRatingChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault()
    setRating(Number(evt.target.value))
  }
  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          onChange={handleRatingChange}
          defaultValue={5}
          id="5-stars"
          value={rating}
          type="radio"
        />
        <label
          htmlFor="5-stars"
          className="reviews__rating-label form__rating-label"
          title="perfect"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          onChange={handleRatingChange}
          defaultValue={4}
          id="4-stars"
          type="radio"
        />
        <label
          htmlFor="4-stars"
          className="reviews__rating-label form__rating-label"
          title="good"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          onChange={handleRatingChange}
          defaultValue={3}
          id="3-stars"
          type="radio"
        />
        <label
          htmlFor="3-stars"
          className="reviews__rating-label form__rating-label"
          title="not bad"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          onChange={handleRatingChange}
          defaultValue={2}
          id="2-stars"
          type="radio"
        />
        <label
          htmlFor="2-stars"
          className="reviews__rating-label form__rating-label"
          title="badly"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          onChange={handleRatingChange}
          defaultValue={1}
          id="1-star"
          type="radio"
        />
        <label
          htmlFor="1-star"
          className="reviews__rating-label form__rating-label"
          title="terribly"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        onChange={handleCommentTextChange}
        placeholder="Tell how was your stay, what you like and what can be improved"
        defaultValue={''}
        value={comment}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          onClick={handleFormSubmit}
        >
          Submit
        </button>
      </div>
    </form>
  )
}

export default ReviewForm
