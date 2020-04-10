var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/yelpcamp",{
	useNewUrlParser :true,
	useCreateIndex:true,
	useUnifiedTopology:true
}).then(()=>{
	console.log("Connected to DB!");
}).catch(err=>{
	console.log("Error : ",err.message);
});
var campSchema = new mongoose.Schema({
	name:String,
	image:String,
	desc:String,
	author:{
		id:{
			type: mongoose.Schema.Types.ObjectId,
			ref : "User"
		},
		username:String
	},
	comments:[
		{
			type: mongoose.Schema.Types.ObjectId,
			ref : "Comment"
		}
	]
});
module.exports= mongoose.model("Campground",campSchema);