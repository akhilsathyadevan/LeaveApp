const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://userone:userone@akhilprojectfiles.wnbnw.mongodb.net/LEAVEAPP?retryWrites=true&w=majority');
const schema=mongoose.Schema;
const signupData=new schema({
    eId:String,
    emailId:String,
    userName:String,
    password:String
})
var SignupData=mongoose.model('signupdatas',signupData);
module.exports=SignupData;