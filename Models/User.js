let mongoose=require('mongoose');

let newSchema= new mongoose.Schema({
   name:{
        type:String,
       
        
   },
    phoneNum:{
        type:Number,
    }
})
module.exports=mongoose.model('Person',newSchema)