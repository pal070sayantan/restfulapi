const express = require("express");
const mongoose=require("mongoose");
require("./db/conn");
const Student= require("./models/students"); 
const app = express();
const port= process.env.PORT || 7000;//when ever we host some where like heroku or netlify it will give a proper port number
// creating a new student, so client request and server gives response

app.use(express.json());// so that the coming data is in json format


// creating students database by POST method
app.post("/students",(req,res)=>
{           
    console.log(req.body);
            const user = new Student(req.body); // we are saving the data coming from postman in body in request
            user.save()
            .then(()=>{
                res.status(201).send(user);
            })          
            .catch((err)=>{
                res.status(400).send(err);
            })
})

// now Read from the data base

app.get("/students",async (req,res)=>{

    try{
            const studentsData= await Student.find();
            res.send(studentsData);// to send data to postman
    }
        catch(e)
        {
                        res.send(e); // sending error to postman
        }
})
// to get data about single student data now id is different for every students in mongodb.

app.get("/students/:id", async(req,res)=>
{       
    try{        
            const _id=req.params.id// to get the id from request        
            
            const studentData =await Student.findById({_id:_id});
            res.send(studentData);

    }
    catch(e)
    {

    }

})

// updating students database by 

app.put("/students/:id", async (req,res)=>
{
    try{
        const _id=req.params.id;
        const updateStudents= await Student.findByAndUpdate(_id,req.body,{
            new:true
        });
        res.send(updateStudents);
    }
    catch(e)
    {
        res.status(404).send(e);
    }
})

// Delete Request in Rest api

app.delete("/students/:id",async (req,res)=>
{
        try{
                    const id= req.params.id;
                    const deleteStudents =await Student.findByIdAndDelete(req.params.id);
                    if(!req.params.id)
                    {
                        return res.status(404).send();
                    }
                    res.send(deleteStudents);
        }
        catch(e)
        {
                    res.status(500).send(e);
        }

})
   


app.listen(port,()=>
{
    console.log(`connection is at ${port}`);
})