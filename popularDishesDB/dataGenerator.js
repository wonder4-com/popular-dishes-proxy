const aws = require('aws-sdk');
const config = require('../config.json');
const db = require('./index.js');
const faker = require('faker');
const axios = require('axios');

// how many companies do we want to be made
const numberOfCompanies = 10;

// maxDishes in a company
var maxDishes = 9;

// Max number of reviews per dish
var maxReviews = 100;

// max number of photos per dish
var maxPhotos = 20;

// region and bucket for aws
var photoBucket = 'photosthree';
var westRegion = 'us-west-1';

// function for making one company
const makeCompany = () => {
    return new Promise((resolve, reject) => {
        var params = [faker.company.companyName()]
        var query = 'INSERT INTO Restaurants (restaurant_name) values(?)'
        db.query(query, params, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    })
}

// function for making one dish
const makeDish = (addDish, params) => {
    return new Promise((res, rej) => {
        db.query(addDish, params, (err, data) => {
            if (err) {
                rej(err)
            } else {
                res(data)
            }
        })
    })
};

// function for making one photo
const makePhoto = (addPhoto, photoParams) => {
    return new Promise((res, rej) => {
        db.query(addPhoto, photoParams, (err) => {
            if (err) {
                rej(err)
            } else {
                res();
            }
        })
    })
};

//function for making one review;
const makeReview = (reviewParams) => {
    return new Promise((res, rej) => {
        query = 'INSERT INTO reviews (userid, date, rating, text, dish_id) values (?,?,?,?,?)';
        db.query(query, reviewParams, (err) => {
            if (err) {
                rej(err)
            } else {
                res();
            }
        })
    })
}

//make users
const makeUser = (imageUrl) => {
    return new Promise((res, rej) => {
        var userParams = [faker.name.findName(), imageUrl, Math.floor(Math.random() * 100), Math.floor(Math.random() * 20)];
        var query = 'INSERT INTO users (username, userphoto, reviews, friends) values (?, ?, ?, ?)';
        db.query(query, userParams, (err, data) => {
            if (err) {
                rej(err)
            } else {
                res(data);
            }
        })
    })
}

const formatUrlWithKey = (object, region) => {
    return 'https://photosthree.s3-' + region + '.amazonaws.com/' + object.Key;
    return object.Key;
}

(async function () {
    try {
        aws.config.setPromisesDependency();
        aws.config.update({
            region: westRegion,
            arn: 'aws:s3:us-west-1:691981644502:accesspoint/photoswonderfour'
        });

        const s3 = new aws.S3();

        const response = await s3.listObjectsV2({
            Bucket: photoBucket,
            Prefix: 'Random Foods' // folder names can be changed here
        }).promise();

        console.log(response);
    }

    //     const response2 = await s3.listObjectsV2({
    //         Bucket: photoBucket,
    //         Prefix: 'Random Foods 2' //folder names can be changed here
    //     }).promise();

    //     const response3 = await s3.listObjectsV2({
    //         Bucket: photoBucket,
    //         Prefix: 'main-sprites' // had three folders, but you should ideally have two folders
    //     }).promise();

    //     var arrayOfObjects = response.Contents.concat(response2.Contents)
    //     var arrayOfProfiles = response3.Contents;

    //     for (var i = 0; i < numberOfCompanies; i++) {
    //         makeCompany()
    //             .then(data => {
    //                 // after making one company we get it's restaurantid
    //                 var restaurantId = data.insertId;
    //                 console.log('made restaurant with restaurant_id', restaurantId)
    //                 for (var i = 0; i < maxDishes; i++) {
    //                     var reviewCount = Math.round(Math.random() * maxReviews);
    //                     console.log('----------------------------------------', reviewCount);
    //                     var params = [faker.lorem.word(), faker.random.number(), faker.lorem.words(), reviewCount, restaurantId]
    //                     var addDish = 'INSERT INTO PopularDishes (dish_name, price, description, review_count, restaurant) values (?,?,?,?,?)';
    //                     // then we make multiple dishes with the restaurantid as it's foreign key
    //                     makeDish(addDish, params)
    //                         .then(data => {
    //                             var dish_id = data.insertId;
    //                             for (var o = 0; o < Math.floor(Math.random() * maxPhotos) + 1; o++) {
    //                                 var addPhoto = 'INSERT INTO photos (url, caption, popular_dish) values (?,?,?)';
    //                                 var randomObject = arrayOfObjects[Math.floor(Math.random() * arrayOfObjects.length)];
    //                                 var photoUrl = formatUrlWithKey(randomObject, westRegion);
    //                                 var photoParams = [photoUrl, faker.lorem.words(), dish_id];
    //                                 makePhoto(addPhoto, photoParams)
    //                             }

    //                             for (var k = 0; k < params[3]; k++) {
    //                                 var imageUrl = formatUrlWithKey(arrayOfProfiles[Math.floor(Math.random() * arrayOfObjects.length)], westRegion);
    //                                 makeUser(imageUrl)
    //                                     .then((response => {
    //                                         var userid = response.insertId;
    //                                         var reviewParams = [userid, faker.date.past(1), Math.ceil(Math.random() * 5), faker.lorem.sentences(), dish_id];
    //                                         makeReview(reviewParams)
    //                                             .then(() => {
    //                                                 console.log('reviews have been made');
    //                                             })
    //                                 }))
    //                                 .catch(err => console.log('user with that username already exists -----------------------------'));
    //                             }
    //                         }
    //                         );
    //                 }
    //             })
    //     }

     catch (e) {
        console.log('our error', e);
    }

})();

// setTimeout(() => {
//     (async function () {
//         try {
//             aws.config.setPromisesDependency();
//             var photoBucket = 'photosthree';
//             var westRegion = 'us-west-1';
//             aws.config.update({
//                 accessKeyId: config.aws.accessKey,
//                 secretAccessKey: config.aws.secretKey,
//                 region: westRegion
//             });

//             const s3 = new aws.S3();

//             const response3 = await s3.listObjectsV2({
//                 Bucket: photoBucket,
//                 Prefix: 'main-sprites'
//             }).promise();

//             var arrayOfObjects = response3.Contents;

//             db.query('SELECT * FROM PopularDishes', (err, data) => {
//                 var dishes = data;
//                     for (var i = 0; i < dishes.length; i++) {
//                         // making users after dish is made
//                         for (var k = 0; k < dishes[i].review_count; k++) {
//                             var imageUrl = formatUrlWithKey(arrayOfObjects[Math.floor(Math.random() * arrayOfObjects.length)], westRegion);
//                             var idOfDish = dishes[i].dish_id
//                                     makeUser(imageUrl)
//                                         .then((response => {
//                                             var userid = response.insertId;
//                                             var reviewParams = [userid, faker.date.past(1), Math.ceil(Math.random() * 5), faker.lorem.sentences(), idOfDish];
//                                             makeReview(reviewParams)
//                                                 .then(() => {
//                                                     console.log('reviews have been made');
//                                                 })
//                                         }))
//                         }
//                     }
//             })

//         } catch (e) {
//             console.log('our error', e);
//         }
//     })();
// }, 5000)

// generateData();

// var selectiveQuery = 'SELECT a.*, b.* FROM reviews a INNER JOIN users b ON a.userid = b.userid WHERE a.dish_id = 1';
// var selectPhotos = 'SELECT a.*, b.* FROM photos a INNER JOIN PopularDishes b ON a.popular_dish = b.dish_id WHERE a.popular_dish = 5';


// // var query = 'SELECT * FROM PopularDishes INNER JOIN Restaurants ON PopularDishes.restaurant = Restaurants.restaurant_id'; // get table of popular dishes and restaurants joined at restaurant id

// module.exports = numberOfCompanies;

