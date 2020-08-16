const mongoose=require('mongoose')

var UserSchema = mongoose.Schema({
    name:{
        type:String
    },
    password:{
        type:String
    }
})

module.exports=mongoose.model("User",UserSchema);