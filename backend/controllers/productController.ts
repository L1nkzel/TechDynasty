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

/*
 * @desc Fetches all products by category
 * @route GET /api/products/category/:category
 * @access Public
 */
const getProductsByCategory = asyncHandler(async (req, res) => {
    const products = await Product.find({ category: req.params.category });
    res.json(products);
});

/*
 * @desc Add a new product
 * @route POST /api/products
 * @access Private/Admin
 */ 
const addProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        user: req.body.user,
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        brand: req.body.brand,
        category: req.body.category,
        price: req.body.price,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
    })

    const addProduct = await product.save();
    res.status(201).json(addProduct)
});

/*
 * @desc Edit a product
 * @route PUT /api/products/:id
 * @access Private/Admin
 */
const editProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = req.body.name;
        product.image = req.body.image;
        product.description = req.body.description;
        product.brand = req.body.brand;
        product.category = req.body.category;
        product.price = req.body.price;
        product.countInStock = req.body.countInStock;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
});

/*
 * @desc Delete a product
 * @route DELETE /api/products/:id
 * @access Private/Admin
 */
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await product.deleteOne({ _id: product._id });
        res.json({ message: "Product removed" });
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
});

export { getAllproducts, getProductById, getProductsByCategory, addProduct, editProduct, deleteProduct }
