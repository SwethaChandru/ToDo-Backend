const Task=require('../Models/taskModel');

module.exports.addtask=(req,res)=>{
    console.log("enter add task");
    const newTask=new Task({
        taskName:req.body.name,
        userId:req.body.userid,
        description:req.body.description,
        date:req.body.date
    })
    newTask.save((err,docs)=>{
        if(err)
        {
            res.status(401).json({
                success:false,
                message:'DB error'
            });
        }
        else
        {
            res.send(docs)
        }
    })
}

module.exports.gettask=(req,res)=>{
    console.log("enter get task");
    Task.find({date:req.params.date,userId:req.params.userid},(err,items)=>{
        if(err)
        {
            res.status(401).json({
                success:false,
                message:'DB error'
            });
        }
        else
        {
            res.send(items);
        }
    })
}

module.exports.updateDeliveryStatus=(req,res)=>{
    console.log("enter delivery status");
    Task.findByIdAndUpdate({_id:req.body.id},
        {
            $set:{ "date": req.body.date} 
        },
        {
            upsert:true,new:true
        },
        function(err,docs){
            if(err)
            {
                res.status(401).json({
                    success:false,
                    message:'DB error'
                });
            }
            else
            {
                res.json(docs);
            }
        })
}

module.exports.updateStatus=(req,res)=>{
    console.log("enter second delivery status");
    Task.findByIdAndUpdate({_id:req.body.id},
        {
            $set:{ "status": req.body.status} 
        },
        {
            upsert:true,new:true
        },
        function(err,docs){
            if(err)
            {
                res.status(401).json({
                    success:false,
                    message:'DB error'
                });
            }
            else
            {
                res.json(docs);
            }
        })
}