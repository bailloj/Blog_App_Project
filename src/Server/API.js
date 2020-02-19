const uri = "mongodb+srv://AAA2502:AMAZING1@cluster0-i2p0i.gcp.mongodb.net/test?retryWrites=true&w=majority"
const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect(uri, {useNewUrlParser: true});
const db = mongoose.connection;
//const cron = require("node - cron");
//const nodeMailer = require('nodemailer');
var subscribeSchema = new mongoose.Schema({
    email: String,
});
var postSchema = new mongoose.Schema({
    name: String,
    title: String,
    date: Date,
    imgsrc: String,
    body: String
});
var Post = mongoose.model('Post', postSchema);
db.on('error', console.error.bind(console, 'connection error:'));

function funcName(userInfo) {
    // Practice with mongoose & test connection
    var currentPost = new Post({ ...userInfo });
    //console.log(userInfo); // 'Silence'
    currentPost.save(function (err, currentPost) {
        if (err) return console.error(err);
        console.log("No error!")
    });
    console.log("Connected!");
};

var date1 = new Date;
date1 = '2020-02-18';
//db.once('open', () => funcName({name: 'Asad', title: 'Post1', date: date1, imgsrc: 'anything rn', body: 'body'}));
db.once('open', Post.find(function (err, posts) {
    if (err) return console.error(err);
    // console.log(posts);
    console.log(typeof (posts));
    var i;
    var postsArray = new Array();
    for (i = 0; i < posts.length; i++) {
        var postObject = posts[i].toObject();
        postsArray[i] = postObject;
        //var myJSON = JSON.stringify(postObject);
        //console.log(myJSON);
    }
    return postsArray;
}).sort('-date').exec(function (err, docs) { }));

/*Post.find(function (err, posts) {
    if (err) return console.error(err);
   // console.log(posts);
    console.log(typeof (posts));
    var i;
    var postsArray = new Array();
    for (i = 0; i < posts.length; i++) {
        var postObject = posts[i].toObject();
        postsArray[i] = postObject;
        var myJSON = JSON.stringify(postObject);
        console.log(myJSON);
    }
    return postsArray;
}).sort('-date').exec(function (err, docs) { });*/

/*cron.schedule("* 17 * * *", function () {
    console.log("\Running Cron Job");
    let transporter = nodeMailer.createTransport({
        host: 'http://www.gmail.com/',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'asahmed4521@gmail.com', // generated ethereal user
            pass: 'AMAZING1' // generated ethereal password
        }
    });
    const mailOptions = {
        from: '"John Doe" < john.doe@example.com>', // sender address
        to: 'jane.doe@example.com', // list of receivers
        subject: 'Hello there!', // Subject line
        text: 'A Message from Node Cron App', // plain text body
        html: '<b>A Message from Node Cron App</b>' // html body
    };
    transporter.sendMail(mailOptions, function (error, info) {
        console.log(info.messageId);
        if (err) {
            console.log(err);
        }
    });
});*/

