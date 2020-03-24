const express = require('express');
const popularDishesRoutes = express.Router();
const controller = require('./controller.js');
const companyNumber = 10; // this is how many companies there are;


popularDishesRoutes.get('/getCompany', (req, res) => {
    var companyId = Math.floor(Math.random() * companyNumber) + 1;
    controller.getCompany(companyId, res);
})

popularDishesRoutes.get('/getItems', (req, res) => {
    controller.getDishes(req, res);
});

popularDishesRoutes.get('/getPhotos', (req, res) => {
    console.log(req.query);
    controller.getPhotos(req, res);
})

popularDishesRoutes.get('/arrow.png', (req, res) => {
    res.sendFile('/Users/alexchung/Documents/HackReactor2020/popular-dishes/server/arrow.png');
});

popularDishesRoutes.get('/leftarrow.png', (req, res) => {
    res.sendFile('/Users/alexchung/Documents/HackReactor2020/popular-dishes/server/leftarrow.png');
});

popularDishesRoutes.get('/getReviews', (req, res) => {
    controller.getReviews(req, res);
})


module.exports = popularDishesRoutes;