const mongoose=require('mongoose')

var taskSchema = mongoose.Schema({
    taskName:{
        type:String
    },
    date:{
        type:String
    },
    description:{
        type:String
    },
    status:{
        type:String,
        default:"not delivered"
    },
    userId:{
        type:String
    }

})

module.exports=mongoose.model("Task",taskSchema);