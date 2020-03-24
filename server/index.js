const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const port = 3200;
const popularDishesRouter = require('./popularDishesRoutes.js');
const allPhotoCarouselRoutes = require('./allPhotoCarouselRoutes.js');
const restaurantInfoRoutes = require('./restaurantInforRoutes.js');
const restaurantReviewsRoutes = require('./restaurantReviewsRoutes.js');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', popularDishesRouter);
app.use('/', allPhotoCarouselRoutes);
app.use('/', restaurantInfoRoutes);
app.use('/', restaurantReviewsRoutes);

app.use('/', express.static(path.join(__dirname, '../client/dist/')))

app.listen(port, () => {
    console.log('server is running on', + port)
})