var express=require("express");
var cors=require("cors");
const Razorpay = require('razorpay');
var app=express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
const PORT =process.env.PORT||5050;

 app.post("/",function (req,res){
  abp=req.body.amt;
var instance = new Razorpay({ key_id: 'rzp_test_0a359K3M2JK1sI', key_secret: '40C2WbRdKCEy7sKLSqbKR3BE' })
var options = {currency: "INR",receipt: "receipt#27"};
options["amount"]= abp;
var order=instance.orders.create(options);
 console.log(order);
 
res.send(options);
});
app.listen(PORT,() => console.log(`Server is running on port ${PORT}`));

