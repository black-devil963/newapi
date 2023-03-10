var express=require("express");
var cors=require("cors");
var request = require("request");
var app=express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
const PORT =process.env.PORT||5050;

 app.get("/",function (req,res){
    //res.sendfile(__dirname+"/index.html");
    res.json({Content:"Welcome to NewApi"});
 });
 app.post("/compilecode",function (req,res){
  const code=req.body.code;
  const langss=req.body.lang;
  const input=req.body.input;
        console.log();
        const runRequestBody = {
          script :code,
          language: langss,
          versionIndex: "0",
          clientId: "d4c79a8e2dfc773fc4a40113d7f97b6e",
          clientSecret: "bea26f202841d16fb6e5f6682344dcda62d14a76f6eaeacd53467964a1ef92e5",
          stdin: input,
        };
        request
          .post({
            url: "https://api.jdoodle.com/execute",
            json: runRequestBody,
          })
          .on("error", (error) => {
            console.log("request.post error", error);
            res.send({"error":error,status:400});
          })
          .on("data", (data) => {
            const parsedData = JSON.parse(data.toString());
            if (parsedData.error) {
              res.send({"error":parsedData.error,status:400});
            } else {
              var output = "";
              for (var i = 0; i < parsedData.output.length; i++) {
                if (parsedData.output[i] == "\n") output += "\n";
                else output += parsedData.output[i];
              }
              console.log(output);
              res.send({output});
            }
          });

});


app.listen(PORT,() => console.log(`Server is running on port ${PORT}`));
