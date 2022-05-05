const mongoose = require("mongoose")

const model =require("../models/intern")
const collegemodel =require("../models/college")

//validation checking function 
const isValid = function (value) {
  if (typeof value === 'undefined' || value === null) return false
  if (typeof value === 'string' && value.trim().length === 0) return false
  return true;
}
const isValidRequestBody = function (requestBody) {
  return Object.keys(requestBody).length > 0
}

const createIntern =async function(req,res){
    try{
    let data = req.body
    delete data.collegeId
    let nameRegEx = /^[A-z]*$|^[A-z]+\s[A-z]*$/
        let emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        let mobileRegEx = /^(\+\d{1,3}[- ]?)?\d{10}$/

        if(!isValidRequestBody(data))
        return res.status(400).send({
            status: false,
            msg: "Please enter some data to create Intern Details."})
    
    if(!isValid(data.name))
        return res.status(400).send({
            status: false,
            msg: "Please enter your Name."})
    
    if(!data.name.trim().match(nameRegEx))
        return res.status(400).send({
            status: false,
            msg: "Enter a Valid Name."}) 
    
    data.name = data.name.split(' ').map(x => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase()).join(' ')
    
    if(!isValid(data.email))
        return res.status(400).send({
            status: false,
            msg: "Please enter your E-Mail Address."})

    if(!data.email.trim().match(emailRegEx))
        return res.status(400).send({
            status: false,
            msg: "Enter a Valid E-Mail Address."}) 
    
    if(!isValid(data.mobile))
        return res.status(400).send({
            status: false,
            msg: "Please enter your E-Mail Address."})

    if(!data.mobile.trim().match(mobileRegEx))
        return res.status(400).send({
            status: false,
            msg: "Enter a Valid Mobile Number."}) 
    
    if(!isValid(data.collegeName))
        return res.status(400).send({
            status: false,
            msg: "Please enter College Name."})

    let  collegeDetails = await collegemodel.findOne({name: data.collegeName})
  //  console.log(collegeDetails)
    delete data.collegeName
     data.collegeId = collegeDetails._id
   // console.log(data)
     
      let saveData=await model.create(data)
      res.status(201).send({status: true, data: saveData})    
}
catch(err){ res.status(500).send({status: false, msg: err.message})}}

module.exports.createIntern=createIntern