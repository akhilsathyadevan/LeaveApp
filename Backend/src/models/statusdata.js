const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://userone:userone@akhilprojectfiles.wnbnw.mongodb.net/LEAVEAPP?retryWrites=true&w=majority');
const schema=mongoose.Schema;
const statusData=new schema({
    eId:String,
    statu:String
})
var StatusData=mongoose.model('statusdatas',statusData);
module.exports=StatusData;