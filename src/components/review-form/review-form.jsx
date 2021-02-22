import React from 'react';

import {RATING} from '../../const';


const ReviewForm = () => {

  const [reviewForm, setReviewForm] = useState({});

  const handleSubmit = (evt) => {
    evt.preventDefault();
  };


  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" for="review">Your review</label>
      <div className="reviews__rating-form form__rating">
      {RATING.map(({value, title}) => (
        <React.Fragment key={value}>
          <input className="form__rating-input visually-hidden" name="rating" value={value} id="5-stars" type="radio"/>
          <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title={title}>
            <svg className="form__star-image" width={37} height={37}>
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>
        </React.Fragment>
      ))}
    </div>

    <textarea className="reviews__textarea form__textarea" id="review" name="review"
    placeholder="Tell how was your stay, what you like and what can be improved"/>

    <div className="reviews__button-wrapper">
      <p className="reviews__help">
        To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
      </p>
      <button className="reviews__submit form__submit button" type="submit" disabled="">Submit</button>
    </div>
    </form>
  );
};

export default ReviewForm;
