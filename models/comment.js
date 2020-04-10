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

var commentSchema= new mongoose.Schema({
	text:String,
	author:{
		id:{
			type:mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username : String
	}
});
module.exports =mongoose.model("Comment",commentSchema);