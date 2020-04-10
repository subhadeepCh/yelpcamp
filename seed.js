var Campground= require("./models/campground");
var Comment	  = require("./models/comment");
var data=[
	{
		name:"Dalma",
		image:"https://media-cdn.tripadvisor.com/media/photo-s/03/6e/5e/17/dalma-wildlife-sanctuary.jpg",
		desc:"It is about 100 km from the capital city Ranchi, and 15 km from the steel city Jamshedpur. The wildlife sanctuary runs parallel to the NH-33 with hills as high as 915 ft. from sea level. Dalma Sanctuary is spread over 193 sq km of forests of East Singhbhum and Saraikela-kharsawan districts of the state of Jharkhand. The forests of Dalma come under the category Dry peninsular Sal and Northern Dry Mixed Deciduous Forest. Most part of Dalma forests shed leaves in the summer and attains its full bloom at the onset of monsoon."
	},
	{
		name:"Chilka Lake",
		image:"https://i.pinimg.com/originals/fb/f6/e3/fbf6e35f5931208e7c087c868e79315b.jpg",
		desc:"It is about 100 km from the capital city Ranchi, and 15 km from the steel city Jamshedpur. The wildlife sanctuary runs parallel to the NH-33 with hills as high as 915 ft. from sea level. Dalma Sanctuary is spread over 193 sq km of forests of East Singhbhum and Saraikela-kharsawan districts of the state of Jharkhand. The forests of Dalma come under the category Dry peninsular Sal and Northern Dry Mixed Deciduous Forest. Most part of Dalma forests shed leaves in the summer and attains its full bloom at the onset of monsoon."
	},{
		name:"Dasam Falls",
		image:"https://media-cdn.tripadvisor.com/media/photo-s/06/6a/6f/b8/dassam-falls.jpg",
		desc:"It is about 100 km from the capital city Ranchi, and 15 km from the steel city Jamshedpur. The wildlife sanctuary runs parallel to the NH-33 with hills as high as 915 ft. from sea level. Dalma Sanctuary is spread over 193 sq km of forests of East Singhbhum and Saraikela-kharsawan districts of the state of Jharkhand. The forests of Dalma come under the category Dry peninsular Sal and Northern Dry Mixed Deciduous Forest. Most part of Dalma forests shed leaves in the summer and attains its full bloom at the onset of monsoon."
	}
	
]

function seedDB(){
	Campground.remove({},function(err){
		if(err)
			{
				console.log("ERROR");
			}
		else
			{
				console.log("CAMPGROUNDS REMOVED");
				
				data.forEach(function(seed)
				{
				Campground.create(seed,(err,dseed)=>{
				if(err)
				{
					console.log(err);
				}
				else
				{
					console.log("ADDED A CAMPGROUNDS");
					Comment.create({
						text:"This place is greate do visit",
						author:"Subhadeep Choudhuri"
					},function(err,comm){
						if(err)
							{
								console.log(err);
							}
						else
							{
								dseed.comments.push(comm);
								dseed.save();
								console.log("Comment created");
							}
					});
				}
				});
				});
			}
	});
	
};
module.exports= seedDB;