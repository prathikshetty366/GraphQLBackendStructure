const express=require("express")
const {graphqlHTTP}= require("express-graphql")
const app=express();
const schema=require("./schema/schema")
const mongoose=require("mongoose")
mongoose.connect('mongodb+srv://prathikshetty7:wo1j49vVWqhLIkKa@cluster0.rbbaz.mongodb.net/?retryWrites=true&w=majority')
mongoose.connection.once('open',()=>{
    console.log("connected to mongoDB")
})
//root Endpoint
app.use('/graphql',graphqlHTTP({
schema:schema,
graphiql:true
}))
app.listen(4000,()=>{
    console.log("Now listening for requests on port 4000")
})