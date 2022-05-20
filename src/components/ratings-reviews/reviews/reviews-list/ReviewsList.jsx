import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useId } from '../../../../context/GlobalStore';
import ReviewTile from './ReviewTile';

export default function ReviewsList() {
  const id = useId();
  const [reviews, setReviews] = useState([]);
  const fetchReviewsById = (product_id) => (
    axios.get(`/reviews`)
      .catch((err) => {
        console.log('error fetching reviews', err);
      })
  );

  useEffect(() => {
    fetchReviewsById(id)
      .then(({ data }) => {
        setReviews(data);
      });
  }, []);

  return (
    <div className="reviews-list">
      {reviews.results.map((review) => <ReviewTile key={review.id} review={review} />)}
    </div>
  );
}
