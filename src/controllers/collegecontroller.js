const mongoose =require("mongoose")
const collegemodel =require("../models/college")
const internmodel =require("../models/intern")

const createCollege= async function(req,res){
 try{
        let data =req.body
    if(!Object.keys(data).length) 
    return res.status(400).send({status: false, msg: "You must enter data."})
    const a = await collegemodel.find({name:data.name})
    if(!a.length) return res.status(400).send("name already exists")

    if (!data.name) return res.status(400).send({status: false, msg: "name required."})

    if (!data.fullName) return  res.status(400).send({status: false, msg: "fullName required."})

    if(!data.logoLink) return res.status(400).send({msg:"logoLink required"})

    let allData =await collegemodel.create(data)
     res.status(200).send({msg:allData})}
   
  catch(err){ res.status(500).send({status: false, msg: err.message})} 
 }


 const getCollege =async function(req,res){
     try{
     let data =req.query.collegeName
     if(!data) res.status(400).send({msg:"give the proper collegeName"})
     let alldata =await collegemodel.findOne({name:data})//.select({name:1 ,fullName:1, logoLink:1,})
     let getdata =await internmodel.find({collegeId:alldata._id}).select({name:1,email:1,mobile:1})//.populate('collegeId')
     res.status(201).send({data:{
         "name":alldata.name,
          "fullName":alldata.fullName,
          "logoLink":alldata.logoLink,
          "interest": getdata}
     })
 }
 catch(err){ res.status(400).send({status: false, msg: err.message})}
 }
 module.exports.createCollege=createCollege
 module.exports.getcollege=getCollege