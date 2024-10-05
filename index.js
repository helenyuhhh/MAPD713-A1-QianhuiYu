import express from 'express';
// const express = require('express')
// create object of express
const app = express();
// port number on which you want to run the application
app.use(express.json());
const port = 5000;
let getCounter=0;
let postCounter=0;
// res:request; res:responde
// app.get(), one of the initial five methods
// node is a self server application
// request for /hello, so you need to add /hello at the end of hostaddress
let datastore = { // declear an array to store the prodycts details
    products:[]
}
app.get("/products", (req, res)=>{
    getCounter++;
    // this method reqponse get the json file from the response 
    res.json(datastore.products);
    //console.log(`Get: ${getCounter} Post: ${postCounter}`)
    console.log(`Get: ${getCounter} Post: ${postCounter}`)
}
)

// get element by id testing:
app.get("/products/:productId", (req, res) => {
    // const id = req.params.productId
    // console.log({id})
    // res.status(200).send(datastore.products.productId)
    // res.send(products.);
    // js method: array.find, with some logic function, since req.params.productId returns a string, we need to parse it
    // to Integer
    getCounter++;
    const product = datastore.products.find(c => c.productId === parseInt(req.params.productId))
    if (!product) { // if no such product, return 404
        res.status(404).send('The product with given id is not found')
    }
    else {
        res.send(product)
    }
    console.log(`Get: ${getCounter} Post: ${postCounter}`)
})
app.post("/products", (req, res)=>{
    postCounter++;
    const productData = req.body; // initialize a variable to get data from json body
    
    if(!productData || !productData.productId || !productData.name || !productData.price || !productData.quantity) {
        return res.status(400).json({error:"Invalid Data"});
    }
    else {
        datastore.products.push(productData);
        res.status(201).json(productData);
    }
    
    console.log(`Get: ${getCounter} Post: ${postCounter}`)

})

// delete by id is working
app.delete("/products/:productId", (req,res) => {
    const product = datastore.products.find(c => c.productId === parseInt(req.params.productId))
    // const index = datastore.products.findIndex(c => c.productId === parseInt(req.params.productId))
    if (!product) {
        res.status(404).send('The product with given id is not found')
    }
    else {
        let index = datastore.products.indexOf(product)
        // console.log (index) // test index of the item to be removed
        // second parameter is the number of items you want to delete
        const removed = datastore.products.splice(index, 1) 
        res.json(datastore.products);
    }
})

 
app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);

})
