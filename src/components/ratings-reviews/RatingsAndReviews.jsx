import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Reviews from './reviews/Reviews';
import Ratings from './ratings/Ratings';
import { useGlobalContext } from '../../context/GlobalStore';
import { useRAndRContext } from '../../context/RAndRContext';

export default function RatingsAndReviews() {
  const { productId, setAvgRating } = useGlobalContext();
  const {
    setReviewsMeta,
    setReviews,
    setShowAdd,
    setPage,
    reviewsSort,
    reviews,
    page,
  } = useRAndRContext();
  console.log('ratings and reviews [rendered]');

  useEffect(() => {
    axios.get(`/reviews/meta/${productId}`)
      .then(({ data }) => {
        console.log('meta', data);
        setReviewsMeta(data);
        setAvgRating(data.averageRating);
      })
      .catch((err) => {
        console.log('Error fetching average ratings:', err);
      });
  }, []);

  useEffect(() => {
    if (page === 1) {
      axios.get(`/reviews/${productId}/${page}/${reviewsSort}`)
        .then(({ data }) => {
          if (data.results.length < 2) setShowAdd(false);
          setReviews(data.results);
        })
        .catch((err) => {
          console.log('error fetching reviews', err);
        });
    } else {
      setPage(1);
      setReviews([]);
      setShowAdd(true);
    }
  }, [reviewsSort]);

  useEffect(() => {
    axios.get(`/reviews/${productId}/${page}/${reviewsSort}`)
      .then(({ data }) => {
        if (data.results.length < 2) setShowAdd(false);
        setReviews(reviews.concat(...data.results));
      })
      .catch((err) => {
        console.log('error fetching reviews', err);
      });
  }, [page]);

  return (
    <div id="ratings-and-reviews">
      <Ratings />
      <Reviews />
    </div>
  );
}
