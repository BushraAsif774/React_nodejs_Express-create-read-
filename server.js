const cors= require('cors')
const express = require('express');
const bodyparse= require('body-parser');

const port = 7000;

const app = express();
app.use(cors())

app.use(bodyparse.urlencoded({ extended: false }));
app.use(bodyparse.json());

let formData = [];
app.post("/form", (req,res)=>{
    formData.push(req.body);
    console.log(req.body);
})


app.get("/form", (req, res)=>{
    res.json(formData);

});


app.listen(port, () => {
    console.log(`Server Started at ${port}`)
})