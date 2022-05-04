const mongoose =require("mongoose")
const collegemodel =require("../models/college")
const internmodel =require("../models/intern")

const createCollege= async function(req,res){
 try{
        let data =req.body
    if(!Object.keys(data).length) 
    return res.status(400).send({status: false, msg: "You must enter data."})

    let allData =await collegemodel.create(data)
     res.status(200).send({msg:allData})}
   
  catch(err){ res.status(500).send({status: false, msg: err.message})} 
 }


 const getCollege =async function(req,res){
     let data =req.query.collegeName
     let alldata =await collegemodel.findOne({name:data})
     let getdata =await internmodel.find({collegeId : alldata._id}).select({name:1 ,_id:0})
     res.send(getdata)
 }

 module.exports.createCollege=createCollege
 module.exports.getcollege=getCollege