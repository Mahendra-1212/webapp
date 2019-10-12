const express=require('express');
const path=require('path');
const chalk=require('chalk');
const hbs=require('hbs');
const dirpath1=path.join(__dirname,'../../weatherapp/weather application');
console.log(dirpath1);
const location=require(dirpath1+"/location.js");
const forcast=require(dirpath1+"/wforcast.js");
console.log(location);
console.log(forcast);
const app=express();

console.log("working");
const dirpath=path.join(__dirname,'../');

console.log(dirpath1)
const srcpath=path.join(dirpath,'/src');
const viewpath=path.join(dirpath,'/views');
const parpath=path.join(dirpath,'/partials');
app.use("/fetchx.js",express.static(path.join(srcpath,"/fetchx.js")))
console.log(parpath);
app.set('view engine','hbs');
app.set('views',viewpath);
hbs.registerPartials(parpath);
app.get("",(req,res)=>{
   // res.send("<h1>this  is file</h1>");
  
});

app.get('/about',(req,res)=>{
    //res.send("<h1>this  is about page</h1>");
    res.render("about",{title:"about page"});
});

app.get('/index',(req,res)=>{
   // res.send("<h1>this  is index page</h1>");
    res.render("index",{title:"Index page"});
});

app.get('/profile',(req,res)=>{
    console.log(req.query.name);
    //res.send("<h1>this  is profile page</h1>");
    res.render("profile",{title:req.query.name});
});
////////////////////////////
app.get('/weather',(req,res)=>{
    console.log("inide weather");
    console.log(req.query.address);
if(req.query.address==undefined)
{
    return res.send('<h1>Please include address to URL</h1>');
}
location(req.query.address,(err,data)=>{
    forcast(data[0].long,data[0].lati,(err1,data1)=>{
        res.render('weather',{wind:data1.windspeed,temp:data1.temperature,pressure:data1.pressure,place:data[0].placeName});
    })
})



});
///////////////////////////////////////////////////
app.get('*',(req,res)=>{
    res.send("<h1><center>404 Error</center></h1>");
});
//port function
app.listen(3000,()=>{
console.log("server started at port:3000");
});