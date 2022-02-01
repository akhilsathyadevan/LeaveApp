const express= require('express');
const cors= require('cors');
const bodyparser=require('body-parser');
const jwt= require('jsonwebtoken');
const path= require('path');
const SignupData = require('./src/models/signupdata');
const LeaveData=require('./src/models/leavedata');
const StatusData=require('./src/models/statusdata');
const TotalData=require('./src/models/total');
const app= new express();
const port=process.env.PORT || 3000;
app.use(cors());
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");
    next();
});
function verifyToken(req, res, next) {//token
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    console.log(token)
    if (token === 'null') {
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token, 'secretKey')
    if (!payload) {
        return res.status(401).send('Unauthorized request')
    }

    next()
}

app.post('/signup',function(req,res){
    console.log(req.body);
    var signup={
        eId:req.body.eId,
        emailId:req.body.emailId,
        userName:req.body.userName,
        password:req.body.password
    }
    var userdata=SignupData(signup);
    userdata.save();
})
app.post("/login",function(req,res){
    let session='';
    let user = 'admin';
    let pass = '12345';
    console.log("from frontend"+req.body.username,req.body.password);
    console.log("enterd")
    if(user==req.body.username&&pass==req.body.password){
        console.log("loginAdmin");
        let payload = {subject:user+pass}
        let token = jwt.sign(payload,'admin')
         session ='adminsession';
        res.status(200).send({token,session});
    }
    else 
    {
        SignupData.findOne({ 'userName': req.body.username, 'password': req.body.password })
         .then(function (obj,err) 
         {
            if (obj != null)
             {
                
                let id = obj._id;
                console.log(obj._id);
                let payload = {subject:req.body.username+req.body.password}
                let token = jwt.sign(payload,'user')
                 session ='usersession';
                res.status(200).send({token,session,id});
                console.log({token,session})
             }
            else{
                let message = 'No User Found'
                res.status(401).send({ message })
            }
        })
    
        .catch((err) => {
        console.log('Error: ' + err);
        })
    }
})
app.post('/leaveapp',function(req,res){
    console.log(req.body.result)
    var totalleave;
    
    var e = req.body.details.eId;
    TotalData.findOne({"eId":e})
    .then((obj)=>{
        if(obj!=null){totalleave=obj.total;}
        else{totalleave = 0}
    })
    .then(()=>{
        var leave={
            eId:req.body.details.eId,
            result:req.body.result,
            reason:req.body.details.reason,
            totalL:totalleave
        }
        var lvdata=LeaveData(leave);
        lvdata.save()
        .then(()=>{
        console.log("LEAve application saved");
    })
    })
    
    
   . catch((err)=>{
       console.log("error whe adding leave"+err);
   })

})
app.get('/getusers',function(req,res){
    LeaveData.find()
    .then(function(leave){
        // console.log("data send successfull");
        res.send(leave);

    })
})
app.delete('/deleteuser/:id',function(req,res){
    id=req.params.id;
    console.log(id)
    LeaveData.findByIdAndDelete({'_id':id})
    .then(()=>{
        console.log('success');
        res.send();
    })
    
})
app.post('/deletestatus',function(req,res){
    console.log("entered for status delete");
    var id=req.body.id;
    var sss=req.body.statu
    console.log(id,sss);
    var stt={
        eId:id,
        statu:sss
    }
    StatusData.findOne({"eId":id})
    .then((obj)=>{
        if(obj!=null){
            var i = obj._id;
            StatusData.findByIdAndUpdate({"_id":i},{$set:{"eId":id,"statu":sss}})
            .then(()=>{
                console.log("Previous status updated with rejection status")
            })
        }
        else{
            var x=StatusData(stt);
            x.save()
            .then(()=>{
                console.log("new delete status included")
            })
        }
    }) 
    .catch((err)=>{
        console.log("error when adding delete insert status"+err)
    })

})

app.post('/acceptstatus', function (req, res) {
    console.log("entered for accept status update");
    var newresult;
    var presult;
    var id = req.body.id;
    var sss = req.body.statu
    console.log(id, sss);
    var stt = {
        eId: id,
        statu: sss
    }
    StatusData.findOne({ "eId": id })
        .then((obj) => {
            if (obj != null) {
                var tid = obj._id;
                StatusData.findByIdAndDelete({ "_id": tid })
                    .then(() => {
                        console.log("Previous status deleted")
                    })
                    .catch((err) => {
                        console.log("error when deleting previous status" + err)
                    })
            }

            var x = StatusData(stt);
            x.save()
                .then(() => {
                    console.log("new status saved")
                    LeaveData.findOne({ "eId": id })
                        .then((obj) => {
                            newresult = obj.result;
                            var myid = obj._id;
                            LeaveData.findByIdAndDelete({ "_id": myid })
                                .then(() => {
                                    console.log("accepted leave request deleted");
                                })
                                .catch((err)=>{
                                    console.log("error when deleting leavedata aftaccepting the request"+err)
                                })
                        })
                        .catch((err)=>{
                            console.log("error when finding leavedata aftaccepting the request"+err)
                        })
                    TotalData.findOne({ "eId": id })
                        .then((obj) => {
                            if (obj != null) {
                                presult =obj.total;
                                var n = +newresult+ +presult;
                                n=n.toString();
                                var sid = obj._id;
                                TotalData.findByIdAndUpdate({ "_id": sid }, {
                                    $set: {
                                        "eId": id,
                                        "total": n
                                    }
                                }).then(() => { console.log("total leaves updated") })
                                .catch((err)=>{
                                    console.log("error when total leaves updation"+err)
                                })
                            }
                            else {
                                var total = {
                                    eId: id,
                                    total: newresult,
                                }
                                var c = TotalData(total);
                                c.save().then(() => { console.log("total leaves added") })
                                .catch((err)=>{
                                    console.log("error when total leaves adding"+err)
                                })
                            }
                        })
                })
        })
    
    

       
        
    
})

app.get('/getstatus/:id',function(req,res){
    var id=req.params.id;
    console.log("entered for checking status of"+id);
    StatusData.findOne({"eId":id})
    .then((status)=>{
        res.send(status)
    })
})    
    
    app.get('/gettotalleaves',function(req,res){
        // var id=i.toString();
        // console.log(id.toString())
        console.log("entered for getting total leaves");
        TotalData.find()
        .then((data)=>{
            res.send(data)
        })  
    
})

// app.get('/getsingledata/:id',function(req,res){
//     var id=req.params.id;
//     // var id=i.toString();
//     // console.log(id.toString())
//     console.log("entered"+id);
//     StatusData.findOne({"eId":id})
//     .then((status)=>{
//         res.send(status)
//     })
     
// })


app.listen(port,()=>{console.log('server at '+port)});