const express = require("express");
const fs = require("fs");
const app = express();

app.get('/', (req,res) => {
    res.send("<h1>Welcome to our Page</h1>")
})

app.get("/input1/", (req, res) => {
    res.status(400).send("Please enter Valid Input</h4>")
})

app.get("/input2/", (req, res) => {
    res.status(400).send("Please enter Valid Input</h4>")
})

let c1 = 0, c2 = 0;

app.get('/input1/:value', (req, res, next) => {
    c1=(c1+1)%2;
    if(c1&1)
    fs.writeFileSync("./output1.txt", req.params.value + "\n", { flag: "a+"})
    let data = fs.readFileSync("./output2.txt");
    if(data.toString() === "") {
        fs.writeFileSync("./output2.txt", String(req.params.value), {flag: "w+"});
    } else {
        array = data.toString().split("\n");
        array.push(String(req.params.value))
        array.sort();
        data = array.join("\n");
        fs.writeFileSync("./output2.txt", data);
    }
    res.send("<h4>Successfully Saved Input</h4>")
})

app.get('/input2/:value', (req,res, next) => {
    c2=(c2+1)%2;
    if(!(c2&1))
    fs.writeFileSync("./output1.txt", req.params.value + "\n", { flag: "a+"})
    let data = fs.readFileSync("./output2.txt");
    if(data.toString() === "") {
        fs.writeFileSync("./output2.txt", String(req.params.value), {flag: "w+"});
    } else {
        array = data.toString().split("\n");
        array.push(String(req.params.value))
        array.sort();
        data = array.join("\n");
        fs.writeFileSync("./output2.txt", data);
    }
    res.send("<h4>Successfully Saved Input</h4>")
})

const server = app.listen( process.env.PORT || 3000, function(){
    console.log('Listening on port ' + server.address().port);
});