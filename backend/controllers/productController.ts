import asyncHandler from "../middleware/asyncHandler"
import Product from "../models/productModel"
import { Request, Response } from "express"
import { UserAuthInfoRequest } from "../types";

/*  
 * @desc Fetches all products
 * @route GET /api/products
 * @access Public 
 */
const getAllproducts = asyncHandler(async (req: Request, res: Response) => {
    const products = await Product.find({})
    res.json(products)
});
/*  
 * @desc Fetches a single product by ID
 * @route GET /api/products/:id
 * @access Public 
 */
const getProductById = asyncHandler(async (req: Request, res: Response) => {
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
const getProductsByCategory = asyncHandler(async (req: Request, res: Response) => {
    const products = await Product.find({ category: req.params.category });
    res.json(products);
});

/*
 * @desc Add a new product
 * @route POST /api/products
 * @access Private/Admin
 */
const addProduct = asyncHandler(async (req: Request, res: Response) => {
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
const editProduct = asyncHandler(async (req: Request, res: Response) => {
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
const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await product.deleteOne({ _id: product._id });
        res.json({ message: "Product removed" });
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
});

/*
 * @desc Add a product review
 * @route POST /api/products/:id/reviews
 * @access Private
 */
const addProductReview = asyncHandler(async (req: Request, res: Response) => {
    const { rating, comment } = req.body;
    const userReq = req as UserAuthInfoRequest;
    const product = await Product.findById(req.params.id);

    if (product) {

        const alreadyReviewed = product.reviews.find(
            (r) => r.user.toString() === userReq.user._id.toString()
        );

        if (alreadyReviewed) {
            res.status(400);
            throw new Error("Product was already reviewed");
        }

        const review = {
            name: userReq.user.name,
            rating: Number(rating),
            comment,
            user: userReq.user._id,
        };

        product.reviews.push(review);
        product.numReviews = product.reviews.length;

        product.rating = product.reviews.reduce(
            (acc, item) => acc + item.rating, 0) / product.reviews.length;


        await product.save();
        res.status(201).json({ message: "Review added to the product" });

    } else {
        res.status(404);
        throw new Error("Product not found");
    }

});


// toggleReviewLike
const toggleReviewLike = asyncHandler(async (req: Request, res: Response) => {
    const { productId, reviewId } = req.body;
    const userReq = req as UserAuthInfoRequest;

    try {
        const product = await Product.findById(productId);

        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }

        const review = product.reviews.find((r: any) => r._id.toString() === reviewId);

        if (!review) {
            res.status(404).json({ message: "Review not found" });
            return;
        }

        const likedIndex = review.likes.indexOf(userReq.user._id);
        const dislikedIndex = review.dislikes.indexOf(userReq.user._id);

        if (likedIndex === -1) {
            // User hasn't liked before, add like
            review.likes.push(userReq.user._id);
        } else {
            // User has already liked, remove like
            review.likes.splice(likedIndex, 1);
        }

        if (dislikedIndex !== -1) {
            // User has previously disliked, remove dislike
            review.dislikes.splice(dislikedIndex, 1);
        }

        await product.save();
        res.status(200).json({ message: "Review liked successfully" });
    } catch (error) {
        console.error("Error toggling like:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// toggleReviewDislike
const toggleReviewDislike = asyncHandler(async (req: Request, res: Response) => {
    const { productId, reviewId } = req.body;
    const userReq = req as UserAuthInfoRequest;

    try {
        const product = await Product.findById(productId);

        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }

        const review = product.reviews.find((r: any) => r._id.toString() === reviewId);

        if (!review) {
            res.status(404).json({ message: "Review not found" });
            return;
        }

        const likedIndex = review.likes.indexOf(userReq.user._id);
        const dislikedIndex = review.dislikes.indexOf(userReq.user._id);

        if (dislikedIndex === -1) {
            // User hasn't disliked before, add dislike
            review.dislikes.push(userReq.user._id);
        } else {
            // User has already disliked, remove dislike
            review.dislikes.splice(dislikedIndex, 1);
        }

        if (likedIndex !== -1) {
            // User has previously liked, remove like
            review.likes.splice(likedIndex, 1);
        }

        await product.save();
        res.status(200).json({ message: "Review disliked successfully" });
    } catch (error) {
        console.error("Error toggling dislike:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Fetches popular products based on popularity metrics (e.g., number of views)
const getPopularProducts = asyncHandler(async (req: Request, res: Response) => {
    try {
        // Query products sorted by popularity metrics (e.g., descending order of views)
        const popularProducts = await Product.find({}).sort({ views: -1 }).limit(10); // Limit to top 10 popular products
        res.json(popularProducts);
    } catch (error) {
        console.error("Error fetching popular products:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Increment view count for a product
const incrementProductViews = asyncHandler(async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            product.views += 1; // Increment view count
            await product.save();
            res.status(200).json({ message: "View count incremented successfully" });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.error("Error incrementing product views:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


export { getAllproducts, getProductById, getProductsByCategory, addProduct, editProduct, deleteProduct, addProductReview, toggleReviewLike, toggleReviewDislike, getPopularProducts, incrementProductViews };
