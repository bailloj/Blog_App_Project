const uri = "mongodb+srv://Blogger:blogger123@blogcluster-4fqsl.gcp.mongodb.net/test?retryWrites=true&w=majority"
const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect(uri, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    /*
    // Practice with mongoose & test connection
    var dessertPostSchema = new mongoose.Schema({
        user: String,
        image: String

      });
    var Kitten = mongoose.model('Kitten', kittySchema);
    var silence = new Kitten({ name: 'Silence' });
    console.log(silence.name); // 'Silence'
    silence.save(function (err, silence) {
        if (err) return console.error(err);
        console.log("No error!")
    });
    Kitten.find(function (err, kittens) {
        if (err) return console.error(err);
        console.log(kittens);
      })
    */
   console.log("Connected!");   
});

/*
Get request 
Post request
*/