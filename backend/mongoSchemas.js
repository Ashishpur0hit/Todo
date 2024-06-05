const mongo  = require('mongoose');
const { string, ParseStatus, array } = require('zod');
mongo.connect("mongodb+srv://Ashish:263160@cluster0.oauc2a8.mongodb.net/MynewTodo");






const DataSchema  = new mongo.Schema({
    email : String,
    Password : String,
    tasks : [Object]
});


const userSchema = new mongo.Schema({
    username : String,
    password : String,
    email : String,
});



const UserModel = mongo.model("Users",userSchema);
const DataModel = mongo.model("my_Todos",DataSchema);


module.exports = {mongo ,UserModel,DataModel};




