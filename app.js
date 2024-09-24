require("dotenv").config();
const express = require('express');

const app = express()

const port = 3000
const products_routes = require("./routes/products")
const connectDB = require("./db/products")

app.get("/", (req,res)=>{
	res.send("Hello")
})

//middlewares
app.use("/api/products", products_routes)


const start = async ()=>{
	try{

		await connectDB(process.env.MONGO_URL);
		app.listen(port, (req,res)=>{
	    console.log(`listening to the port no. ${port}`)
})
	}catch(err){
		console.log(err)
	}
}


start()



