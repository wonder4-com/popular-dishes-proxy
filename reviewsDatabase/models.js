const db = require('./index.js')


const getRecentReviews = (callback) => {
  //get most recent 15 reviews
  let queryString = 'SELECT * FROM reviews ORDER BY date DESC LIMIT 15';
  db.query(queryString, (err, results) => {
    if (err) {
      console.log('error getting recent reviews from database', err)
    } else {
      // console.log(results);
      callback(null, results);
    }
  })
} 

const getRestaurantName = (id, callback) => {
  //get the restrant by restaurant id
  let queryString = `SELECT name FROM restaurants WHERE id=${id}`;
  db.query(queryString, (err, result) => {
    if (err) {
      console.log('error getting restaurant name from database', err)
    } else {
      // console.log(result);
      callback(null, result);
    }
  })
} 

const getReviewsByRestaurant = (id, callback) => {
  // get All the reviews by a resturant id
  let queryString = `SELECT * FROM reviews INNER JOIN restaurants ON reviews.restaurant_id = restaurants.id WHERE reviews.restaurant_id = ${id} ORDER BY date DESC`
  db.query(queryString, (err, results) => {
    if (err) {
      console.log('error getting reviews by restaurant from database', err)
    } else {
      // console.log(results);
      callback(null, results);
    }
  });
};


const insertReview = (review, callback) => {
  let queryString = `INSERT INTO reviews(rating, comment, date, username, usercity, avatar, restaurant_id) 
  VALUES(${review.rating}, '${review.comment}', STR_TO_DATE("${review.date}", "%m/%d/%Y"), '${review.username}', '${review.usercity}', '${review.avatar}', '${review.restaurant_id}')`;
  db.query(queryString, (err, results) => {
    if (err) {
      console.log('error inserting review', err);
    } else {
      // console.log(results);
      callback(null, results);
    }
  });
};

module.exports = { getRecentReviews, getRestaurantName, getReviewsByRestaurant, insertReview };
