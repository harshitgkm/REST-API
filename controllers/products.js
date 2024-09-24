
const Product = require("../models/products")

const getAllProducts = async (req,res)=>{

	const {company, name, featured, sort, select} = req.query
	const queryObj = {};

	if(company){
		queryObj.company = company;
	}

	if(name){
		queryObj.name = {$regex: name, $options:"i"};
	}

	if(featured){
		queryObj.featured = featured;
	}

	let apiData = Product.find(queryObj)

	if(sort){
		let sortFix = sort.replace(",", " ");
		apiData = apiData.sort(sortFix)

	}

	if(select){
		let selectFix = select.split(",").join(" ");
		apiData =  apiData.select(selectFix)
	}


	let page = Number(req.query.page) || 1;
	let limit = Number(req.query.limit) || 3;

	let skip = (page-1) * limit;



	const data =  await apiData.skip(skip).limit(limit);
	res.json({data})
	// res.status(200).json({msg: "I am getAllProducts"})
}


const getAllProductsTesting = async (req,res)=> {
	const data =  await Product.find({name: "iphone"})
	res.json({data})
	// res.status(200).json({msg: "I am getAllProductsTesting"})
}


module.exports = {getAllProducts, getAllProductsTesting}