const bcrypt=require('bcrypt');
const User=require('../models/userModel');
const jwt=require('jsonwebtoken');

module.exports.add=(req,res)=>{
    console.log("enter signup");
    User.findOne({name:req.body.name},(err,docs)=>{
        if(err){
            res.status(401).json({
                success:false,
                message:'DB error'
            });
        }
        else{
            if(docs===null){
                bcrypt.hash(req.body.password,10)
                .then(hash=>{
                    const user=new User({
                        name:req.body.name,
                        password:hash
                    });
                    user.save((err,items)=>{
                        if(err)
                        {
                            res.status(401).json({
                                success:false,
                                message:'DB error'
                            });
                        }
                        else
                        {
                            res.status(200).json({
                                success:true,
                                message:'succesfully sign up'
                            });
                        }
                    })
                    .catch(err=>{
                        res.status(500).json({
                        error:err
                    })
                })
            })
        }
        else
        {
            res.status(401).json({
                success:false,
                message:"username already present"
            })
        }
    }
})
}


module.exports.adduser=(req,res)=>{
    console.log("enter login user");
    let fetchedUser;
    User.findOne({name:req.body.name}).then(user=>{
        if(!user)
        {
            return res.status(401).json({
                success:false,
                message:"username not present"
            });
        }
        fetchedUser=user;
        return bcrypt.compare(req.body.password,user.password);
    })
    .then(result=>{
        if(!result)
        {
            return res.status(401).json({
               success:false,
               message:"invalid password "
            })
        }
        else
        {
            const token=jwt.sign({},'secret_this_should_be_longer',{expiresIn:'1h'});
            res.status(200).json({
            success:true,
            id:fetchedUser._id,
            token:token
        });
        }
        
    })
    .catch(err=>{
        console.log(err);
        return res.status(401).json({
            success:false,
            message:"Auth failed"
        });
    });
}