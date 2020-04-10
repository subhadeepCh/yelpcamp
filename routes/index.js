var express = require("express"),
    router  = express.Router(),
    passport=require("passport"),
	User    =require("../models/user");

//===============landing page=======================
router.get("/",function(req,res){	
	res.render("landing");
});
//==================================================


//===============AUTH ROUTE=============
router.get("/register",(req,res)=>{	
	res.render("register");
});
router.post("/register",(req,res)=>{
	
	User.register(new User({username:req.body.username}),req.body.password,function(err,user){
		if(err)
			{
				console.log(err);
				req.flash("error",err.message);
				return res.render("register");
			}
		else
			{
				passport.authenticate("local")(req,res,function(){
					req.flash("success","Registered Successfully !! 	Welcome "+user.username);
					res.redirect("/campground");
				});
			}
	});
});
router.get("/login",(req,res)=>{
	res.render("login");
});
router.post("/login",passport.authenticate("local",{
	successRedirect: "/campground",
	failureRedirect: "/login"
}),(req,res)=>{
});
router.get("/logout",(req,res)=>{
	req.logout();
	req.flash("success","Logged Out Successfully !!");
	res.redirect("/");
});


module.exports=router;