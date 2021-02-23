import React from 'react';
import PropTypes from 'prop-types';
import {reviewPropType} from '../../prop-types';

const ReviewsList = (props) => {
  const {reviews} = props;

  const longDate = new Date(review.date).toLocaleString(`en-US`, {year: `numeric`, month: `long`});
  const shortDate = new Date(review.date).toLocaleString(`en-CA`, {dateStyle: `short`});

  const getStarsWidth = (rating) => {
    return `${Math.round(rating) * 20}%`;
  };

  return (

    <ul className="reviews__list">
    {reviews.map((review) => (
    <li classNameName="reviews__item" key={review.id}>
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={review.user.avatarUrl} width={54} height={54} alt="Reviews avatar"/>
        </div>
        <span className="reviews__user-name">
          {review.user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${getStarsWidth(review.rating)}`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {review.comment}
        </p>
        <time className="reviews__time" datetime={shortDate}>{longDate}</time>
      </div>
    </li>
  ))}
</ul>
  );
};

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(reviewPropType)
};


export default ReviewsList;
