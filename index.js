import express from 'express';
// const express = require('express')
// create object of express
const app = express();
// port number on which you want to run the application
app.use(express.json());
const port = 3000;
let getCounter;
let postCounter;
// res:request; res:responde
// app.get(), one of the initial five methods
// node is a self server application
// request for /hello, so you need to add /hello at the end of hostaddress
let datastore = { // declear an array to store the prodycts details
    products:[]
}
app.get("/products", (req, res)=>{
    res.json(datastore.products)
}
)
app.post("/products", (req, res)=>{
    const productData = req.body // initialize a variable to get data from json body
    if(!productData || !productData.productId || !productData.name || !productData.price || !productData.quantity) {
        return res.status(400).json({error:"Invalid Data"})
    }
    datastore.products.push(productData);
    res.status(201).json(productData);

})

 
app.listen(port, ()=>{
    console.log(`Server is running on ${port}`)
})