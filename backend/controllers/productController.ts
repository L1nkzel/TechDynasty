import asyncHandler from "../middleware/asyncHandler"
import Product from "../models/productModel"

/*  
 * @desc Fetches all products
 * @route GET /api/products
 * @access Public 
 */
const getAllproducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
});
/*  
 * @desc Fetches a single product by ID
 * @route GET /api/products/:id
 * @access Public 
 */
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
});

const getProductsByCategory = asyncHandler(async (req, res) => {
    const products = await Product.find({category: req.params.category });
    res.json(products);
});

export { getAllproducts, getProductById, getProductsByCategory }