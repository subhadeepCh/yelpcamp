var Campground= require("../models/campground"),
	Comment   =  require("../models/comment");


middleob={};


middleob.isauthorized =function isauthorized(req,res,next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id,(err,camper)=>{
			if(err){
				res.redirect("/");
					}
			else{
				if((req.user._id).equals(camper.author.id)){
				   next();
				   }else{
				   res.redirect("back");
				   }
			}
		});
	}
	else
		{
			res.redirect("/login");
		}
}

middleob.isauthorizedcomment= function isauthorizedcomment(req,res,next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id,(err,comm)=>{
			if(err){
				res.redirect("/");
					}
			else{
				if((req.user._id).equals(comm.author.id)){
				   next();
				   }else{
				   res.redirect("back");
				   }
			}
		});
	}
	else
		{
			res.redirect("/login");
		}
}

middleob.isLoggedIn=function isLoggedIn(req,res,next)
{
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","Please login first");
	res.redirect("/login");
};


module.exports=middleob;