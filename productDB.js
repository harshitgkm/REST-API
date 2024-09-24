require("dotenv").config();

const connectDB = require("./db/products");
const Product = require("./models/products");

const productJson = require("./products.json")


const start = async() =>{
	try{
		await connectDB(process.env.MONGO_URL);
		await Product.create(productJson);
		console.log("success");
	}catch(error){
		console.log(error)
	}
}


start();