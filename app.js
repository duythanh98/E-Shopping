var express = require("express")
var bodyParser = require('body-parser')
var app = express();
var morgan = require('morgan');
var userRoute = require('./routes/user.route')
var catRoute = require('./routes/category.route')
var proRoute = require('./routes/product.route')
var authRoute = require('./routes/auth.route')
var indexRoute = require('./routes/index.route')
app.set('view engine', 'ejs');
app.set('views', './views');


app.use(morgan("dev"));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + "/public"));

var port = 3000;

// app.get('/', function(request,response){
// 	response.render("home");	
// } );
app.use('/', indexRoute);
app.use('/users',userRoute);
app.use('/category',catRoute);
app.use('/product',proRoute);
app.use('/auth',authRoute);
app.listen(port, function(){
    console.log("Hello world on port 3000!")	
});