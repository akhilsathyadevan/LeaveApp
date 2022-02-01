const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://userone:userone@akhilprojectfiles.wnbnw.mongodb.net/LEAVEAPP?retryWrites=true&w=majority');
const schema=mongoose.Schema;
const leaveData=new schema({
    eId:String,
    result:String,
    reason:String,
    totalL:String
})
var LeaveData=mongoose.model('leavedatas',leaveData);
module.exports=LeaveData;