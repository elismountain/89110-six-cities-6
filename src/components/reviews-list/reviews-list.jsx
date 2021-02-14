import React from 'react';

const ReviewsList = () => {

  return (
    <ul class="reviews__list">
      <li class="reviews__item">
        <div class="reviews__user user">
          <div class="reviews__avatar-wrapper user__avatar-wrapper">
            <img class="reviews__avatar user__avatar" src="img/avatar-max.jpg" width="54" height="54" alt="Reviews avatar">
          </div>
          <span class="reviews__user-name">
            Max
          </span>
        </div>
        <div class="reviews__info">
          <div class="reviews__rating rating">
            <div class="reviews__stars rating__stars">
              <span style="width: 80%"></span>
              <span class="visually-hidden">Rating</span>
            </div>
          </div>
          <p class="reviews__text">
            A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.
          </p>
          <time class="reviews__time" datetime="2019-04-24">April 2019</time>
        </div>
      </li>
    </ul>
  );
};

export default ReviewsList;
