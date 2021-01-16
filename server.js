const express =require ('express');
const path = require ('path');
const mongoose=require('mongoose');
const Person =require('./Models/User');
require('dotenv/config')

const app=express();
const PORT=process.env.PORT|| 5000;

mongoose.connect(process.env.mydb,{ useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false },(er)=>{
   if (er){console.error(er)}
   else {
      console.log('db connected')
   }}
);
app.use(express.json());

app.get('/',async(req,res)=>{
   try {
      let persons= await Person.find({});
      res.send(persons);
      console.log("persons",persons)
   } catch (error) {
     console.error(error) 
   }
});

// app.post('/user',async (req,res)=>{
//    try {
//      const person= await new Preson({
//         name: req.body.name,
//         phoneNum:req.body.phoneNum
//      }) 
//      person.save();
//    } catch (error) {
//     res.json({message:error})  
//    }
// })

app.post('/user',async(req, res)=>{
    
   let user=new Person({
       name: req.body.name,
       phoneNum: req.body.phoneNum,
       //date: Date.now()
   })
   try{	
       userSaved = await user.save();
       res.json(userSaved);
   }
   catch (err) {
       res.json({ message: err })
   } 
});

app.patch("/:id",async(req,res)=>{
   try {
      let editedUser=await Person.findOneAndUpdate({_id:req.params.id},{$set:{name:req.body.name,phoneNum:req.body.phoneNum}}, {new:true})
      res.json(editedUser)
   } catch (error) {
    res.json({message:error})  
   }
});

app.delete("/:id",async(req,res)=>{
   try{
		await Person.deleteOne({_id:req.params.id});
		res.send({message:"user deleted successfly"})
	}
	catch(err){
		res.json({message:err})
	}
})

// app.get('/',(req,res)=>{
//    res.send('Welcom to home page..') 
// })

app.listen(PORT,()=>console.log(`Server started on port ${PORT}`));
