const mongoose=require("mongoose");
const schema=mongoose.Schema;


const bookSchema=new mongoose.Schema({
    name:String,
    genre:String,
    authorId:String
})

module.exports=mongoose.model("Book",bookSchema)




//This is mongodb Schema
//mongodb schema defines How our collection should Store the Data