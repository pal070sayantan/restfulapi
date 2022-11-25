const mongoose = require("mongoose");
const validator = require ("validator");

// we are creating a new student instance 
const studentSchema=new mongoose.Schema({   
    name : {
        type:String,
        required:true,
        minlength:3
    },
    email:{
        type:String,
        require:true,
        unique:[true,"email already present"],
        validate(value)
                    {
                            if(!validator.isEmail(value))// to checck user email is proper or not
                            {
                                        throw new Error("invalid email");
                            }
                    },
    phone:{
        type:Number,
        min:10,
        required:true,
        unique:true
    },
    address:{
        type:String,
        require:true
            }

}
})
// now we will create new model by this Schema means we will create a new collection

// here student should be in singular form as in the backgorund it will be in plural
const Student = new mongoose.model('Student',studentSchema);

module.exports = Student;

 



