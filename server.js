var http =require('http');
var express=require('express');
//import express from 'express';
var jwt= require("jsonwebtoken") ;
var app=express();
//svar app=require("const")
var mongoClient=require('mongodb').MongoClient;

app.use(express.json());

mongoClient.connect("mongodb://localhost:27017",(err,client)=>{
    if(err){console.log("Error Occured!!");}
    else
        console.log("Connection established");
        db=client.db('empdb');
    }
)

app.get('/allemps',(req,res)=>{
    db.collection('users').find().toArray((err,items)=>{
        console.log(items);
        res.write(JSON.stringify(items));
        res.end();
    })
});

app.post('/addemps',(req,res)=>{
    db.collection('users').insertOne(req.body);
    res.end();
})

app.put('/update/:id',(req,res)=>{
    var id=ParseInt(req.params.id);
    db.collection('emp').updateOne({_id:id},{$set:{name:req.body.name}});
    console.log("Updated successfully")
    res.end("updated");
})

app.delete('/delete/:id',(req,res)=>{
    var id=ParseInt(req.params.id);
    db.collection('emp').deleteOne({_id:id});
    res.end("deleted");
})

function verifyToken(req,res,next)
{
    let token=req.header['authorization']
    if(token) {
        token=token.split('')[1]
        console.log(token)
        jwt.verify(token,"cvrcollege",(err,decoded)=>{
            if(err)
            {
                return res.json({
                    success:false,
                    message:'token is not valid'
                });
            }
            else{
                next();
            }
        })
    }
    else{
        return res.json({
            success:false,
            message:("token is required for authenticaiton"),
        })
    }
}
app.post("/login",(req,res)=>{
    user=req.body.username;
    pwd=req.body.password
    db.collection("users").findOne({
        "username":user,"password":pwd
    })
    .then((result)=>{
        if(result) {
            const token=jwt.sign({username:user},"cvrcollege")
            res.json({
                success:true,message:'Authentication success',
                token:token
            });
            res.end()
        }
        else{
            res.json({
                success:false,
                message:'no username and password',
            })
            res.end()
        }
    })


.catch((err)=>{
    console.log("error")
})
})
    app.listen(8080,()=>{
        console.log("Connection established at port number 8080");
    })   

