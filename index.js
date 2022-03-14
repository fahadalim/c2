const express = require("express");

const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const connect = ()=>{
    return mongoose.connect("mongodb+srv://fahadalim:fahadalim@cluster0.z5jif.mongodb.net/web?retryWrites=true&w=majority")

};

//user schema

const userschema = new mongoose.Schema(
    {
    firstName: {type:String,required:true},
    middleName:{type:String,required:false},
    lastName:{type:String,required:true},
    age:{type:Number,required:true},
    email:{type:String,required:true},
    address:{type:String,required:true},
    gender:{type:String,required:true},
    type:{type:String,required:true},
    // masterid:{type:mongoose.Schema.Types.ObjectId,
    //     ref:"masterschema",
    //     required:true,
    //     },
    },
    {
        timestamps:true,
    }
);

const user = mongoose.model("user",userschema);

//branch schema

const branchschema = new mongoose.Schema(
    {
        name: {type:String,required:true},
        address:{type:String,required:true},
        ifsc:{type:String,required:true},
        micr:{type:Number,required:true},
        masterid:{type:mongoose.Schema.Types.ObjectId,
            ref:"masterschema",
            required:true,
            },
    },
    {
        timestamps:true,
    }
);

const branch = mongoose.model("branch",branchschema);

//master acc

const masteraccschema = new mongoose.Schema(
    {
        balance:{type:Number,required:true},
        userid:{type:mongoose.Schema.Types.ObjectId,
        ref:"userschema",
        required:true,
        },
        branchid:{type:mongoose.Schema.Types.ObjectId,
        ref:"branchschema",
        required:true,
        },

    },
    {
        timestamps:true,
    }
);

const masterschema = mongoose.model("masterschema",masteraccschema);


//saving acc

const saving = new mongoose.Schema(
    {
        account_number:{type:Number,required:true},
        balance:{type:Number,required:true},
        interestRate:{type:Number,required:true},
        userid:{type:mongoose.Schema.Types.ObjectId,
            ref:"userschema",
            required:true,
            },

    },
    {
        timestamps:true,
    }
);
const savingacc = mongoose.model("savingacc",saving);

//fixed acc

const fixed = new mongoose.Schema(
    {
        account_number:{type:Number,required:true},
        balance:{type:Number,required:true},
        interestRate:{type:Number,required:true},
        startDate:{type:Date,required:true},
        maturityDate:{type:Date,required:true},
        userid:{type:mongoose.Schema.Types.ObjectId,
            ref:"userschema",
            required:true,
            },
    },
    {
        timestamps:true,
    }

);

const fixedacc = mongoose.model("fixedacc",fixed);

//curd operation

app.get("/masteraccount",async(req,res)=>{
    try{
        const master= await masterschema.find().lean.exec()
        return res.status(200).send({masteraccount:masteraccount})
    }
    catch(err){
        return res.status(500).send({message:err.message})
    }
})

app.post("/users",async(req,res)=>{
    try{
        const user = await userschema.create(req.body);

    }
    catch(err)
    {
        return res
        .status(500)
        .send({message:err.message})
    }
});




app.listen(5000,async()=>{
    try{
        await connect();
    }catch(err){
        console.log(err)
    }
    console.log("listening")
})

