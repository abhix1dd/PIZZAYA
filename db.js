const mongoose=require("mongoose");

var mongoURL='mongodb+srv://dbAbhi:Abhishek@5630@cluster0.tuurt.mongodb.net/pizzaya'


mongoose.connect(mongoURL, {useUnifiedTopology:true, useNewUrlParser:true})

var db=mongoose.connection

db.on('connected',()=>{
    console.log('Mongodb Connection sucessfull');
})

db.on('error',()=>{
    console.log('Mongodb Connection Failed');
})

module.exports=mongoose
