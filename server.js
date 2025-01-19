const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const userRouter=require('./router/userRouter');
const adminRouter=require('./router/adminRouter');
const bookingRouter=require('./router/bookingRouter')
const port = 5050;

// middleware
app.use(express.json());
app.use(cors());
app.use("/user",userRouter);
app.use("/booking",bookingRouter);
app.use("/admin",adminRouter);

//database connection
if(mongoose.connect("mongodb+srv://rkalai92:Kalai_12345@cluster0.ev42l.mongodb.net/Booking_App?retryWrites=true&w=majority&appName=Cluster0"))
{
  console.log("Database has connected in Atlas");
}

//server
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
