var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var mongoose = require('mongoose');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 8090;


mongoose.connect('mongodb://localhost:27017/easy-notes', {
	useMongoClient: true
});

mongoose.connection.on('error', function() {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});
mongoose.connection.once('open', function() {
    console.log("Successfully connected to the database");
});
 var Note = require('./product');
var router = express.Router();
router.use(function (req, res, next) {
    // do logging 
    // do authentication 
    console.log('Logging of request will be done here'+req);
    next(); // make sure we go to the next routes and don't stop here
});

router.get('/', function(req, res) {
    res.redirect("/index.html"); 
});


router.route('/notes').get(function (req, res) {
	console.log("innn1 notes");
    Note.find(function (err, notes) {
        if (err) {
            res.status(500).send({message: "Some error ocuured while retrieving notes."});
        }
        res.json(notes);
    });
});

router.route('/products').post(function (req, res) {
    console.log("in add");
    var p = new product();
    p.title = req.body.title;
    p.price = req.body.content;
    p.save(function (err) {
        if (err) {
            res.send(err);
        }
        console.log("added");
        res.send({ message: 'Product Created !' })
    })
});
router.route('/products/:product_id').get(function (req, res) {


    product.findById(req.params.product_id, function (err, prod) {
        if (err)
            res.send(err);
        res.json(prod);
    });
});

router.route('/products/:product_id').put(function (req, res) {

    product.findById(req.params.product_id, function (err, prod) {
        if (err) {
            res.send(err);
        }
        prod.title = req.body.title;
        prod.price = req.body.content;

        prod.save(function (err) {
            if (err)
                res.send(err);

            res.json({ message: 'Product updated!' });
        });

    });
});

router.route('/products/:product_id').delete(function (req, res) {

    product.remove({ _id: req.param.product_id }, function (err, prod) {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Successfully deleted' });
    })

});


app.use(cors());
app.use('/api', router);
app.listen(port);
console.log('REST API is runnning at ' + port);
