const express	= require("express");
const app		= express();
const bodyparser = require("body-parser");
const pg		= require("pg");
const seq		= require("sequelize");
const moment	= require("moment");
const morgan	= require("morgan");


app.use(morgan('combined'));
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.set("view engine", "ejs");
app.use( express.static("public"));


var db = new seq("postgres://postgres:pi@www.akinba.com:5432/edremit");

app.get('/',(req,res)=>{
	res.render('index');
});

//var ip=process.env.IP||'localhost';
var port=process.env.PORT||3003
app.listen( port, ()=>{
	console.log(`Sunucu ${port}'de calisiyor`  );
	//console.log(db.Sequelize);
});
module.exports.app = app;