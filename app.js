const express	= require("express");
const app		= express();
const bodyparser = require("body-parser");
const pg		= require("pg");
const sequelize	= require("sequelize");
const moment	= require("moment");
const morgan	= require("morgan");

//var ip=process.env.IP||'localhost';
var port=process.env.PORT||3003

app.use(morgan('combined'));
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.set("view engine", "ejs");
app.use( express.static("public"));

if (port==3003) {
	var db = new sequelize("postgres://postgres:pi@localhost:5432/enyakin");
} else {
	var db = new sequelize("postgres://postgres:pi@www.akinba.com:5432/enyakin");
}

var eczane = db.define('eczane', 
{
	gid: {
		type: sequelize.UUID,
		primaryKey: true,
		defaultValue: sequelize.UUIDV4
	},
	adi: {
		type: sequelize.STRING
	},
	adres: {
		type: sequelize.STRING
	},
	adres_tarifi: {
		type: sequelize.STRING
	},
	telefon: {
		type: sequelize.STRING
	},
	fax: {
		type: sequelize.STRING
	},
	nobet_tarihi: {
		type: sequelize.STRING(10)
	},
	il: {
		type: sequelize.STRING(20)
	},
	ilce: {
		type: sequelize.STRING(20)
	},
	enlem: {
		type: sequelize.FLOAT
	},
	boylam: {
		type: sequelize.FLOAT
	},
	konum: {
		type: sequelize.STRING
	},
	geom: {
		type: sequelize.GEOMETRY('POINT', 4326)
	}
}, 

{
  freezeTableName: true
});

//db.sync({force: false});
app.get('/',(req,res)=>{
	res.render('index');
});


app.listen( port, ()=>{
	console.log(`Sunucu ${port}'de calisiyor`  );
	//console.log(db);
});
module.exports.app = app;