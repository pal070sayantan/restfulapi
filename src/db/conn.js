//first we need to require our mongoose package
const mongoose = require("mongoose");
// connecting mongoose with our database
mongoose.connect("mongodb://localhost:27017/students-api", {
    
     useNewUrlParser:true,
     useUnifiedTopology:true,
     
         //we need to remove Deprecation Warnings
})// returns a promise
.then(()=>
{
    console.log("connection is success")
})
.catch((e)=>
{
    console.log("no connection");
}) 
 
