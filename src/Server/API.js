const uri = "mongodb+srv://AAA2502:AMAZING1@cluster0-i2p0i.gcp.mongodb.net/test?retryWrites=true&w=majority"
const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect(uri, {useNewUrlParser: true});
const db = mongoose.connection;
var postSchema = new mongoose.Schema({
    name: String,
    title: String,
    date: Date,
    imgsrc: String,
    body: String
});
var Post = mongoose.model('Post', postSchema);
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function funcName(userInfo) {
    // Practice with mongoose & test connection
    var currentPost = new Post({ ...userInfo });
    //console.log(userInfo); // 'Silence'
    currentPost.save(function (err, currentPost) {
        if (err) return console.error(err);
        console.log("No error!")
    });
    console.log("Connected!");
});

Post.find(function (err, posts) {
    if (err) return console.error(err);
    console.log(posts);
    return posts;
}).sort('-date').exec(function (err, docs) { });