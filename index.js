let express = require("express");
let bodyparser = require("body-parser");
let mongoose = require("mongoose");
let Course = require("./models/Course");

let app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/mydb").then(()=>{
    console.log("Connect Success");
}).catch((err)=>{
    console.log(err);
})

app.get("/", (req, res)=>{
    res.send("Welcome");
})

app.post("/savecourse",async (req, res)=>{
    let data = req.body.data;
    if(data.id == "")
    {
        let course = new Course(data);
        let result = await course.save();
        res.send(result);
    }
    else{
        let result = await Course.findByIdAndUpdate(data.id, data);
        res.send(result);
    }
});

app.post("/deletecourse", async(req, res)=>{
    let data = req.body.data;
    let result = await Course.findByIdAndDelete(data.id);
    res.send(result);
})

app.post("/listcourses", async (req, res)=>{
    let result = await Course.find();
    res.send(result);
})

app.post("/getcourse", async(req, res)=>{
    try{
    let data = req.body.data;
    let result = await Course.findById(data.id);
    res.send(result);
    }
    catch(ex)
    {
        res.send(ex);
    }
})


app.listen(8081, ()=>{
    console.log("API running on 8081");
})