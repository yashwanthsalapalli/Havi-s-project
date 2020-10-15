const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const textSchema=new Schema({
    message:{
        type:String
    },
    creator:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
});

const Text=mongoose.model('Text',textSchema);

module.exports=Text;