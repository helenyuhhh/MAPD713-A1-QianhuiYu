import express, { json } from 'express'

const app = express()
app.use(express, json)

let datastore = {
    products:[]
}

// store the data
app.get("/products", (req, res)=>{
    res.json(datastore.products);
})

app.listen(3000, ()=>{
    console.log("Server is listening on port 3000")
})
