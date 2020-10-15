const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
    username:{
        type:String
    },
    fullname:{
        type:String
    },
    email:{
        type:String
    },
    gender:{
        type:String
    },
    dob:{
        type:Date
    },
    password:{
        type:String
    }
});

const User=mongoose.model('User',userSchema);

module.exports=User;