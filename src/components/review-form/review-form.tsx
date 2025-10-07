import { reviewFormRating } from '@/const'
import { useState } from 'react'

const ReviewForm = (): JSX.Element => {
  const [formState, setFormState] = useState({
    rating: '0',
    review: '',
  })

  const handleChange = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = evt.target
    setFormState({
      ...formState,
      [name]: value,
    })
  }

  const handleFormSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
  }

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleFormSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {reviewFormRating.map((item) => (
          <>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              onChange={handleChange}
              defaultValue={item.value}
              id={item.id}
              type="radio"
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
          </>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        onChange={handleChange}
        placeholder="Tell how was your stay, what you like and what can be improved"
        defaultValue={''}
        value={formState.review}
      />
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
