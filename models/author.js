const mongoose=require("mongoose");
const schema=mongoose.Schema;


const authorSchema=new mongoose.Schema({
    name:String,
    age:Number
})

module.exports=mongoose.model("Author",authorSchema)


//This is mongodb Schema
//mongodb schema defines How our collection should Store the Data