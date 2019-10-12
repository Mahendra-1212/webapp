//const fetch = require("node-fetch");
console.log("fetch function started");
fetch("http://localhost:3000/weather?address=indrakhi").then((res)=>{
res.json().then((data)=>{
    console.log(data);
});


});
