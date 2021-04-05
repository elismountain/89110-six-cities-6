import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {sendReview} from '../../store/api-actions';

import {Ratings, COMMENT_MIN_LENGTH} from '../../const';

const ReviewForm = (props) => {
  const {id, onSubmit} = props;
  const initialState = {'rating': null, 'comment': ``};
  const [reviewForm, setReviewForm] = useState(initialState);
  const [disabled, setDisabled] = useState(true);

  const handleFieldChange = (evt) => {
    const {name, value} = evt.target;
    setReviewForm({...reviewForm, [name]: value});
  };

  useEffect(() => {
    setDisabled(!reviewForm.rating || reviewForm.comment.length < COMMENT_MIN_LENGTH);
  }, [reviewForm]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit({id, review: reviewForm});
    setReviewForm({...reviewForm, ...initialState});
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {Ratings.map(({value, title}) => (
          <React.Fragment key={value}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              id={`${value}-stars`}
              type="radio"
              onChange={handleFieldChange}
              checked={value === +reviewForm.rating}
            />
            <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title={title}>
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>
        ))}
      </div>

      <textarea className="reviews__textarea form__textarea" id="comment" name="comment"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={reviewForm.comment}
        onChange={handleFieldChange} />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={disabled}>Submit</button>
      </div>
    </form>
  );
};

ReviewForm.propTypes = {
  id: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onSubmit({id, review}) {
    dispatch(sendReview({id, review}));
  }
});

export {ReviewForm};
export default connect(null, mapDispatchToProps)(ReviewForm);
