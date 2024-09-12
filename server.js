const mongoose = require("mongoose");

let studentSchema = new mongoose.Schema({
    id:Number,
    firstName:{
        type: String,
        validate: {
          validator: function(v) {
            return/^[a-zA-Z\s]{2,25}$/.test(v);
          },
          message: props => `${props.value} is not a valid  firstName!`
        },
        required: [true, 'User firstName is required']
      },
    lastName:{
        type: String,
        validate: {
          validator: function(v) {
            return /^[a-zA-Z\s]{2,25}$/.test(v);
          },
          message: props => `${props.value} is not a valid  last name!`
        },
        required: [true, 'User name is required']
      },
    age:{type:Number,min:[18,"You are to young for this."], max:[120,"You are to old for this."], required:true,},
    gender:{type:String,required:true,lowercase:true,enum:["male","female"]},
    phoneNumber:String,
    
    email: {
        type: String,
        validate: {
          validator: function(v) {
            return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
          },
          message: props => `${props.value} is not a valid  email id!`
        },
        required: [true, 'User email id is required']
      },
      address:String,
    });
    


let Student = new mongoose.model("students",studentSchema);


let saveToDB = async()=>{

    try{
        let raju = new Student({
            id:987654,
            firstName:"Raju ",
            lastName:"Padala",
            age:24,
            gender:"male",
            phoneNumber:"+91-4567798765",
            email:"rajug@mail.com",
            address:"samalkot,kkd,Ap.",
        });
        // await raju.save();
        let ram = new Student({
            id:987654,
            firstName:"Ram ",
            lastName:"Ra",
            age:24,
            gender:"mAle",
            phoneNumber:"+91-9967798765",
            email:"Ram@gmail.com",
            address:"eer,ssr,Ts.",

        })

        let rajesh = new Student({
            id:98765466,
            firstName:"Rajesh ",
            lastName:"Panka",
            age:23,
            gender:"male",
            phoneNumber:"+91-45557798765",
            email:"rajesh@gamail.com",
            address:"samalkot,kkd,Ap.",

        });
    //    await rajesh.save();
       Student.insertMany([raju,rajesh,ram]);
        console.log("Saved to MDB Successfully");
    }catch(err){
        console.log("Unable to  save");
        console.log(err)

    }
};

let getDataFromDB = async ()=>{

    let studentsData = await Student.find();
    console.log(studentsData);

}

let connectToMDB = async()=>{
  try{
    await  mongoose.connect("mongodb+srv://prasad:prasad@batch2406cluster.svhff.mongodb.net/Batch2406?retryWrites=true&w=majority&appName=Batch2406Cluster");
    console.log("Successfully connected to MDB")
    // saveToDB();
    getDataFromDB();
}catch(err){

    console.log("Unable to connect to MDB");
    console.log(err);
  }

  
};

connectToMDB();


