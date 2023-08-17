const express =require('express')
const mongoose = require('mongoose')
const Product=require('./models/product_model')
var app=express()

app.use(express.json())
app.use(express.urlencoded())

//routes
app.get('/',(req , res)=>{
    res.send("hello node api ")
})
app.get('/blog',(req , res)=>{
    res.send("hello blog i am adity api ")
})

app.listen(3000,()=>{
    console.log('Node api app is running on port 3000')
})


//get data 
app.get('/product',async(req,res)=>{
    try{
        const products= await Product.find({ })
        res.status(200).json(products)
    }catch(error){
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
    
})


// specific product
app.get('/product/:id',async(req,res)=>{
    try{
        const {id}=req.params
        const product= await Product.findById(id)
        res.status(200).json(product)
    }catch(error){
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

//post data 
app.post('/product',async(req,res)=>{
    try{
        const product = await Product.create(req.body)
        res.status(200).json(product)

    }catch(error){
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

//updtae things
app.put('/product/:id',async(req,res)=>{

    try{

        const {id}=req.params
        const product= await Product.findByIdAndUpdate(id ,req.body);
        //we cannot find product for update
        if(!product){
            return res.status(404).json({message:'cannot find product with id '+id})
        }

        const updatedProduct = await Product.findById(id);

        res.status(200).json(updatedProduct)


    }catch(error){
        console.log(error.message)
        res.status(500).json({message: error.message})

    }
})

//delete ap product
app.delete('/product/:id',async(req,res)=>{
    try{

        const {id}=req.params
        const product= await Product.findByIdAndDelete(id );

        if(!product){
            return res.status(404).json({message:'cannot find product with id '+id})
        }

        res.status(200).json()


    }catch{

        console.log(error.message)
        res.status(500).json({message: error.message})

    }
})


mongoose.connect("mongodb://localhost:27017/CrudApi")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log("failed");
})
