var express= require("express");
var router = express.Router();
var Campground= require("../models/campground"),
	middleware = require("../middleware");


 router.get("/",(req,res)=>{
	Campground.find({},function(err,dcamp){
		if(err)
			{
				req.flash("error","Unable to find...Sorry");
				console.log("ERROR FROM FIND");
				res.redirect("/");
			}
		else
			{
				res.render("campground/index",{camp:dcamp,currentuser:req.user});
			}
	});	
});
//campground page post request
 router.post("/",middleware.isLoggedIn,(req,res)=>{
		var name=req.body.name;
		var image=req.body.image;
		var desc =req.body.desc;
	 	var author={
			id:req.user._id,
			username:req.user.username
		};
		var newcamp={name:name,image:image,desc:desc,author:author };
		Campground.create(newcamp,(err,ncamp)=>{
			if(err)
				{
					req.flash("error","Database limit Reached...We will upgrade soon");
					console.log("ERROR IN PUSH");
				}
			else{
				
				console.log("CAMP CREATED:");
				console.log(ncamp);
			}
		});
		req.flash("success","Successfully Added");
		res.redirect("/campground");
		 });
 router.get("/new",middleware.isLoggedIn,(req,res)=>{
	res.render("campground/new");
});
 router.get("/:id",(req,res)=>{
	Campground.findById(req.params.id).populate("comments").exec((err,found)=>{
		if(err)
			{
				req.flash("error","Unable to find...Sorry");
				console.log("ERROR");
				res.redirect("/");
			}
		else
			{
				res.render("campground/show",{found:found});	
			}
	});
});
//========edit router===================
router.get("/:id/edit",middleware.isauthorized,(req,res)=>{
	Campground.findById(req.params.id,(err,found)=>{
		if(err)
			{
				req.flash("error","Unable to find...Sorry");
				res.redirect("/campground");
			}
		else
			{
				res.render("campground/edit",{found:found});
			}
	});	
});
router.put("/:id",(req,res)=>{
	Campground.findByIdAndUpdate(req.params.id,req.body.details,(err,updatedcamp)=>{
		if(err){
			console.log("/");
		}
		else
			{
				req.flash("success","Updated Successfully");
				console.log("Updated campground");
				res.redirect("/campground/"+req.params.id);
			}
	});
});
//======================================
//========delete route==================
router.delete("/:id",middleware.isauthorized,(req,res)=>{
	Campground.findByIdAndRemove(req.params.id,(err,del)=>{
		if(err)
			{
				req.flash("error","Unable to find...Sorry");
				res.redirect("/");
			}
		else
			{
				req.flash("success","Deleted Successfully");
				console.log("DELETED");
				res.redirect("/campground");
			}
	});
});
//============================================

//======================================

module.exports=router;