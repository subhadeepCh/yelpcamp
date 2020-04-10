var express 				= require("express"),
   	app     				= express(),
  	bodyParser				= require("body-parser"),
    mongoose				= require("mongoose"),
	seedDB  				= require("./seed"),
	passport				=require("passport"),
	LocalStrategy			=require("passport-local"),
	User					=require("./models/user"),
	passportLocalMongoose	=require("passport-local-mongoose"),
	methodOverride			=require("method-override");
	Comment	  				= require("./models/comment"),
	Campground  			= require("./models/campground");
var indexRoutes   			= require("./routes/index"),
	commentRoutes   		= require("./routes/comment"),
	flash					= require("connect-flash"),
	campgroundRoutes	    = require("./routes/campground");
//seedDB();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());
//=====================================================
mongoose.connect("mongodb://localhost/yelpcamp",{
	useNewUrlParser :true,
	useCreateIndex:true,
	useUnifiedTopology:true
}).then(()=>{
	console.log("Connected to DB!");
}).catch(err=>{
	console.log("Error : ",err.message);
});
//==========================================================
/**mongoose.connect("mongodb+srv://subhadeep:subhadeep@1624@cluster0-obeft.mongodb.net/test?retryWrites=true&w=majority",{
	useNewUrlParser :true,
	useCreateIndex:true,
	useUnifiedTopology:true
}).then(()=>{
	console.log("Connected to DB!");
}).catch(err=>{
	console.log("Error : ",err.message);
});
*/
//Schema setup

//landing page**********
//**********************
//=============PASSPORT CONFIG===============
app.use(require("express-session")({
	secret:"This is used to encode and decode",
	resave:false,
	saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//===========================================
app.use(function(req,res,next){
	res.locals.currentuser=req.user;
	res.locals.error=req.flash("error");
	res.locals.success=req.flash("success");
	next();
});
//======================================
app.use("/",indexRoutes);
app.use("/campground",campgroundRoutes);
app.use("/campground/:id/comments",commentRoutes);

app.get("*",(req,res)=>{
	res.send("Cannot find Page");
});
app.listen(3000,function(){
	console.log("SERVER HAS STARTED...");
});