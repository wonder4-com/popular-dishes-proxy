const express = require('express');
const restaurantReviewsRoutes = express.Router();
const db = require('../reviewsDatabase/models.js')

restaurantReviewsRoutes.get('/api/reviews', (req, res) => {
    console.log("handling the get request!", req.body)
    // console.log(db.getRecentReviews)
    db.getRecentReviews((err, reviews) => {
        if (err) {
            console.log('error calling db.getRecentReviews')
        } else {
            res.send(reviews);
        }
    })

});

restaurantReviewsRoutes.get('/api/restaurant/:id', (req, res) => {
    console.log("handling the get request for restaurant name!", req.params)
    // console.log(db.getRecentReviews)
    db.getRestaurantName(req.params.id, (err, result) => {
        if (err) {
            console.log('error calling db.getRecentReviews')
        } else {
            console.log(result);
            res.send(result[0].name);
        }
    })

});

restaurantReviewsRoutes.get('/api/restaurants/:id/reviews', (req, res) => {
    console.log('handleing get request for reviews by restaurant', req.params)
    db.getReviewsByRestaurant(req.params.id, (err, reviews) => {
        if (err) {
            console.log('error calling db.getReviewsByRestaurant')
            res.status(501).send(err);
        } else {
            res.status(200).send(reviews);
        }
    });
});

restaurantReviewsRoutes.post('/api/restaurants/:id/newreview', (req, res) => {
    console.log('handleing post request for new review by restaurant', req.body)
    let review = req.body;
    console.log('here is our request body upon making a review', req.body);
    db.insertReview(review, (err) => {
        if (err) {
            console.log('error calling db.getReviewsByRestaurant')
            res.status(501).send(err);
        } else {
            console.log('insert review successfully!')
            res.status(200).end();
        }
    });
})

module.exports = restaurantReviewsRoutes;