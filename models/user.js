var mongoose = require("mongoose"), passportLocalMongoose=require("passport-local-mongoose");
//===============================================
mongoose.connect("mongodb://localhost/yelpcamp",{
	useNewUrlParser :true,
	useCreateIndex:true,
	useUnifiedTopology:true
}).then(()=>{
	console.log("Connected to DB!");
}).catch(err=>{
	console.log("Error : ",err.message);
});
//=================================================

var userSchema = new mongoose.Schema({
	username: String,
	password: String	
});
userSchema.plugin(passportLocalMongoose);
module.exports= mongoose.model("User",userSchema);