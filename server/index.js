const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const port = 3200;
// const popularDishesRouter = require('./popularDishesRoutes.js');
// const allPhotoCarouselRoutes = require('./allPhotoCarouselRoutes.js');
// const restaurantInfoRoutes = require('./restaurantInforRoutes.js');
// const restaurantReviewsRoutes = require('./restaurantReviewsRoutes.js');
const cors = require("cors");
const httpProxy = require("http-proxy");

app.use(cors());

const proxy = httpProxy.createProxyServer({});

app.use('/', express.static(path.join(__dirname, '../client/dist/')))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.all('/seeAllPhotos*', (req, res) => {
    proxy.web(req, res, {
        target: "http://localhost:3002"
    });
});

app.all('/popularDishes/*', (req, res) => {
    proxy.web(req, res, {
        target: "http://localhost:3000"
    });
});


app.all('/api/*', (req, res) => {
    proxy.web(req, res, {
        target: "http://localhost:3003"
    });
});


app.all('/*', (req, res) => {
    proxy.web(req, res, {
        target: "http://localhost:8000"
    });
});


// app.use('/', popularDishesRouter);
// app.use('/', allPhotoCarouselRoutes);
// app.use('/', restaurantInfoRoutes);
// app.use('/', restaurantReviewsRoutes);




app.listen(port, () => {
    console.log('server is running on', + port)
})