var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('todosdatabase', ['todosdatabase']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/todosdatabase', function (req, res) {


    db.todosdatabase.find(function (err, docs) {
        console.log(docs);
        res.json(docs);
    });
});

app.post('/todosdatabase', function (req, res) {
    console.log(req.body);
    db.todosdatabase.insert(req.body, function(err, doc) {
        res.json(doc);
    });
});

app.delete('/todosdatabase/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    db.todosdatabase.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
        res.json(doc);
    });
});

app.get('/todosdatabase/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    db.todosdatabase.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
        res.json(doc);
    });
});

app.put('/todosdatabase/:id', function (req, res) {
    var id = req.params.id;
    console.log(req.body.name);
    db.todosdatabase.findAndModify({
        query: {_id: mongojs.ObjectId(id)},
        update: {$set:
        {id: req.body.id,
            text: req.body.text,
            state: req.body.state,
            toDate: req.body.toDate}},
        new: true}, function (err, doc) {
        res.json(doc);
    });
});



app.listen(3000);
console.log("Server running on port 3000");
