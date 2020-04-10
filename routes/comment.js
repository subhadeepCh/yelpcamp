var express   =  require("express");
var router    =  express.Router({mergeParams : true});
var Campground=  require("../models/campground"),
	middleware = require("../middleware"),
	Comment   =  require("../models/comment");
//===========Comments Route=============
router.get("/new",middleware.isLoggedIn,(req,res)=>{
	Campground.findById(req.params.id,function(err,campers){
		if(err)
			{
				req.flash("error","Unable to find...Sorry");
				console.log("ERROR");
				res.redirect("/");
			}
		else{
		res.render("comments/new",{campers:campers});
		}
	});
	
});
router.post("/",middleware.isLoggedIn,(req,res)=>{
	Campground.findById(req.params.id,function(err,dcampers){
		if(err)
			{
				req.flash("error","Unable to find...Sorry");
				res.redirect("/");
			}
		else{
			Comment.create(req.body.comment,(err,comments)=>{
				if(err)
					{
						req.flash("error","Unknown error");
						res.redirect("/");
					}
				else
					{
						comments.author.id=req.user._id;
						comments.author.username=req.user.username;
						comments.save();
						dcampers.comments.push(comments);
						dcampers.save();
						req.flash("success","Comment Added..");
						res.redirect("/campground/"+req.params.id);
					}
			});
		}
	});
});
router.get("/:comment_id/edit",middleware.isauthorizedcomment,(req,res)=>{
	Comment.findById(req.params.comment_id,(err,foundcomment)=>{
		if(err){
			req.flash("error","Unable to find...Sorry");
			res.redirect("back");
		}
		else
			{
				res.render("comments/edit",{campers:req.params.id,foundcomment:foundcomment});
			}
	});
});
router.put("/:comment_id",middleware.isauthorizedcomment,(req,res)=>{
	Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,(err,comm)=>{
		if(err){
			req.flash("error","Unable to find...Sorry");
			res.redirect("back");
		}
		else
			{
				console.log("comment updated");
				req.flash("success","Comment Updated");
				res.redirect("/campground/"+req.params.id);
			}
	});
});
router.delete("/:comment_id",middleware.isauthorizedcomment,(req,res)=>{
	Comment.findByIdAndRemove(req.params.comment_id,(err,comm)=>{
		if(err)
			{
				console.redirect("/");
			}
		else{
			console.log("DELETED");
			req.flash("success","Comment Deleted");
			res.redirect("/campground/"+req.params.id);
		}
	});
});
//=================================================================



module.exports=router;