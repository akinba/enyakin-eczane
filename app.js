const express	= require("express");
const app		= express();
const bodyparser = require("body-parser");
const pg		= require("pg");
const sequelize	= require("sequelize");
const moment	= require("moment");
const morgan	= require("morgan");
const socketOI	= require("socket.io");
const http		= require("http");
var port=process.env.POR||3003

app.use(morgan('dev'));
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.set("view engine", "ejs");
app.use( express.static("public"));

var server 	= http.createServer(app);
var io 		= socketOI(server);

var db = new sequelize("postgres://postgres:pi@www.akinba.com:5432/enyakin");
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

io.on ('connection', (socket)=>{
	console.log(socket.id+' baglandi');
	socket.emit('layer',{}

	);

});


app.get('/', (req,res)=>{
	res.render('index');
});



server.listen( 3003, ()=>{
	console.log(`Sunucu ${port}'de calisiyor`  );
	//console.log(db.Sequelize);
});