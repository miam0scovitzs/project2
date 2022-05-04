const mongoose =require('mongoose')
const ObjectId= mongoose.Schema.Types.ObjectId


const internSchema= new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,unique:true,trim:true,lowercase:true,required:[true,"EMAIL required"]},
    mobile:{type:String,required:true,unique:true,trim:true},
    collegeId:{type:ObjectId,ref:'college'},
    isDeleted:{type:Boolean,default:false},
},{timestamps:true})

module.exports=mongoose.model('intern',internSchema)