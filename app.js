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

var ip=process.env.IP||'localhost';
var port=process.env.POR||3003
app.listen( 3003,ip, ()=>{
	console.log(`Sunucu ${ip}:${port}'de calisiyor`  );
	//console.log(db.Sequelize);
});