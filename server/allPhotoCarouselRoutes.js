const express = require('express');
const allPhotoCarouselRoutes = express.Router();

const mongoose = require('mongoose');
const Photo = require('../allPhotoCarouselDB/model.js');


// const options = { useNewUrlParser: true, useUnifiedTopology: true }; 
const mongoDB = 'mongodb://localhost:27017/seeAllPhotos'; // to access db make sure the socket # is included here // mongoose instance connection url connection
mongoose.connect(mongoDB);

const db = mongoose.connection;

db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to MongoDB'));

allPhotoCarouselRoutes.get('/seeAllPhotos', (req, res) => {
    //   console.log(res.body);
    Photo.find(res.body, (err, photo) => {
        if (err) {
            res.send(err);
        }
        // res.json(photo);
        console.log(photo)
        res.send(photo);
    });
});

allPhotoCarouselRoutes.get('/seeAllPhotos/:photoId', (req, res) => {
    const { photoId } = req.params;
    Photo.findById(photoId, (err, photo) => {
        if (err) {
            res.send(err);
        }
        console.log(photo)
        res.send(photo);
    });
});

module.exports = allPhotoCarouselRoutes;