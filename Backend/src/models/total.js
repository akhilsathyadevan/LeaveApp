const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://userone:userone@akhilprojectfiles.wnbnw.mongodb.net/LEAVEAPP?retryWrites=true&w=majority');
const schema=mongoose.Schema;
const totalData=new schema({
    eId:String,
    total:String
})
var TotalData=mongoose.model('totaldatas',totalData);
module.exports=TotalData;