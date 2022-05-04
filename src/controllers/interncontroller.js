const mongoose = require("mongoose")

const model =require("../models/intern")
const collegemodel =require("../models/college")

const createIntern =async function(req,res){
    let data = req.body
    delete data.collegeId
    if(!Object.keys(data).length)
    return res.status(400).send({status: false, msg: "You must enter data."})
    if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email.trim())))
            return res.status(400).send({status: false, msg: "Enter a valid email address."})
     if(!(/^(\+\d{1,3}[- ]?)?\d{10}$/.test(data.mobile.trim()))  )  
     return res.status(400).send({status: false, msg: "You must enter data."}) 

    let  collegeDetails = await collegemodel.findOne({name: data.collegeName})
    console.log(collegeDetails)
    delete data.collegeName
     data.collegeId = collegeDetails._id
    console.log(data)
      let saveData=await model.create(data)
      res.status(201).send({status: true, data: saveData})    
}


module.exports.createIntern=createIntern